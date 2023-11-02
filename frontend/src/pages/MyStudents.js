import React, { useEffect, useState } from "react";
import StudentCard from "../Components/StudentCard";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import axios from "axios";

const MyStudents = () => {
  const [myStudents, setMyStudents] = useState([]);
  const mentorId = 10;

  useEffect(() => {
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
  }, []);

  const handleLockSubmissions = async () => {
    try {
      const bodyData = {
        studentData: myStudents,
        mentorId: mentorId,
      }
      const res = await axios.post(
        `http://localhost:5000/api/submission/lock`, bodyData
      );
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const unAssignStudent = async (id) => {
    try {
      
      const res = await axios.delete(
        `http://localhost:5000/api/assignStudent?studentId=${id}&mentorId=${mentorId}`
      );
      console.log(res.data.data);

      if(res.status === 200){
        const newStudents = myStudents.filter((student) => {
          return student.id !== id;
        });
        setMyStudents(newStudents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const assignMarks = async (id, marks) => {
    console.log("Save button clicked");
    try {
      const bodyData = {
        studentId: id,
        mentorId: mentorId,
        ideation: marks.ideation,
        execution: marks.execution,
        pitch: marks.pitch,
      };
      const res = await axios.post(
        "http://localhost:5000/api/marks",
        bodyData
      );

      if(res.status === 200){
        const newStudents = myStudents.map((student) => {
          if(student.id === id){
            return {
              ...student,
              ideation: marks.ideation,
              execution: marks.execution,
              pitch: marks.pitch,
            }
          } else {
            return student;
          }
        });
        setMyStudents(newStudents);
      }
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Flex align="center" p={4} boxShadow="md" bgColor="white" paddingX={'40px'}>
        <Heading as="h1" size="lg">
          My Students
        </Heading>
        <Spacer />
        <Button onClick={handleLockSubmissions} colorScheme="blue" size="sm">
          Lock Submission
        </Button>
      </Flex>
      {myStudents.map((item, index) => {
        return (
          <Box key={index} margin={"24px"}>
            <StudentCard data={item} unAssignStudent={unAssignStudent} assignMarks={assignMarks} />
          </Box>
        );
      })}
    </>
  );
};

export default MyStudents;
