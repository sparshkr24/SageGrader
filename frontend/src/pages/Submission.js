import React from 'react'
import SubmissionCard from '../Components/SubmissionCard'
import { Box, Wrap, WrapItem } from '@chakra-ui/react'

const studentData = [
  {
    "name": "John Doe",
    "rollNumber": "20bcs219",
    "ideation": 8,
    "execution": 9,
    "pitch": 7
  },
  {
    "name": "John Doe",
    "rollNumber": "20bcs219",
    "ideation": 8,
    "execution": 9,
    "pitch": 7
  },
  {
    "name": "John Doe",
    "rollNumber": "20bcs219",
    "ideation": 8,
    "execution": 9,
    "pitch": 7
  },
  {
    "name": "John Doe",
    "rollNumber": "20bcs219",
    "ideation": 8,
    "execution": 9,
    "pitch": 7
  },
  {
    "name": "John Doe",
    "rollNumber": "20bcs219",
    "ideation": 8,
    "execution": 9,
    "pitch": 7
  },
]

const Submission = () => {
  return (
    <>
      <Box>
        Filters
      </Box>
      <Box p={'20px'} h='100%' width={'100%'}>
        <Wrap width={'100%'}>
          {studentData.map((item, index) => {
            return (
              <WrapItem key={index}>
                <SubmissionCard data={item} />
              </WrapItem>
            )
          })}
        </Wrap>
      </Box>
    </>
  )
}

export default Submission