const express = require("express");
const { isAssignedUnderThisMentor } = require("../utils/helper");
const router = express.Router();

// route to get the marks of a student
router.get("/", async (req, res) => {
  try {
    let { studentId } = req.query;
    // validation for the required fields
    if (!studentId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }

    studentId = parseInt(studentId.trim());
    console.log("studentId: ", studentId);

    const student = await req.prisma.marks.findFirst({
      where: {
        student_id: studentId,
      }
    });
    return res.json({ data: student });

  } catch (error) {
    console.error("Error fetching of the student", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// Route to get marks of all students
router.get("/all", async (req, res) => {
  try {
    const allStudents = await req.prisma.marks.findMany();
    return res.json({ data: allStudents });
  } catch (error) {
    console.error("Error fetching students ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to assign marks to a student
router.post("/", async (req, res) => {
  try {
    // get all the required fields from the body
    // TODO : we will be getting the ID in the BODY ????
    let { mentorId, studentId, ideation, execution, pitch } = req.body;
    // validation for the required fields
    if (!studentId || !mentorId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }

    studentId = parseInt(studentId);
    mentorId = parseInt(mentorId);

    const maximumMarks = 10;
    // ideation, execution, pitch are marks out of maximumMarks
    // check if ideation, execution, pitch are numbers
    if (isNaN(ideation) || isNaN(execution) || isNaN(pitch)) {
      return res.status(400).json({ error: "Please provide marks in numbers" });
    }
    // check if ideation, execution, pitch are less than or equal to maximumMarks 
    // and greater than or equal to 0
    if (ideation > maximumMarks || execution > maximumMarks || pitch > maximumMarks) {
      return res.status(400).json({ error: "Please provide marks out of 10" });
    }
    if (ideation < 0 || execution < 0 || pitch < 0) {
      return res.status(400).json({ error: "Please provide marks greater than equal to 0"});
    }

    // check if the student is accommodated under this mentor
    const isStudentAccommodated = await isAssignedUnderThisMentor(req, studentId, mentorId);
    if (!isStudentAccommodated) {
      return res.status(400).json({ error: "Student is not accommodated under this mentor" });
    }

    // check if the student is already marked
    const isStudentMarked = await req.prisma.marks.findUnique({
      where: {
        student_id: studentId,
      }
    });
    if (isStudentMarked) {

      const updatedMarks = await req.prisma.marks.update({
        where: {
          student_id: studentId,
        },
        data: {
          ideation: ideation,
          execution: execution,
          pitch: pitch,
        }
      });
      return res.status(200).json({ data: updatedMarks });

    } else {
      const newMarks = await req.prisma.marks.create({
        data: {
          student_id: studentId,
          ideation: ideation,
          execution: execution,
          pitch: pitch,
        }
      });
      return res.status(200).json({ data: newMarks });

    }


  } catch (error) {
    console.error("Error creating mentor:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete/reset the marks of a students
router.delete("/", async (req, res) => {
  try {
    const { studentId } = req.body;
    // validation for the required fields
    studentId = studentId.trim();
    if (!studentId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
    const deletedMarks = await req.prisma.marks.delete({
      where: {
        student_id: studentId,
      }
    });
    return res.json({ data: deletedMarks });
  } catch (error) {
    console.error("Error deleting student from mentor's guidance:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
})



module.exports = router;
