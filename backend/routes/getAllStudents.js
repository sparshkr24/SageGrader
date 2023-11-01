const express = require("express");
const router = express.Router();

// Route to get students without a MentorGroup
router.get("/getAllStudents", async (req, res) => {
  try {
    const allStudents = await req.prisma.student.findMany();

    res.json({data: allStudents});
  } catch (error) {
    console.error("Error fetching students without MentorGroup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
