import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const hoverClass = {
    transition: "all 0.3s ease-in-out",
    bg: "teal.100",
    padding: 2,
    borderRadius: "md",
    transform: "scale(1.05)",
  };
  return (
    <Box px={4} borderBottom={2} borderStyle={"solid"} borderColor="gray.400">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={10} alignItems={"center"}>
          <Box fontSize={"1.2rem"} fontWeight={700}>
            SageGrader
          </Box>
          <HStack
            gap={20}
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
            <Box
              _hover={hoverClass}
            >
              <Link to={"/"}>Add Students</Link>
            </Box>
            <Box
              _hover={hoverClass}
            >
              <Link to={"/mystudents"}>My Students</Link>
            </Box>
            <Box
              _hover={hoverClass}
            >
              <Link to={"/submissions"}>Submissions</Link>
            </Box>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
