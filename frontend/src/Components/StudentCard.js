import {  Button, HStack,  NumberInput, NumberInputField, Stack, Text  } from '@chakra-ui/react'
import React, { useState } from 'react'

const StudentCard = ({ data }) => {
    const [marks, setMarks] = useState({
        "ideation": 8,
        "execution": 9,
        "pitch": 7
    })

    return (
        <>
            <Stack p="4" boxShadow="xl" m="4" borderRadius="sm">
                <Stack direction="row" alignItems="center">
                    <Text fontWeight="bold" fontSize={'20px'}>{data.name}</Text>
                </Stack>

                <Text fontWeight="semibold" fontSize={'18px'}>Roll Number : {data.rollNumber}</Text>
                <HStack gap={10}>

                    <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                        {data.branch}
                    </Text>
                    <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                        {data.batch}
                    </Text>
                </HStack>
                <HStack gap={10}>
                    <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                        Total Marks: {marks.ideation + marks.execution + marks.pitch}
                    </Text>
                </HStack>
                <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
                    <HStack>
                        <Text>Ideation:</Text>
                        <NumberInput defaultValue={marks.ideation} min={0} max={10} size={'sm'}  width={'75px'}>
                            <NumberInputField />

                        </NumberInput>
                    </HStack>
                    <HStack>
                        <Text>Execution:</Text>
                        <NumberInput defaultValue={marks.execution} min={0} max={10} size={'sm'} width={'75px'}>
                            <NumberInputField />
                        </NumberInput>
                    </HStack>
                    <HStack>
                        <Text>Pitch:</Text>
                        <NumberInput defaultValue={marks.pitch} min={0} max={10} size={'sm'}  width={'75px'}>
                            <NumberInputField />
                        </NumberInput>
                    </HStack>
                    <Stack direction={{ base: 'column', md: 'row' }}>
                        <Button variant="outline" colorScheme="green">
                            Save
                        </Button>
                        <Button colorScheme="red">Delete</Button>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default StudentCard