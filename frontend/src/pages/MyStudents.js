import React, { useEffect, useState } from "react";
import StudentCard from "../Components/StudentCard";
import {
  Box,
  Button,
  CheckboxIcon,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { PacmanLoader, PuffLoader } from "react-spinners";

// import icon from "./MyStudents/greenCheck.svg";

const MyStudents = () => {
  const [loading, setLoading] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  const [myStudents, setMyStudents] = useState([]);
  const mentorId = 10;

  useEffect(() => {
    const fetchMyStudentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/assignStudent/mentor?mentorId=${mentorId}`
        );
        setMyStudents(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudentData();
  }, []);

  const handleLockSubmissions = async () => {
    try {
      setSmallLoading(true);
      const bodyData = {
        studentData: myStudents,
        mentorId: mentorId,
      };
      const res = await axios.post(
        `http://localhost:5000/api/submission/lock`,
        bodyData
      );
      console.log(res.data.data);

      if (res.status === 200) {
        const newStudents = myStudents.map((student) => {
          return {
            ...student,
            lock_status: true,
          };
        });
        setMyStudents(newStudents);
        toast.success("Submission locked successfully");
      }
    } catch (error) {
      if (myStudents.length < 3) {
        toast.error(
          "Please select at least 3 students before locking submission"
        );
      } else {
        toast.error(
          "Please assign marks to all students before locking submission"
        );
      }
      console.log(error);
    } finally {
      setSmallLoading(false);
    }
  };

  const unAssignStudent = async (id) => {
    try {
      setSmallLoading(true);
      const res = await axios.delete(
        `http://localhost:5000/api/assignStudent?studentId=${id}&mentorId=${mentorId}`
      );
      console.log(res.data.data);

      if (res.status === 200) {
        const newStudents = myStudents.filter((student) => {
          return student.id !== id;
        });
        setMyStudents(newStudents);
        toast.success("Student removed successfully");
      }
    } catch (error) {
      toast.error("Cannot remove student");
      console.log(error);
    } finally {
      setSmallLoading(false);
    }
  };

  const assignMarks = async (id, marks) => {
    console.log("Save button clicked");
    try {
      setSmallLoading(true);
      const bodyData = {
        studentId: id,
        mentorId: mentorId,
        ideation: marks.ideation,
        execution: marks.execution,
        pitch: marks.pitch,
      };
      const res = await axios.post("http://localhost:5000/api/marks", bodyData);

      if (res.status === 200) {
        const newStudents = myStudents.map((student) => {
          if (student.id === id) {
            return {
              ...student,
              ideation: marks.ideation,
              execution: marks.execution,
              pitch: marks.pitch,
            };
          } else {
            return student;
          }
        });
        setMyStudents(newStudents);
        toast.success("Marks assigned successfully");
      }
      console.log(res.data.data);
    } catch (error) {
      toast.error("Please assign marks for each category before saving");
      console.log(error);
    } finally {
      setSmallLoading(false);
    }
  };

  return (
    <>
      <Flex
        align="center"
        p={4}
        boxShadow="md"
        bgColor="white"
        paddingX={"40px"}
      >
        <Heading as="h1" size="lg">
          My Students
        </Heading>
        <Spacer />
        {myStudents[0]?.lock_status ? (
          <Box display="flex" alignItems="center">
            <img width={20} height={20} src="./greenCheck.svg" alt="checked" />
            <Text marginLeft={2} color="green.500" fontWeight="bold">
              Locked
            </Text>
          </Box>
        ) : (
          <Button onClick={handleLockSubmissions} colorScheme="blue" size="sm">
            Lock Submission
          </Button>
        )}
      </Flex>
      <HStack align="center" p={4} paddingX={"40px"} color={"yellow.500"}>
        <Text>
          <Text fontWeight="semibold" fontSize="lg">
            Note
          </Text>{" "}
          Please select atleast 3 students to lock the submission.
        </Text>
        <Box>
          {smallLoading && (
            <Flex paddingTop={'4px'}>
              <PuffLoader size={"40"} color="#36d7b7" />
            </Flex>
          )}
        </Box>
      </HStack>

      {/* Dispaly a loader while fetching the data */}
      {loading && (
        <Flex align="center" justify="center" h="500px" w="100%">
          <PacmanLoader color="#36d7b7" />
        </Flex>
      )}

      {!loading &&
        myStudents.map((item, index) => {
          return (
            <Box key={index} margin={"24px"}>
              <StudentCard
                data={item}
                unAssignStudent={unAssignStudent}
                assignMarks={assignMarks}
              />
            </Box>
          );
        })}
    </>
  );
};

export default MyStudents;
