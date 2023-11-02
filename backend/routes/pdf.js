const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const fs = require("fs");

router.get("/", async (req, res) => {
  let { mentorId } = req.query || 2;
  mentorId = parseInt(mentorId);

  const mentorGroup = await req.prisma.MentorGroup.findFirst({
    where: {
      mentor_id: mentorId,
    },
    select: {
      lock_status: true,
    },
  });


  if (!mentorGroup || mentorGroup?.lock_status == false) {
    return res.status(403).json({ error: "Submission must be locked to generate PDF" });
  }

  const studentData = await req.prisma.$queryRaw`
    SELECT s.*, m.* FROM "Student" s
    JOIN "Marks" m ON s.id = m.student_id
    WHERE s.id IN (SELECT student_id FROM "MentorGroup" WHERE mentor_id = ${mentorId})
  `;

  const mentorName = await req.prisma.Mentor.findUnique({
    where: {
      id: mentorId,
    },
    select: {
      mentor_name: true,
    },
  });

  const filePath = 'output.pdf';
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(24);
  doc.font("Helvetica-Bold");
  doc.text("Marksheet", { align: "center" });

  doc.fontSize(18)  
  doc.font("Helvetica"); 
  doc.moveDown(0.4);
  doc.text(`Mentor: ${mentorName.mentor_name}`, { align: "right" });
  doc.moveDown(0.6);

  studentData.forEach((student, index) => {
    doc.fontSize(14);
    doc.text(`Student Name: ${student.student_name}`);
    doc.text(`Roll Number: ${student.student_roll}`);
    doc.moveDown(0.15)
    doc.fontSize(10);
    doc.text(`Branch: ${student.student_branch}`);
    doc.moveDown(0.1)
    doc.text(`Batch: ${student.student_batch}`);
    doc.moveDown(0.1)
    doc.text(`Ideation: ${student.ideation}   Execution: ${student.execution}   Pitch: ${student.pitch}`);
    doc.moveDown(0.1)
    doc.fontSize(12)
    doc.font('Helvetica-Bold')
    doc.text(`Total Marks: ${student.execution + student.ideation + student.pitch}`);
    doc.font("Helvetica")

    // Add a line break between students
    if (index < studentData.length - 1) {
      doc.moveDown(1); // Adjust as needed for spacing
    }
  });

  doc.end();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=marksheet.pdf');

  // Stream the generated PDF to the client\
  const pdfStream = fs.createReadStream(filePath);
  pdfStream.pipe(res);
});

module.exports = router;
