import React from 'react'
import StudentCard from '../components/StudentCard'
import { Box } from '@chakra-ui/react'

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
  return (
    <>
      {
        data.map((item, index) => {
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