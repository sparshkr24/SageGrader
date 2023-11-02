import React, { useEffect, useState } from "react";
import SubmissionCard from "../Components/SubmissionCard";
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import api from "../helper/api";
import { PacmanLoader } from "react-spinners";

const boxStyle = {
  backgroundColor: "white", // Background color
  padding: "1rem", // Padding
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow
};

const Submission = () => {
  const [loading, setLoading] = useState(false);
  const [submissionData, setSubmissionData] = useState([]);
  const [markStatus, setMarkStatus] = useState("lock");

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/submission/all?markStatus=${markStatus}`
        );
        console.log(res.data.data);
        setSubmissionData(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissionData();
  }, [markStatus]);

  const handleMarStatusChange = (value) => {
    setMarkStatus(value);
  };
  return (
    <>
      <Box padding={"16px"}>
        <Text fontWeight="bold" fontSize="lg">
          Filters
        </Text>

        <RadioGroup
          onChange={handleMarStatusChange}
          value={markStatus}
          defaultValue="lock"
          colorScheme="teal"
        >
          <Wrap width="100%">
            <WrapItem>
              <Radio value="unassigned">Unassigned</Radio>
            </WrapItem>
            <WrapItem>
              <Radio value="assigned">Assigned</Radio>
            </WrapItem>
            <WrapItem>
              <Radio value="lock">Submission Locked</Radio>
            </WrapItem>
          </Wrap>
        </RadioGroup>
      </Box>

      {loading && (
        <Flex align="center" justify="center" h="500px" w="100%">
          <PacmanLoader color="#36d7b7" />
        </Flex>
      )}

      {!loading && (
        <Box p={"20px"} h="100%" width={"100%"}>
          <Wrap width={"100%"}>
            {submissionData.map((item, index) => {
              return (
                <WrapItem key={index}>
                  <SubmissionCard data={item} />
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      )}
    </>
  );
};

export default Submission;
