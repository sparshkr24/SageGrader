const { isAssignedUnderThisMentor } = require("../../utils/helper");

const assignMarksToStudent = async (req, res) => {
  try {
    // get all the required fields from the body
    let { mentorId, studentId, ideation, execution, pitch } = req.body;
    // validation for the required fields
    if (!studentId || !mentorId) {
      return res.status(400).json({ error: "Please provide all the details" });
    }

    studentId = parseInt(studentId);
    mentorId = parseInt(mentorId);

    const maximumMarks = 10;

    // check if ideation, execution, pitch are numbers
    if (isNaN(ideation) || isNaN(execution) || isNaN(pitch)) {
      return res.status(400).json({ error: "Please provide marks in numbers" });
    }
    // check if ideation, execution, pitch are less than or equal to maximumMarks
    // and greater than or equal to 0
    if (
      ideation > maximumMarks ||
      execution > maximumMarks ||
      pitch > maximumMarks
    ) {
      return res.status(400).json({ error: "Please provide marks out of 10" });
    }
    if (ideation < 0 || execution < 0 || pitch < 0) {
      return res
        .status(400)
        .json({ error: "Please provide marks greater than equal to 0" });
    }

    // check if the student is accommodated under this mentor
    const isStudentAccommodated = await isAssignedUnderThisMentor(
      req,
      studentId,
      mentorId
    );
    if (!isStudentAccommodated) {
      return res
        .status(403)
        .json({ error: "Student is not accommodated under this mentor" });
    }

    console.log("here");
    // check if the student is already marked
    const isStudentMarked = await req.prisma.marks.findUnique({
      where: {
        student_id: studentId,
      },
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
        },
      });
      return res.status(200).json({ data: updatedMarks });
    } else {
      const newMarks = await req.prisma.marks.create({
        data: {
          student_id: studentId,
          ideation: ideation,
          execution: execution,
          pitch: pitch,
        },
      });
      return res.status(200).json({ data: newMarks });
    }
  } catch (error) {
    console.error("Error creating mentor:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMarksOfStudent = async (req, res) => {
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
  }

module.exports = { assignMarksToStudent, deleteMarksOfStudent }