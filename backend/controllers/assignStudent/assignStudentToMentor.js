const assignStudentToMentor = async (req, res) => {
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

    // console.log("studentId: ", studentId);
    // console.log("mentorId: ", mentorId);

    //check if the student exists
    const student = await req.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    //check if the mentor exists
    const mentor = await req.prisma.mentor.findUnique({
      where: {
        id: mentorId,
      },
    });

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // check if the student is already accommodated under a mentor
    const isStudentAccommodated = await req.prisma.mentorGroup.findFirst({
      where: {
        student_id: studentId,
      },
    });

    if (isStudentAccommodated) {
      return res.status(403).json({ error: "Student is already accommodated" });
    }

    const totalMentorGroupRecords = await req.prisma.mentorGroup.findMany({
      where: {
        mentor_id: mentorId,
      },
    });

    if (totalMentorGroupRecords.length == 4) {
      return res
        .status(403)
        .json({
          error: "A Mentor cannot have more than 4 students assigned to them",
        });
    }

    if(totalMentorGroupRecords[0]?.lock_status){
      return res.status(403).json({
        error: "Mentor has already locked the submission of the group"
      })
    }

    const newStudent = await req.prisma.mentorGroup.create({
      data: {
        student_id: studentId,
        mentor_id: mentorId,
      },
    });
    res.status(200).json({ data: newStudent });
  } catch (error) {
    console.error("Error creating mentor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const unAssignStudentFromMentor = async (req, res) => {
    try {
      let { studentId, mentorId } = req.query;
      // validation for the required fields
      if (!studentId || !mentorId) {
        return res.status(400).json({ error: "Please provide all the details" });
      }
      studentId = parseInt(studentId);
      mentorId = parseInt(mentorId);
  
      console.log("studentId: ", studentId);
      console.log("mentorId: ", mentorId);
  
  
      const deletedStudent = await req.prisma.mentorGroup.delete({
        where: {
          student_id: studentId,
          mentor_id: mentorId,
        }
      });
  
      const deletedMarks = await req.prisma.$queryRaw`DELETE FROM "Marks" WHERE student_id = ${studentId}`;
      
      res.json({ data: deletedStudent });
    } catch (error) {
      console.error("Error deleting student from mentor's guidance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

module.exports = { assignStudentToMentor, unAssignStudentFromMentor}