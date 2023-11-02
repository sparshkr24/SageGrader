const axios = require("axios");

const branchRoll = ["bcs", "bec", "bme", "bsm", "bdes"];
const branchOptions = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Smart Manufacturing",
  "Design",
];
const batchOptions = ["2019", "2020", "2021", "2022", "2023"];
const batchRoll = ["19", "20", "21", "22", "23"];

const indianFirstNames = [
  "Aarav",
  "Aanya",
  "Aarushi",
  "Aditi",
  "Aisha",
  "Akshay",
  "Ananya",
  "Anika",
  "Aryan",
  "Avni",
  "Ishaan",
  "Krishna",
  "Maya",
  "Neha",
  "Nisha",
  "Rahul",
  "Riya",
  "Rohan",
  "Sahil",
  "Sanya",
  "Sarthak",
  "Shreya",
  "Siddharth",
  "Simran",
  "Tanvi",
  "Tanya",
  "Vedant",
  "Yash",
  "Zara",
];

const indianLastNames = [
  "Kumar",
  "Singh",
  "Sharma",
  "Verma",
  "Yadav",
  "Gupta",
  "Patel",
  "Jain",
  "Shah",
  "Mehta",
  "Pandey",
];

// Function to randomly select a string
function getRandomIndex() {
  const randomIndex = Math.floor(Math.random() * branchOptions.length);
  return randomIndex;
}

function generateStudent(randomIndex) {
  let student = {
    studentName: "",
    rollNo: "",
    branch: "",
    batch: 0,
    email: "",
  };

  const randomFirst = Math.floor(Math.random() * indianFirstNames.length);
  const randomLast = Math.floor(Math.random() * indianLastNames.length);

  student.studentName +=
    indianFirstNames[randomFirst] + " " + indianLastNames[randomLast];
  student.rollNo +=
    batchRoll[randomIndex] +
    branchRoll[randomIndex] +
    Math.floor(Math.random() * 149 + 101);
  student.branch += branchOptions[randomIndex];
  student.batch = parseInt(batchOptions[randomIndex]);
  student.email += student.rollNo + "@iiitdmj.ac.in";

  return student;
}

async function populateDatabase() {
  for (let i = 0; i < 65; i++) {
    const randomIndex = getRandomIndex();
    const student = generateStudent(randomIndex);

    try {
      await axios.post("http://localhost:5000/api/student", student);
      console.log(`Student ${i + 1} added to the database.`);
    } catch (error) {
      console.error(`Error adding student ${i + 1}:`, error);
    }

    // Introduce a 0.05-second (50 milliseconds) delay after each iteration
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
}
populateDatabase();
