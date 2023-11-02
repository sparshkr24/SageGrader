const express = require("express");
const { getMentorById, getAllMentors, addMentor } = require("../controllers/mentor/mentor");
const router = express.Router();

// Route to get the data of a mentor
router.get("/", getMentorById);

// Route to get all the mentors
router.get("/all", getAllMentors);

// Route to add a mentor
router.post("/", addMentor);




module.exports = router;
