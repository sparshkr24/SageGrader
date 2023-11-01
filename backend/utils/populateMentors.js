const axios = require("axios");

const department = [
  "CSE",
  "ECE",
  "ME",
  "Design",
  "Physics",
  "Mathematics",
  "Chemistry",
  "HSS",
];

const indianFirstNames = [
  "Rajesh",
  "Smita",
  "Pranav",
  "Kavita",
  "Rahul",
  "Anjali",
  "Rajendra",
  "Preeti",
  "Suresh",
  "Mitali",
  "Ashish",
  "Anushka",
  "Nikhil",
  "Deepika",
  "Alok",
];

const indianLastNames = [
  "Choudhary",
  "Pandit",
  "Mehra",
  "Srivastava",
  "Bhatia",
  "Gandhi",
  "Dhawan",
  "Kulkarni",
  "Tiwari",
  "Chakraborty",
  "Iyer",
  "Verma",
  "Shetty",
  "Kapoor",
  "Reddy",
];

// Function to randomly select a string
function getRandomIndex() {
  const randomIndex = Math.floor(Math.random() * department.length);
  return randomIndex;
}

function generateMentor(randomIndex) {
  let mentor = {
    mentorName: "",
    dept: "",
  };

  const randomFirst = Math.floor(Math.random() * indianFirstNames.length);
  const randomLast = Math.floor(Math.random() * indianLastNames.length);

  mentor.mentorName += indianFirstNames[randomFirst] + " " + indianLastNames[randomLast];
  mentor.dept += department[randomIndex];

  return mentor;
}

async function populateDatabase() {
  for (let i = 0; i < 11; i++) {
    const randomIndex = getRandomIndex();
    const mentor = generateMentor(randomIndex);

    try {
      await axios.post("http://localhost:5000/api/mentor", mentor);
      console.log(`Mentor ${i + 1} added to the database.`);
    } catch (error) {
      console.error(`Error adding mentor ${i + 1}:`, error);
    }

    // Introduce a 0.05-second (50 milliseconds) delay after each iteration
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
}
populateDatabase();
