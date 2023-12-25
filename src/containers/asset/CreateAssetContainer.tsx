import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import React from "react";

type Props = {};

export default function CreateAssetContainer({}: Props) {
  return (
    <PaperWrapper label="Create New Asset">
      <Button colorScheme="purple" position="absolute" top="24px" right="24px">
        Submit
      </Button>
      <Box display="flex" gap="12px" flexDirection="column">
        <Flex gap="12px">
          <Box w="50%">
            <Text className="required" mb="8px">
              Asset Name
            </Text>
            <Input
              placeholder="Macbook pro M1..."
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
            />
          </Box>
          <Box w="50%">
            <Text className="required" mb="8px">
              Quantity
            </Text>
            <Input
              type="number"
              placeholder="1"
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
            />
          </Box>
        </Flex>
        <Flex gap="12px">
          <Box w="50%">
            <Text className="required" mb="8px">
              Original Cost
            </Text>
            <Input
              type="number"
              placeholder="450$"
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
            />
          </Box>
          <Box w="50%">
            <Text className="required" mb="8px">
              Series Number
            </Text>
            <Input
              placeholder="HSWQQ12321..."
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
            />
          </Box>
        </Flex>
        <Flex gap="12px">
          <Box w="50%">
            <Text className="required" mb="8px">
              Warrant Duration
            </Text>
            <Input
              type="number"
              placeholder="12"
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
            />
          </Box>
          <Box w="50%">
            <Text className="required" mb="8px">
              Time Unit
            </Text>
            <Input
              placeholder="month..."
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
            />
          </Box>
        </Flex>
        <Flex gap="12px">
          <Box w="50%">
            <Text className="required" mb="8px">
              Depreciation Amount
            </Text>
            <Input
              type="number"
              placeholder="15..."
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
            />
          </Box>
          <Box w="50%">
            <Text mb="8px">Acquisition Source</Text>
            <Select
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Select option"
              variant="filled"
            >
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Other"}>Other</option>
            </Select>
          </Box>
        </Flex>
        <Flex gap="12px">
          <Box w="50%">
            <Text mb="8px">Category</Text>
            <Select
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Select option"
              variant="filled"
            >
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Other"}>Other</option>
            </Select>
          </Box>
          <Box w="50%">
            <Text mb="8px">Type</Text>
            <Select
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Select option"
              variant="filled"
            >
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Other"}>Other</option>
            </Select>
          </Box>
        </Flex>
        <Flex gap="12px">
          <Box w="50%">
            <Text className="required" mb="8px">
              Condition State
            </Text>
            <Textarea
              placeholder=""
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
            />
          </Box>
          <Box w="50%">
            <Text className="required" mb="8px">
              Note
            </Text>
            <Textarea
              placeholder=""
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
            />
          </Box>
        </Flex>
      </Box>
    </PaperWrapper>
  );
}
