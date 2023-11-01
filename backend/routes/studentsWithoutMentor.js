const express = require("express");
const router = express.Router();

// Route to get students without a MentorGroup
router.get("/studentsWithoutMentor", async (req, res) => {
  try {
    const studentsWithoutMentorGroup = await req.prisma.$queryRaw`
      SELECT * FROM "Student"
      WHERE id NOT IN (
        SELECT student_id FROM "MentorGroup"
      )`;

    res.json({data: studentsWithoutMentorGroup});
  } catch (error) {
    console.error("Error fetching students without MentorGroup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
