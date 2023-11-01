require('dotenv').config();
const prisma = require("./prisma/prismaClient");
const studentRouter = require("./routes/studentsWithoutMentor");
const allStudents = require("./routes/getAllStudents");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use("/api", studentRouter);
app.use("/api", allStudents)

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
