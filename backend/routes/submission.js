const express = require("express");
const router = express.Router();

// Route to lock submission of a group 
router.post("/lock", async (req, res) => {
  try {
    const { studentData, mentorId } = req.body
    if(!studentData){
      console.log("Please provide all the details");
      return res.status(400).json({ error: "Please provide all the details" });
    }
    
    if(studentData.length < 3){
      console.log("Please select atleast 3 students");
      return res.status(403).json({ error: "Please select atleast 3 students" });
    }

    let unMarked = false;
    for (const student of studentData){
      if(!student.ideation || !student.execution || !student.pitch){
        unMarked = true;
        console.log("Please mark all the students before locking submission");
        return res.status(403).json({ error: "Please mark all the students before locking submission" });
      }
      
      const mentor = await req.prisma.mentorGroup.findFirst({
        where: {
          student_id: student.id,
        },
        select: {
          mentor_id: true,
        }
      });

      if(parseInt(mentorId) !== mentor.mentor_id){
        return res.status(403).json({ error: "Student not assigned under this mentor" });
      }

    }

    for (const student of studentData) {
      await req.prisma.mentorGroup.update({
        where: {
          student_id: student.id,
        },
        data: {
          lock_status: true,
        },
      });
    }


    console.log("\n\n------------------4444-------------\n\n");
    res.json({data: `Submission for mentor_id: ${mentorId} locked successfully `});
  } catch (error) {
    console.error("Error Locking the submission of the group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
