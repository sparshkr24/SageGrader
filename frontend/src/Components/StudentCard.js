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

const StudentCard = ({ data, unAssignStudent, assignMarks }) => {
  const mentorId = 10;
  const [marks, setMarks] = useState({  
    ideation: data.ideation,
    execution: data.execution,
    pitch: data.pitch,
  });
  

  // const assignMarks = async (marks) => {
  //   console.log("Save button clicked");
  //   try {
  //     const bodyData = {
  //       studentId: data.id,
  //       mentorId: mentorId,
  //       ideation: marks.ideation,
  //       execution: marks.execution,
  //       pitch: marks.pitch,
  //     };
  //     const res = await axios.post(
  //       "http://localhost:5000/api/marks",
  //       bodyData
  //     );
  //     console.log(res.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(()=>{
    console.log("marks", marks);
  }, [marks])

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
              defaultValue={marks?.ideation}
              min={0}
              max={10}
              size={"sm"}
              width={"75px"}
              onChange={(newValueString) => {
                const newValue = parseInt(newValueString); 
                // console.log("New Value:", !isNaN(newValue) ? newValue: null);
                setMarks({
                  ...marks,
                  ideation: !isNaN(newValue) ? newValue: null,
                })
              }}
              isDisabled={data.lock_status}
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
          <HStack>
            <Text>Execution:</Text>
            <NumberInput
              defaultValue={marks?.execution}
              min={0}
              max={10}
              size={"sm"}
              width={"75px"}
              onChange={(newValueString) => {
                const newValue = parseInt(newValueString); 
                // console.log("New Value:", !isNaN(newValue) ? newValue: null);
                setMarks({
                  ...marks,
                  execution: !isNaN(newValue) ? newValue: null,
                })
              }}

              isDisabled={data.lock_status}
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
          <HStack>
            <Text>Pitch:</Text>
            <NumberInput
              defaultValue={marks?.pitch}
              min={0}
              max={10}
              size={"sm"}
              width={"75px"}
              onChange={(newValueString) => {
                const newValue = parseInt(newValueString); 
                // console.log("New Value:", !isNaN(newValue) ? newValue: null);
                setMarks({
                  ...marks,
                  pitch: !isNaN(newValue) ? newValue: null,
                })
              }}
              isDisabled={data.lock_status}
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
          <Stack direction={{ base: "column", md: "row" }}>
            <Button isDisabled={data.lock_status} onClick={() => {assignMarks(data.id, marks)}} variant="outline" colorScheme="green">
              Save
            </Button>
            <Button
              onClick={() => {
                unAssignStudent(data.id);
              }}
              colorScheme="red"
              isDisabled={data.lock_status}
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
