const express = require("express");
const router = express.Router();
const { getAllMarksByFilter, lockSubmission } = require("../controllers/submission/submission");

// Route to get all details of student and marks by filter
router.get("/all", getAllMarksByFilter)


// Route to lock submission of a group 
router.post("/lock", lockSubmission);

module.exports = router;
