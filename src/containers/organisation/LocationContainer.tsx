import {
  Box,
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";

import React, { useEffect, useMemo, useState } from "react";
import FolderTree from "react-folder-tree";
import "react-responsive-pagination/themes/classic.css";
import {
  IoCaretDownCircleOutline,
  IoCaretForwardCircleOutline,
} from "react-icons/io5";
import { TbDoor } from "react-icons/tb";

import { FaRegBuilding } from "react-icons/fa";
import { useDispatch, useSelector } from "store/store";
import {
  addLocationAction,
  getStructuralLocationAction,
  organisationSelector,
} from "store/organisation";
import { showData } from "utils/common";
import ModalWrapper from "components/modal/ModalWrapper";
import { DrawerWrapper } from "components/drawer/DrawerWrapper";

type Props = {};

const initFormData = {
  name: "",
  state: "Active",
  description: "",
  businessFunctionDescription: "",
  parentId: "-1",
  sortId: "0",
  code: "",
};

const initFormDataError = {
  name: "",
  code: "",
};

const LocationContainer = () => {
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onClose: onCloseDrawer,
    onOpen: onOpenDrawer,
  } = useDisclosure();
  const { structuralLocation } = useSelector(organisationSelector);
  const [formData, setFormData] = useState(initFormData);
  const [formDataError, setFormDataError] = useState(initFormDataError);
  const [selectedOU, setSelectedOU] = useState<any>(null);
  const [selectedOUError, setSelectedOUError] = useState(initFormDataError);

  const handleSetFormDataValue = (key: string, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSetFormDataEditValue = (key: string, value: string | number) => {
    setSelectedOU((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const error = { ...formDataError };
    let valid = true;
    if (!formData.name) {
      error.name = "Name is required";
      valid = false;
    } else {
      error.name = "";
    }
    if (!formData.code) {
      error.code = "Code is required";
      valid = false;
    } else {
      error.code = "";
    }
    setFormDataError(error);
    if (valid) {
      dispatch(
        addLocationAction({
          ...formData,
          sortId: Number(formData.sortId) + 1,
          callback: () => {
            setFormDataError(initFormDataError);
            setFormData(initFormData);
            onClose();
          },
        })
      );
    }
  };

  const processData = useMemo(() => {
    const data = structuralLocation?.map((lv1: any) => {
      return {
        name: showData(lv1?.name),
        isOpen: true,
        data: lv1,
        ...(lv1?.child?.length > 0
          ? {
              children: lv1?.child?.map((lv2: any) => {
                return {
                  name: showData(lv2?.name),
                  isOpen: true,
                  data: lv2,
                  ...(lv2?.child?.length > 0
                    ? {
                        children: lv2?.child?.map((lv3: any) => {
                          return {
                            name: showData(lv3?.name),
                            isOpen: true,
                            data: lv3,
                            ...(lv3?.child?.length > 0
                              ? {
                                  children: lv3?.child?.map((lv4: any) => {
                                    return {
                                      name: showData(lv4?.name),
                                      isOpen: true,
                                      data: lv4,
                                      ...(lv4?.child?.length > 0
                                        ? {
                                            children: lv4?.child?.map(
                                              (lv5: any) => {
                                                return {
                                                  name: showData(lv5?.name),
                                                  isOpen: true,
                                                  data: lv5,
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
      name: "Location Structural",
      isOpen: true,
      children: data,
      isRoot: true,
    };
  }, [structuralLocation]);

  useEffect(() => {
    dispatch(getStructuralLocationAction());
  }, [dispatch]);

  return (
    <Box>
      <PaperWrapper label="Location">
        <Box>
          <FolderTree
            data={processData}
            showCheckbox={false}
            onNameClick={(e) => {
              if (!e.nodeData.isRoot) {
                setSelectedOU(e.nodeData.data);
                onOpenDrawer();
              }
            }}
            iconComponents={{
              FolderIcon: FaRegBuilding,
              FolderOpenIcon: FaRegBuilding,
              FileIcon: TbDoor,
              CaretRightIcon: IoCaretForwardCircleOutline,
              CaretDownIcon: IoCaretDownCircleOutline,
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
          Create Location
        </Button>
      </PaperWrapper>
      <DrawerWrapper
        title={selectedOU?.name}
        isOpen={isOpenDrawer}
        // onSubmit={handleUpdate}
        onClose={onCloseDrawer}
      >
        <Flex direction="column" gap="12px">
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Name
            </Text>
            <Input
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              isInvalid={selectedOUError.name.length > 0}
              value={selectedOU?.name}
              onChange={(e) => {
                handleSetFormDataEditValue("name", e.target.value);
              }}
            />
            {selectedOUError.name && (
              <Text className="error-message">{selectedOUError.name}</Text>
            )}
          </Box>
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Code
            </Text>
            <Input
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              isInvalid={selectedOUError.code.length > 0}
              value={selectedOU?.code}
              onChange={(e) => {
                handleSetFormDataEditValue("code", e.target.value);
              }}
            />
            {selectedOUError.name && (
              <Text className="error-message">{selectedOUError.code}</Text>
            )}
          </Box>
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Status
            </Text>
            <RadioGroup
              colorScheme="purple"
              onChange={(e) => {
                handleSetFormDataEditValue("state", e);
              }}
              value={selectedOU?.state}
            >
              <Stack direction="row">
                <Radio value="Active">Active</Radio>
                <Radio value="Inactive">Inactive</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Parent Location
            </Text>
            <RadioGroup
              colorScheme="purple"
              onChange={(e) => {
                const data = e.split("#");
                handleSetFormDataEditValue("parentId", data[0]);
                handleSetFormDataEditValue("sortId", data[1]);
              }}
              value={`${String(selectedOU?.parentId)}#${selectedOU?.sortId}`}
            >
              <Stack
                direction="column"
                maxH="150px"
                overflow="auto"
                paddingX="12px"
              >
                <Radio value={"-1#0"}>No parent</Radio>
                {structuralLocation?.map((lv1: any) => {
                  return (
                    <React.Fragment key={lv1.id}>
                      <Radio value={`${String(lv1.id)}#${lv1.sortId}`}>
                        {lv1.name}
                      </Radio>
                      {lv1?.child.map((lv2: any) => {
                        return (
                          <React.Fragment key={lv2.id}>
                            <Radio
                              marginLeft="24px"
                              key={lv2.id}
                              value={`${String(lv2.id)}#${lv2.sortId}`}
                            >
                              {lv2.name}
                            </Radio>
                            {lv2?.child.map((lv3: any) => {
                              return (
                                <React.Fragment key={lv3.id}>
                                  <Radio
                                    marginLeft="48px"
                                    key={lv3.id}
                                    value={`${String(lv3.id)}#${lv3.sortId}`}
                                  >
                                    {lv3.name}
                                  </Radio>
                                  {lv3?.child.map((lv4: any) => {
                                    return (
                                      <Radio
                                        marginLeft="72px"
                                        key={lv4.id}
                                        value={`${String(lv4.id)}#${
                                          lv4.sortId
                                        }`}
                                      >
                                        {lv4.name}
                                      </Radio>
                                    );
                                  })}
                                </React.Fragment>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
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
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Description..."
              variant="filled"
              value={selectedOU?.description}
              onChange={(e) => {
                handleSetFormDataEditValue("description", e.target.value);
              }}
            />
          </Box>
          <Box>
            <Text fontWeight="bold" mb="8px">
              Business Function
            </Text>
            <Textarea
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Business Description..."
              variant="filled"
              value={selectedOU?.businessFunctionDescription}
              onChange={(e) => {
                handleSetFormDataEditValue(
                  "businessFunctionDescription",
                  e.target.value
                );
              }}
            />
          </Box>
          <Button colorScheme="red">Delete</Button>
        </Flex>
      </DrawerWrapper>
      <ModalWrapper
        title="Create location"
        onClose={() => {
          onClose();
          setFormDataError(initFormDataError);
          setFormData(initFormData);
        }}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
        <Flex direction="column" gap="12px">
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Name
            </Text>
            <Input
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              isInvalid={formDataError.name.length > 0}
              value={formData.name}
              onChange={(e) => {
                handleSetFormDataValue("name", e.target.value);
              }}
            />
            {formDataError.name && (
              <Text className="error-message">{formDataError.name}</Text>
            )}
          </Box>
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Code
            </Text>
            <Input
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              isInvalid={formDataError.code.length > 0}
              value={formData.code}
              onChange={(e) => {
                handleSetFormDataValue("code", e.target.value);
              }}
            />
            {formDataError.name && (
              <Text className="error-message">{formDataError.code}</Text>
            )}
          </Box>
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Status
            </Text>
            <RadioGroup
              colorScheme="purple"
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
            <Text className="required" fontWeight="bold" mb="8px">
              Parent Location
            </Text>
            <RadioGroup
              colorScheme="purple"
              onChange={(e) => {
                const data = e.split("#");
                handleSetFormDataValue("parentId", data[0]);
                handleSetFormDataValue("sortId", data[1]);
              }}
              value={`${String(formData.parentId)}#${formData.sortId}`}
            >
              <Stack
                direction="column"
                maxH="150px"
                overflow="auto"
                paddingX="12px"
              >
                <Radio value={"-1#0"}>No parent</Radio>
                {structuralLocation?.map((lv1: any) => {
                  return (
                    <React.Fragment key={lv1.id}>
                      <Radio value={`${String(lv1.id)}#${lv1.sortId}`}>
                        {lv1.name}
                      </Radio>
                      {lv1?.child.map((lv2: any) => {
                        return (
                          <React.Fragment key={lv2.id}>
                            <Radio
                              marginLeft="24px"
                              key={lv2.id}
                              value={`${String(lv2.id)}#${lv2.sortId}`}
                            >
                              {lv2.name}
                            </Radio>
                            {lv2?.child.map((lv3: any) => {
                              return (
                                <React.Fragment key={lv3.id}>
                                  <Radio
                                    marginLeft="48px"
                                    key={lv3.id}
                                    value={`${String(lv3.id)}#${lv3.sortId}`}
                                  >
                                    {lv3.name}
                                  </Radio>
                                  {lv3?.child.map((lv4: any) => {
                                    return (
                                      <Radio
                                        marginLeft="72px"
                                        key={lv4.id}
                                        value={`${String(lv4.id)}#${
                                          lv4.sortId
                                        }`}
                                      >
                                        {lv4.name}
                                      </Radio>
                                    );
                                  })}
                                </React.Fragment>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
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
              focusBorderColor="purple.400"
              colorScheme="purple"
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
              Business Function
            </Text>
            <Textarea
              focusBorderColor="purple.400"
              colorScheme="purple"
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

export default React.memo(LocationContainer);
