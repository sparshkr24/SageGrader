const express = require("express");
const router = express.Router();
const {getMarksByStudentId, getMarksOfAllStudents} = require("../controllers/marks/getMarks");
const { assignMarksToStudent, deleteMarksOfStudent } = require("../controllers/marks/assignMarks");

// route to get the marks of a student by student_id
router.get("/", getMarksByStudentId);

// Route to get marks of all students
router.get("/all", getMarksOfAllStudents);

// Route to assign marks to a student
router.post("/", assignMarksToStudent);

// Route to delete/reset the marks of a students
router.delete("/", deleteMarksOfStudent)



module.exports = router;
