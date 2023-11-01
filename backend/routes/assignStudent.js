const express = require("express");
const router = express.Router();

// Route to get if a student is accommodated or not
// TODO: return value to Boolean ???
router.get("/", async (req, res) => {
  try {
    let { studentId } = req.query;
    // validation for the required fields
    if (!studentId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }

    studentId = parseInt(studentId);
    const student = await req.prisma.mentorGroup.findFirst({
      where: {
        student_id: studentId,
      }
    });
    res.json({ data: student });

  } catch (error) {
    console.error("Error fetching of the student", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Route to get all accommodated students
router.get("/all/", async (req, res) => {
  try {
    const allStudents = await req.prisma.mentorGroup.findMany();
    res.json({ data: allStudents });
  } catch (error) {
    console.error("Error fetching students ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all the accommodated students of a mentor
// TODO: change the route name
router.get("/mentor/", async (req, res) => {
  try {
    let { mentorId } = req.query;
    // validation for the required fields
    if (!mentorId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }

    mentorId = parseInt(mentorId);
    const students = await req.prisma.mentorGroup.findMany({
      where: {
        mentor_id: mentorId,
      }
    });
    res.json({ data: students });
  } catch (error) {
    console.error("Error fetching students of a mentor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// to assign a student under a mentor
router.post("/", async (req, res) => {
  try {
    // get all the required fields from the body
    // TODO : we will be getting the ID in the BODY ????
    let { studentId, mentorId } = req.body;
    // validation for the required fields
    if (!studentId || !mentorId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }

    studentId = parseInt(studentId);
    mentorId = parseInt(mentorId);

    //check if the student exists
    const student = await req.prisma.student.findUnique({
      where: {
        id: studentId,
      }
    });

    if(!student){
      return res.status(404).json({ error: "Student not found" });
    }

    //check if the mentor exists
    const mentor = await req.prisma.mentor.findUnique({
      where: {
        id: mentorId,
      }
    });

    if(!mentor){
      return res.status(404).json({ error: "Mentor not found" });
    }

    // check if the student is already accommodated under a mentor
    const isStudentAccommodated = await req.prisma.mentorGroup.findFirst({
      where: {
        student_id: studentId,
      }
    });

    if (isStudentAccommodated) {
      return res.status(403).json({ error: "Student is already accommodated" });
    }

    const totalMentorGroupRecords = await req.prisma.mentorGroup.count({
      where: {
        mentor_id: mentorId,
      },
    });

    if(totalMentorGroupRecords == 4){
      return res.status(403).json({ error: "A Mentor cannot have more than 4 students assigned to them" });
    }

    const newStudent = await req.prisma.mentorGroup.create({
      data: {
        student_id: studentId,
        mentor_id: mentorId,
      }
    });
    res.status(200).json({ data: newStudent });
  } catch (error) {
    console.error("Error creating mentor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to remove a student from a mentor's guidance
router.delete("/", async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;
    // validation for the required fields
    if (!studentId || !mentorId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
    studentId = parseInt(studentId);
    mentorId = parseInt(mentorId);

    const deletedStudent = await req.prisma.mentorGroup.delete({
      where: {
        student_id: studentId,
        mentor_id: mentorId,
      }
    });
    res.json({ data: deletedStudent });
  } catch (error) {
    console.error("Error deleting student from mentor's guidance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})



module.exports = router;
