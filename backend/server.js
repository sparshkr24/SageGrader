require('dotenv').config();
const cors = require("cors");
const prisma = require("./prisma/prismaClient");
const studentRouter = require("./routes/student");
const mentorRouter = require("./routes/mentor");
const marksRouter = require("./routes/marks");
const assignStudentRouter = require("./routes/assignStudent");
const submissionRouter = require("./routes/submission");

const express = require("express");
const app = express();
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use("/api/student/", studentRouter);
app.use("/api/mentor/", mentorRouter);
app.use("/api/marks/", marksRouter);
app.use("/api/assignStudent/", assignStudentRouter);
app.use("/api/submission/", submissionRouter);
app.use("/api/generatePDF/", require("./routes/pdf"));

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
