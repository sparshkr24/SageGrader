const express = require("express");
const router = express.Router();

// Route to get students without a MentorGroup
router.get("/", async (req, res) => {
  try {
    const allStudents = await req.prisma.student.findMany();

    res.json({ data: allStudents });
  } catch (error) {
    console.error("Error fetching students without MentorGroup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to add a student
router.post("/", async (req, res) => {
  try {
    let { rollNo, firstName, lastName, batch, program, branch, email } =
      req.body;

    // validation for the required fields
    rollNo = rollNo.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    batch = parseInt(batch.trim());
    program = program.trim();
    branch = branch.trim();

    // validation for email
    email = email.trim();

    if (
      !rollNo ||
      !student_name ||
      !batch ||
      !program ||
      !branch ||
      !email
    ) {
      return res.status(400).json({ error: "Please provide all the details" });
    }

    // email should end with @iiitdmj.ac.in
    if (!email.endsWith("@iiitdmj.ac.in")) {
      return res.status(400).json({ error: "Please provide a valid institute email" });
    }

    const newStudent = await req.prisma.student.create({
      data: {
        student_roll: rollNo,
        student_name: student_name,
        student_batch: batch,
        student_program: program,
        student_branch: branch,
        student_email: email,
      },
    });
    res.json({ data: newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
