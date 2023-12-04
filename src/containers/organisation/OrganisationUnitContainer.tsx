import {
  Box,
  Button,
  Flex,
  Input,
  Radio,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import ModalWrapper from "components/modal/ModalWrapper";
import FolderTree, { NodeData } from "react-folder-tree";

import { FaDoorClosed } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";
import { RiDoorLockFill } from "react-icons/ri";
import { TbPoint } from "react-icons/tb";

import "react-responsive-pagination/themes/classic.css";

type Props = {};

const treeState: NodeData = {
  name: "HCMIU",
  checked: 0, // half check: some children are checked
  isOpen: true, // this folder is opened, we can see it's children
  children: [
    {
      name: "Khoa Khoa học & kỹ thuật máy tính",
      checked: 0, // half check: some children are checked
      isOpen: true, // this folder is opened, we can see it's children
      children: [
        { name: "Phòng hỗ trợ", checked: 0 },
        {
          name: "Phòng đóng tiền",
          checked: 0.5,
          isOpen: false,
          children: [
            { name: "Bộ phận giao tiếp", checked: 0 },
            { name: "Bộ phận thu tiền", checked: 1 },
          ],
        },
      ],
    },
    {
      name: "Khoa hoá học",
      checked: 0, // half check: some children are checked
      isOpen: true, // this folder is opened, we can see it's children
      children: [
        { name: "Phòng hỗ trợ", checked: 0 },
        {
          name: "Phòng đóng tiền",
          checked: 0.5,
          isOpen: false,
          children: [
            { name: "Bộ phận giao tiếp", checked: 0 },
            { name: "Bộ phận thu tiền", checked: 1 },
          ],
        },
      ],
    },
  ],
};

export const OrganisationUnitContainer = (props: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box>
      <PaperWrapper label="Organisation">
        <Box>
          <FolderTree
            data={treeState}
            showCheckbox={false}
            iconComponents={{
              FolderIcon: FaDoorClosed,
              FolderOpenIcon: FaDoorOpen,
              FileIcon: TbPoint,
            }}
          />
        </Box>
        <Button
          colorScheme="purple"
          position="absolute"
          top="24px"
          right="24px"
          onClick={onOpen}
        >
          Create Organisation
        </Button>
      </PaperWrapper>
      <ModalWrapper
        title="Create organisation"
        onClose={onClose}
        isOpen={isOpen}
      >
        <Flex direction="column" gap="12px">
          <Box>
            <Text mb="8px"> Name</Text>
            <Input
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
            />
            {/* {unitNameError && (
            <Text className="error-message">{unitNameError}</Text>
          )} */}
          </Box>
          <Box>
            <Text mb="8px">Unit Type</Text>
            <Select placeholder="Select option" variant="filled">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box>
            <Text mb="8px">Status</Text>
            <Stack spacing={5} direction="row">
              <Radio colorScheme="purple" value="1">
                Active
              </Radio>
              <Radio colorScheme="purple" value="2">
                Inactive
              </Radio>
            </Stack>
          </Box>
          <Box>
            <Text mb="8px">Parent Unit</Text>
            <Select placeholder="Select option" variant="filled">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box>
            <Text mb="8px">Description</Text>
            <Textarea
              placeholder="Here is a sample placeholder"
              variant="filled"
            />
          </Box>
          <Box>
            <Text mb="8px">Area of Operation</Text>
            <Textarea
              placeholder="Here is a sample placeholder"
              variant="filled"
            />
          </Box>
          <Box>
            <Text mb="8px">Organisation Leader</Text>
            <Select placeholder="Select option" variant="filled">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box>
            <Text mb="8px">Business Function</Text>
            <Textarea
              placeholder="Here is a sample placeholder"
              variant="filled"
            />
          </Box>
        </Flex>
      </ModalWrapper>
    </Box>
  );
};
