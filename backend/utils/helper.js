async function isAssignedUnderThisMentor(req, studentId, mentorId) {
    try {
      console.log("Fetching student with id: ", studentId);
      const studentGroup = await req.prisma.mentorGroup.findMany({
        where: {
          student_id: studentId,
        }
      });
      // console.log("Student: ", studentGroup);
      if (studentGroup[0].mentor_id === mentorId) {
        return true;
      } else {
        return false
      }
    } catch (error) {
      console.error("Error fetching of the student", error);
      reject(false);
    }
}

module.exports = { isAssignedUnderThisMentor }