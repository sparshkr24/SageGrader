const isStudentAssigned = async (req, res) => {
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
      },
    });
    res.json({ data: student });
  } catch (error) {
    console.error("Error fetching of the student", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllAssignedStudents = async (req, res) => {
  try {
    const allStudents = await req.prisma.mentorGroup.findMany({
      select: {
        student_id: true,
      },
    });

    studentIdList = allStudents.map((student) => {
      return student.student_id;
    });

    res.json({ data: studentIdList });
  } catch (error) {
    console.error("Error fetching students ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getAssignedStudentsByMentorId = async (req, res) => {
    try {
      let { mentorId } = req.query;
      // Validation for the required fields
      if (!mentorId) {
        return res.status(400).json({ error: "Please provide all the details" });
      }
  
      mentorId = parseInt(mentorId);
  
      
      const students = await req.prisma.$queryRaw`
        SELECT s.*, m.ideation, m.execution, m.pitch FROM "Student" s
        LEFT JOIN "Marks" m ON m.student_id = s.id
        WHERE s.id in 
        (SELECT student_id FROM "MentorGroup" WHERE mentor_id = ${mentorId})`;
  
      res.json({ data: students });
    } catch (error) {
      console.error("Error fetching students of a mentor:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

module.exports = { isStudentAssigned, getAllAssignedStudents, getAssignedStudentsByMentorId };
