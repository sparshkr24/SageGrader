const express = require("express");
const router = express.Router();

// Route to get students based on marksAssigned parameter
router.get("/getAllStudents", async (req, res) => {
  try {
    const marksAssigned = req.query.marksAssigned;
    
    if(marksAssigned === "true"){
        const students = req.prisma.student.findMany({
            where: {
                marksAssigned: true
            }
        });
        return res.json({ data: marksAssigned });
    }
    else if(marksAssigned === "false"){
        return res.json({ data: marksAssigned });   
    }
    else{
        res.json({ data: "All students" });
    }

    
    
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
