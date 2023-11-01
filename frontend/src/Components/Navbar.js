import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'






const Navbar = () => {
    return (
        <Box px={4} borderBottom={2} borderStyle={'solid'} borderColor='gray.400'>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

                <HStack spacing={10} alignItems={'center'}>
                    <Box fontSize={'1.2rem'} fontWeight={700}>SAGEgrader</Box>
                    <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                        <Box>
                            <Link to={'/'}>Add Students</Link>
                        </Box>
                        <Box>
                            <Link to={'/mystudents'}>My Students</Link>
                        </Box>
                        <Box>
                            <Link to={'/submissions'}>Submissions</Link>
                        </Box>
                    </HStack>
                </HStack>
            </Flex>
        </Box>
    )
}

export default Navbar