import { Avatar, Box, Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const SubmissionCard = ({data}) => {
  return (
    <>
        <Box
        // maxW={'270px'}
        w={'300px'}
        bg={ 'white'}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {data.student_name}
            </Heading>
            <Text color={'gray.500'}>{data.student_roll}</Text>
          </Stack>

          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'lg'} fontWeight={500} fontFamily={'body'}>
              Total Marks
            </Heading>
            <Text color={'gray.500'}>{isNaN(data.ideation + data.execution + data.pitch)? "Pending": data.ideation + data.execution + data.pitch}</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6} marginBottom={'10px'}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{data.ideation? data.ideation : "Pending"}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Ideation
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{data.execution? data.execution : "Pending"}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Execution
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{data.pitch? data.pitch: "Pending"}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Pitch
              </Text>
            </Stack>
          </Stack>

          <Button
            w={'full'}
            mt={8}
            bg={'gray.700'}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            Mail
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default SubmissionCard