import {
  Box,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Button,
  Flex,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PacmanLoader, PuffLoader } from "react-spinners";
import api from "../helper/api";

const AddStudents = () => {
  const [loading, setLoading] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page number
  const [assignedStudentsList, setAssignedStudentsList] = useState([]);

  useEffect(() => {
    const fetchAssignedStudents = async () => {
      try {
        const res = await api.get("/assignStudent/all");

        // console.log(res.data.data);
        setAssignedStudentsList(res.data.data);
      } catch (error) {
        console.log("error while fetching assigned students", error);
      }
    };

    fetchAssignedStudents();
  }, []);

  useEffect(() => {
    // Function to fetch student data based on the current page
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/student?page=${currentPage}`);
        setStudentData(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const assignStudent = async (studentId) => {
    try {
      setSmallLoading(true);
      const bodyData = {
        studentId: studentId,
        mentorId: 10,
      };
      const res = await api.post("/assignStudent", bodyData);
      if (res.status === 200) {
        console.log(res.data.data);
        toast.success("Student assigned successfully");
      } else {
        console.log(res.data.error);
      }
    } catch (error) {
      toast.error("Cannot assign student");
      console.log("error while assigning student", error);
    } finally {
      setSmallLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <Flex align="center" justify="center" h="500px" w="100%">
          <PacmanLoader color="#36d7b7" />
        </Flex>
      </>
    );

  return (
    <>
      <VStack
        h="100%"
        w="100%"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={10}
        marginTop={"20px"}
      >
        <HStack width={"300px"}>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Box>
            {smallLoading && <PuffLoader size={"40"} color="#36d7b7" />}
          </Box>
        </HStack>
        <TableContainer>
          <Table colorScheme="teal">
            {/* <TableCaption>List of all students</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Roll Number</Th>
                <Th>Name</Th>
                <Th isNumeric>Batch</Th>
                <Th isNumeric>Branch</Th>
                <Th isNumeric>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {studentData.map((item, index) => {
                return (
                  <Tr
                    cursor={
                      assignedStudentsList.includes(item.id)
                        ? "not-allowed"
                        : "pointer"
                    }
                    key={index}
                    onClick={() => {
                      assignStudent(item.id);
                    }}
                    bg={
                      assignedStudentsList.includes(item.id) ? "gray.300" : ""
                    }
                    _hover={
                      assignedStudentsList.includes(item.id)
                        ? {}
                        : {
                            transform: "scale(1.05)", // Increase the scale on hover
                          }
                    }
                  >
                    <Td>{item.student_roll}</Td>
                    <Td>{item.student_name}</Td>
                    <Td isNumeric>{item.student_batch}</Td>
                    <Td isNumeric>{item.student_branch}</Td>
                    <Td isNumeric>{item.email}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Box>
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span style={{ margin: "12px", fontWeight: "bold" }}>
              {currentPage}{" "}
            </span>

            <Button onClick={handleNextPage}>Next</Button>
          </Box>
        </TableContainer>
      </VStack>
    </>
  );
};

export default AddStudents;
