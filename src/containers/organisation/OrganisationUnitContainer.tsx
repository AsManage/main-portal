import {
  Box,
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import { DrawerWrapper } from "components/drawer/DrawerWrapper";
import ModalWrapper from "components/modal/ModalWrapper";
import React, { useEffect, useMemo, useState } from "react";
import FolderTree, { NodeData } from "react-folder-tree";

import { FaDoorClosed } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";
import { RiDoorLockFill } from "react-icons/ri";
import { TbPoint } from "react-icons/tb";

import "react-responsive-pagination/themes/classic.css";
import {
  getStructuralOUAction,
  organisationSelector,
} from "store/organisation";
import { useDispatch, useSelector } from "store/store";
import { showData } from "utils/common";

type Props = {};

const initFormData = {
  name: "",
  state: "Active",
  description: "",
  areaOfOperation: "",
  businessFunctionDescription: "",
  organisationUnitTypeId: 41,
  parentId: "",
  sortId: "",
};

const OrganisationUnitContainer = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onClose: onCloseDrawer,
    onOpen: onOpenDrawer,
  } = useDisclosure();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initFormData);
  const { structuralOU } = useSelector(organisationSelector);
  const [selectedOU, setSelectedOU] = useState<any>(null);

  const processData = useMemo(() => {
    const data = structuralOU?.map((lv1: any) => {
      return {
        name: showData(lv1?.name),
        isOpen: true,
        ...(lv1?.child?.length > 0
          ? {
              children: lv1?.child?.map((lv2: any) => {
                return {
                  name: showData(lv2?.name),
                  isOpen: true,
                  ...(lv2?.child?.length > 0
                    ? {
                        children: lv2?.child?.map((lv3: any) => {
                          return {
                            name: showData(lv3?.name),
                            isOpen: true,
                            ...(lv3?.child?.length > 0
                              ? {
                                  children: lv3?.child?.map((lv4: any) => {
                                    return {
                                      name: showData(lv4?.name),
                                      isOpen: true,
                                      ...(lv4?.child?.length > 0
                                        ? {
                                            children: lv4?.child?.map(
                                              (lv5: any) => {
                                                return {
                                                  name: showData(lv5?.name),
                                                  isOpen: true,
                                                };
                                              }
                                            ),
                                          }
                                        : {}),
                                    };
                                  }),
                                }
                              : {}),
                          };
                        }),
                      }
                    : {}),
                };
              }),
            }
          : {}),
      };
    });
    return {
      name: "Organisation Structural",
      isOpen: true,
      children: data,
    };
  }, [structuralOU]);

  const handleSetFormDataValue = (key: string, value: string | number) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  useEffect(() => {
    dispatch(getStructuralOUAction());
  }, []);

  return (
    <Box>
      <PaperWrapper label="Organisation">
        <Box>
          <FolderTree
            data={processData}
            showCheckbox={false}
            onNameClick={(e) => {
              setSelectedOU(e.nodeData);
              onOpenDrawer();
            }}
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
      <DrawerWrapper
        title={selectedOU?.name}
        isOpen={isOpenDrawer}
        onClose={onCloseDrawer}
      >
        <Flex flexDirection="column" gap="12px">
          <Box>
            <Text mb="8px">Name</Text>
            <Input
              value={selectedOU?.name}
              placeholder="Organisation name"
              size="sm"
            />
          </Box>
          <Box>
            <Text mb="8px">Description</Text>
            <Textarea
              value={selectedOU?.description}
              placeholder="Organisation description"
              size="sm"
            />
          </Box>
          <Box>
            <Text mb="8px">Area of Operation</Text>
            <Textarea
              value={selectedOU?.businessFunctionDescription}
              placeholder="Business description"
              size="sm"
            />
          </Box>
          <Box>
            <Text mb="8px">Business Description</Text>
            <Textarea
              value={selectedOU?.businessFunctionDescription}
              placeholder="Business description"
              size="sm"
            />
          </Box>
        </Flex>
      </DrawerWrapper>
      <ModalWrapper
        title="Create organisation"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
        <Flex direction="column" gap="12px">
          <Box>
            <Text fontWeight="bold" mb="8px">
              Name
            </Text>
            <Input
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              value={formData.name}
              onChange={(e) => {
                handleSetFormDataValue("name", e.target.value);
              }}
            />
          </Box>
          <Box>
            <Text fontWeight="bold" mb="8px">
              Unit Type
            </Text>
            <Select placeholder="Select option" variant="filled">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box>
            <Text fontWeight="bold" mb="8px">
              Status
            </Text>
            <RadioGroup
              onChange={(e) => {
                handleSetFormDataValue("state", e);
              }}
              value={formData.state}
            >
              <Stack direction="row">
                <Radio value="Active">Active</Radio>
                <Radio value="Inactive">Inactive</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box>
            <Text fontWeight="bold" mb="8px">
              Parent Unit
            </Text>
            <RadioGroup
              onChange={(e) => {
                console.log(e);
                handleSetFormDataValue("parentId", e);
              }}
              value={String(formData.parentId)}
            >
              <Stack
                direction="column"
                maxH="150px"
                overflow="auto"
                paddingX="12px"
              >
                {structuralOU?.map((lv1: any) => {
                  return (
                    <>
                      <Radio key={lv1.id} value={String(lv1.id)}>
                        {lv1.name}
                      </Radio>
                      {lv1?.child.map((lv2: any) => {
                        return (
                          <>
                            <Radio
                              marginLeft="24px"
                              key={lv2.id}
                              value={String(lv2.id)}
                            >
                              {lv2.name}
                            </Radio>
                            {lv2?.child.map((lv3: any) => {
                              return (
                                <>
                                  <Radio
                                    marginLeft="48px"
                                    key={lv3.id}
                                    value={String(lv3.id)}
                                  >
                                    {lv3.name}
                                  </Radio>
                                  {lv3?.child.map((lv4: any) => {
                                    return (
                                      <Radio
                                        marginLeft="72px"
                                        key={lv4.id}
                                        value={String(lv4.id)}
                                      >
                                        {lv4.name}
                                      </Radio>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </Stack>
            </RadioGroup>
          </Box>
          <Box>
            <Text fontWeight="bold" mb="8px">
              Description
            </Text>
            <Textarea
              placeholder="Description..."
              variant="filled"
              value={formData.description}
              onChange={(e) => {
                handleSetFormDataValue("description", e.target.value);
              }}
            />
          </Box>
          <Box>
            <Text fontWeight="bold" mb="8px">
              Area of Operation
            </Text>
            <Select
              value={formData.areaOfOperation}
              placeholder="Select option"
              variant="filled"
            >
              <option value="Business">Business</option>
              <option value="Office">Office</option>
              <option value="Supporting">Supporting</option>
              <option value="Producing">Producing</option>
            </Select>
          </Box>
          <Box>
            <Text fontWeight="bold" mb="8px">
              Business Function
            </Text>
            <Textarea
              placeholder="Business Description..."
              variant="filled"
              value={formData.businessFunctionDescription}
              onChange={(e) => {
                handleSetFormDataValue(
                  "businessFunctionDescription",
                  e.target.value
                );
              }}
            />
          </Box>
        </Flex>
      </ModalWrapper>
    </Box>
  );
};

export default React.memo(OrganisationUnitContainer);
