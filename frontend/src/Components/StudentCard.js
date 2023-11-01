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
  

  const unAssignStudent = async () => {
    try {
      const bodyData = {
        studentId: data.id,
        mentorId: mentorId,
      };
      const res = await axios.delete(
        `http://localhost:5000/api/assignStudent?studentId=${data.id}&mentorId=${mentorId}`,
        bodyData
      );
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

//   const assignMarks = async (studentId) => {
//     console.log("Save button clicked");
//     try {
//       const bodyData = {
//         studentId: studentId,
//         mentorId: mentorId,
//         ideation: marks.ideation,
//         execution: marks.execution,
//         pitch: marks.pitch,
//       };
//       const res = await axios.post(
//         "http://localhost:5000/api/marks",
//         bodyData
//       );
//       console.log(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

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
            Total Marks: {data.ideation + data.execution + data.pitch}
          </Text>
        </HStack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <HStack>
            <Text>Ideation:</Text>
            <NumberInput
              defaultValue={data?.ideation}
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
              defaultValue={data.execution? data.execution : null}
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
              defaultValue={data.pitch? data.pitch : null}
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
                unAssignStudent();
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
