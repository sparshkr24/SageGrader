

// function to check if a student is assigned under a this mentor
// returns a promise if the student is assigned under this mentor
// the promise resolves and returns true
// else the promise is rejected and return false
async function isAssignedUnderThisMentor(req, studentId, mentorId) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Fetching student with id: ", studentId);
      const studentGroup = await req.prisma.mentorGroup.findMany({
        where: {
          student_id: studentId,
        }
      });
      console.log("Student: ", studentGroup);
      if (studentGroup.mentor_id === mentorId) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      console.error("Error fetching of the student", error);
      reject(false);
    }
  });
}

module.exports = { isAssignedUnderThisMentor }