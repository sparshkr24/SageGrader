const getMarksByStudentId = async (req, res) => {
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
      },
      select: {
        ideation: true,
        execution: true,
        pitch: true,
      },
    });
    return res.json({ data: student });
  } catch (error) {
    console.error("Error fetching of the student", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getMarksOfAllStudents = async (req, res) => {
    try {
      const allStudents = await req.prisma.marks.findMany();
      return res.json({ data: allStudents });
    } catch (error) {
      console.error("Error fetching students ", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

module.exports = {getMarksByStudentId, getMarksOfAllStudents}