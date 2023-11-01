import {
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentCard = ({ data }) => {
  const mentorId = 10;
  const [marks, setMarks] = useState({
    ideation: 8,
    execution: 9,
    pitch: 7,
  });

  const unAssignStudent = async (id) => {
    try {
      const bodyData = {
        studentId: id,
        mentorId: mentorId,
      };
      const res = await axios.delete(
        `http://localhost:5000/api/assignStudent?studentId=${id}&mentorId=${mentorId}`,
        bodyData
      );
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    const fetchMarks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/marks/student?studentId=${data.id}`
        );
        setMarks(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMarks();
  }, [data.id])

  return (
    <>
      <Stack p="4" boxShadow="xl" m="4" borderRadius="sm">
        <Stack direction="row" alignItems="center">
          <Text fontWeight="bold" fontSize={"20px"}>
            {data.student_name}
          </Text>
        </Stack>

        <Text fontWeight="semibold" fontSize={"18px"}>
          Roll Number : {data.student_roll}
        </Text>
        <HStack gap={10}>
          <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
            {data.student_branch}
          </Text>
          <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
            {data.student_batch}
          </Text>
        </HStack>
        <HStack gap={10}>
          <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
            Total Marks: {marks.ideation + marks.execution + marks.pitch}
          </Text>
        </HStack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <HStack>
            <Text>Ideation:</Text>
            <NumberInput
              defaultValue={marks.ideation}
              min={0}
              max={10}
              size={"sm"}
              width={"75px"}
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
          <HStack>
            <Text>Execution:</Text>
            <NumberInput
              defaultValue={marks.execution}
              min={0}
              max={10}
              size={"sm"}
              width={"75px"}
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
          <HStack>
            <Text>Pitch:</Text>
            <NumberInput
              defaultValue={marks.pitch}
              min={0}
              max={10}
              size={"sm"}
              width={"75px"}
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
          <Stack direction={{ base: "column", md: "row" }}>
            <Button variant="outline" colorScheme="green">
              Save
            </Button>
            <Button
              onClick={() => {
                unAssignStudent(data.id);
              }}
              colorScheme="red"
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default StudentCard;
