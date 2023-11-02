const express = require("express");
const router = express.Router();
const {isStudentAssigned, getAllAssignedStudents, getAssignedStudentsByMentorId} = require("../controllers/assignStudent/checkAccomodation");
const {assignStudentToMentor, unAssignStudentFromMentor} = require("../controllers/assignStudent/assignStudentToMentor");

// Route to get if a student is assigned or not
router.get("/", isStudentAssigned);


// Route to get all assigned students
router.get("/all/", getAllAssignedStudents);

// Route to get all the assigned students of a mentor
router.get("/mentor/", getAssignedStudentsByMentorId);


// to assign a student under a mentor
router.post("/", assignStudentToMentor);

// Route to remove a student from a mentor's guidance
router.delete("/", unAssignStudentFromMentor)



module.exports = router;
