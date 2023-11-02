const express = require("express");
const router = express.Router();
const sendMail = require("../utils/mail/sendMail");


router.get("/all", async (req, res) => {
  try {
    let {markStatus} = req.query
    let data;

    if(!markStatus){
      return res.status(400).json({ error: "Please provide all the details" });
    }

    if(markStatus == "unassigned"){
      data = await req.prisma.$queryRaw`SELECT s.*, mg.mentor_id FROM "Student" s
      JOIN "MentorGroup" mg ON s.id = mg.student_id
      WHERE s.id NOT IN (SELECT student_id FROM "Marks")
      `;
    }
    else if(markStatus == "assigned"){
      data = await req.prisma.$queryRaw`SELECT s.*, m.ideation, m.execution, m.pitch, mg.lock_status, mg.mentor_id
        FROM "Student" s
        JOIN "Marks" m ON s.id = m.student_id
        LEFT JOIN "MentorGroup" mg ON s.id = mg.student_id
        WHERE mg.lock_status = false
        ORDER BY mg.mentor_id ASC`;
    }
    else if(markStatus == "lock"){
      data = await req.prisma.$queryRaw`SELECT s.*, m.ideation, m.execution, m.pitch, mg.lock_status, mg.mentor_id
        FROM "Student" s
        LEFT JOIN "Marks" m ON s.id = m.student_id
        LEFT JOIN "MentorGroup" mg ON s.id = mg.student_id
        WHERE mg.lock_status = true
        ORDER BY mg.mentor_id ASC`;
    }

    
    res.json({ data });

  } catch (error) {
    console.error("Error fetching all the groups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})


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

    for (const student of studentData){
      const emailData = {
        to: "20bcs219@iiitdmj.ac.in", // using my own email to avoid disturbing others (${student.email} will send to real Ids)
        subject: `Assignment Graded - ${student.student_roll}`,
        text: `Your assignment has been graded by your mentor. Please login to the portal to view your marks.\nTotal Marks: ${student.ideation + student.execution + student.pitch}`
      }

      sendMail(emailData)
    }

    return res.json({data: `Submission for mentor_id: ${mentorId} locked successfully `});
  } catch (error) {
    console.error("Error Locking the submission of the group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
