const express = require("express");
const { studentWithoutMentor, addStudent } = require("../controllers/student/student");
const router = express.Router();

// Route to get students without a MentorGroup
router.get("/", studentWithoutMentor);

// Route to add a student
router.post("/", addStudent);

module.exports = router;
