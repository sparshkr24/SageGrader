import React, { useEffect, useState } from 'react'
import StudentCard from '../Components/StudentCard'
import { Box } from '@chakra-ui/react'
import axios from 'axios'

const data = [
  {
    'rollNumber': 1,
    'name': "sparsh",
    'branch': 'CSE',
    'batch': '2020'
  },
  {
    'rollNumber': 2,
    'name': "sparsh",
    'branch': 'CSE',
    'batch': '2020'
  },
  {
    'rollNumber': 3,
    'name': "sparsh",
    'branch': 'CSE',
    'batch': '2020'
  },
  {
    'rollNumber': 4,
    'name': "sparsh",
    'branch': 'CSE',
    'batch': '2020'
  },
]

const MyStudents = () => {
  const [myStudents, setMyStudents] = useState(data)
  const mentorId = 10;

  useEffect(()=>{
    const fetchMyStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/assignStudent/mentor?mentorId=${mentorId}`
        );
        setMyStudents(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyStudentData();
  
  })
  return (
    <>
      {
        myStudents.map((item, index) => {
          return (
            <Box key={index} margin={'24px'}>
              <StudentCard data={item} />
            </Box>
          )
        })
      }
    </>
  )
}

export default MyStudents