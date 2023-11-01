const express = require("express");
const router = express.Router();

// Route to get if a student is accommodated or not
// TODO: return value to Boolean ???
router.get("/", async (req, res) => {
  try {
    const { studentId } = req.body;
    // validation for the required fields
    studentId = studentId.trim();
    if (!studentId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
    const student = await req.prisma.mentorGroup.findUnique({
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
    const { mentorId } = req.body;
    // validation for the required fields
    mentorId = mentorId.trim();
    if (!mentorId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
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

// to accommodate a student under a mentor
router.post("/", async (req, res) => {
  try {
    // get all the required fields from the body
    // TODO : we will be getting the ID in the BODY ????
    const { studentId, mentorId } = req.body;
    // validation for the required fields
    studentId = studentId.trim();
    mentorId = mentorId.trim();
    if (!studentId || !mentorId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
    const newStudent = await req.prisma.mentorGroup.create({
      data: {
        student_id: studentId,
        mentor_id: mentorId,
      }
    });
    res.json({ data: newStudent });
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
    studentId = studentId.trim();
    mentorId = mentorId.trim();
    if (!studentId || !mentorId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
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
