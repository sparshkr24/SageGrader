const studentWithoutMentor = async (req, res) => {
  try {
    console.log();
    let { page, filter } = req.query;
    page = parseInt(page);
    const rowsPerPage = 10;

    const take = rowsPerPage;
    const skip = (page - 1) * rowsPerPage;


    if(filter == "unassigned"){
      console.log("2");
      const unassignedStudents = await req.prisma.$queryRaw`SELECT * FROM "Student"
        WHERE id NOT IN (SELECT student_id FROM "MentorGroup")
        LIMIT ${take}
        OFFSET ${skip}`
      return res.status(200).json({ data: unassignedStudents });
    }
    
    const allStudents = await req.prisma.student.findMany({
      take: take,
      skip: skip,
    });

    res.json({ data: allStudents });
  } catch (error) {
    console.error("Error fetching students without MentorGroup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addStudent = async (req, res) => {
  try {
    let { rollNo, studentName, batch, branch, email } = req.body;

    // validation for the required fields
    if (!rollNo || !studentName || !batch || !branch || !email) {
      return res.status(400).json({ error: "Please provide all the details" });
    }

    rollNo = rollNo.trim();
    studentName = studentName.trim();
    batch = parseInt(batch);
    branch = branch.trim();
    email = email.trim();

    // email should end with @iiitdmj.ac.in
    if (!email.endsWith("@iiitdmj.ac.in")) {
      return res
        .status(400)
        .json({ error: "Please provide a valid institute email" });
    }

    const newStudent = await req.prisma.student.create({
      data: {
        student_roll: rollNo,
        student_name: studentName,
        student_batch: batch,
        student_branch: branch,
        email: email,
      },
    });
    res.json({ data: newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { studentWithoutMentor, addStudent };
