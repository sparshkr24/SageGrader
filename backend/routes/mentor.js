const express = require("express");
const router = express.Router();

// Route to get the data of a mentor
router.get("/", async (req, res) => {
  try {
    let { id } = req.query;
    // validation for the required fields
    id = parseInt(id.trim());
    console.log("id: ", id);
    if (!id) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
    const mentor = await req.prisma.mentor.findUnique({
      where: {
        id: id,
      }
    });
    res.json({ data: mentor });

  } catch (error) {
    console.error("Error fetching students without MentorGroup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Route to get all the mentors
router.get("/all", async (req, res) => {
  try {
    const allMentors = await req.prisma.mentor.findMany();

    res.json({ data: allMentors });
  } catch (error) {
    console.error("Error fetching students without MentorGroup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to add a mentor
router.post("/", async (req, res) => {

  try {

    // get all the required fields from the body
    // TODO : we will be getting the ID in the BODY ????
    let { id, name, dept } = req.body;

    // validation for the required fields
    id = id.trim();
    name = name.trim();
    dept = dept.trim();

    if (!id || !name || !dept) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
    const departmentsInTheInstitute = ["CSE", "ECE", "ME", "Design", "Physics", "Mathematics", "Chemistry", "HSS"];
    if (!departmentsInTheInstitute.includes(dept)) {
      return res.status(400).json({ error: "Please provide a valid department" });
    }

    const newMentor = await req.prisma.mentor.create({
      data: {
        mentor_id: id,
        mentor_name: name,
        mentor_dept: dept,
      }
    });

    res.json({ data: newMentor });

  } catch (error) {
    console.error("Error creating mentor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




module.exports = router;
