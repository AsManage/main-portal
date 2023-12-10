import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import FolderTree from "react-folder-tree";
import "react-responsive-pagination/themes/classic.css";
import {
  addOUAction,
  getAllListOUnitTypeAction,
  getStructuralOUAction,
  organisationSelector,
} from "store/organisation";
import { useDispatch, useSelector } from "store/store";
import { havePermission, showData } from "utils/common";
import { deleteOUnit, updateOUnit } from "services/organisation.service";
import {
  IoCaretDownCircleOutline,
  IoCaretForwardCircleOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { PERMISSION } from "constants/common";
import { PermissionWrapper } from "components/wrapper/PermissionWrapper";

type Props = {};

const initFormData = {
  name: "",
  state: "Active",
  description: "",
  areaOfOperation: "",
  businessFunctionDescription: "",
  organisationUnitTypeId: "",
  parentId: "-1",
  sortId: "0",
};

const OrganisationUnitContainer = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = React.useRef(null);
  const {
    isOpen: isOpenDrawer,
    onClose: onCloseDrawer,
    onOpen: onOpenDrawer,
  } = useDisclosure();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initFormData);
  const [formDataError, setFormDataError] = useState({
    name: "",
    areaOfOperation: "",
    organisationUnitTypeId: "",
  });
  const { structuralOU, listOUType } = useSelector(organisationSelector);
  const [selectedOU, setSelectedOU] = useState<any>(null);
  const [selectedOUError, setSelectedOUError] = useState({
    name: "",
    areaOfOperation: "",
    organisationUnitTypeId: "",
  });

  const processData = useMemo(() => {
    const data = structuralOU?.map((lv1: any) => {
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
      name: "Organisation Structural",
      isOpen: true,
      children: data,
      isRoot: true,
    };
  }, [structuralOU]);

  const handleSetFormDataValue = (key: string, value: string | number) => {
    setFormData((prev) => ({
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
    if (!formData.areaOfOperation) {
      error.areaOfOperation = "Area of Operation is required";
      valid = false;
    } else {
      error.areaOfOperation = "";
    }
    if (!formData.organisationUnitTypeId) {
      error.organisationUnitTypeId = "Unit Type is required";
      valid = false;
    } else {
      error.organisationUnitTypeId = "";
    }
    setFormDataError(error);
    if (valid) {
      dispatch(
        addOUAction({
          ...formData,
          sortId: Number(formData.sortId) + 1,
          callback: () => {
            setFormDataError({
              name: "",
              areaOfOperation: "",
              organisationUnitTypeId: "",
            });
            setFormData(initFormData);
            onClose();
          },
        })
      );
    }
  };

  const handleUpdate = async () => {
    const error = { ...selectedOUError };
    let valid = true;
    if (!selectedOU.name) {
      error.name = "Name is required";
      valid = false;
    } else {
      error.name = "";
    }
    if (!selectedOU.areaOfOperation) {
      error.areaOfOperation = "Area of Operation is required";
      valid = false;
    } else {
      error.areaOfOperation = "";
    }
    if (
      !selectedOU.organisationUnitTypeId ||
      !listOUType.find(
        (ele: any) => ele.id == selectedOU.organisationUnitTypeId
      )
    ) {
      error.organisationUnitTypeId = "Unit Type is required";
      valid = false;
    } else {
      error.organisationUnitTypeId = "";
    }
    setSelectedOUError(error);
    if (valid) {
      const res = await updateOUnit({
        ...selectedOU,
        ouId: selectedOU?.id,
      });
      if (res.data.isSuccess) {
        dispatch(getStructuralOUAction());
        onCloseDrawer();
      }
    }
  };

  const handleDelete = async () => {
    const res = await deleteOUnit({
      ouId: selectedOU?.id,
    });
    if (res.data.isSuccess) {
      dispatch(getStructuralOUAction());
      onCloseDrawer();
      onCloseAlert();
    }
  };

  useEffect(() => {
    dispatch(getStructuralOUAction());
    dispatch(getAllListOUnitTypeAction());
  }, [dispatch]);

  return (
    <Box>
      <PaperWrapper label="Organisation">
        <PermissionPageWrapper permission={PERMISSION.VIEW_ORGANISATION_UNIT}>
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
                FolderIcon: IoPeopleOutline,
                FolderOpenIcon: IoPeopleOutline,
                FileIcon: IoPersonOutline,
                CaretRightIcon: IoCaretForwardCircleOutline,
                CaretDownIcon: IoCaretDownCircleOutline,
              }}
            />
          </Box>
        </PermissionPageWrapper>
        <PermissionWrapper permission={PERMISSION.ADD_ORGANISATION_UNIT}>
          <Button
            colorScheme="purple"
            position="absolute"
            top="24px"
            right="24px"
            onClick={onOpen}
          >
            Create Organisation
          </Button>
        </PermissionWrapper>
      </PaperWrapper>
      <DrawerWrapper
        title={selectedOU?.name}
        isOpen={isOpenDrawer}
        onSubmit={handleUpdate}
        onClose={onCloseDrawer}
        isHideSave={havePermission(PERMISSION.EDIT_ORGANISATION_UNIT)}
      >
        <Flex flexDirection="column" gap="12px">
          <Box>
            <Text mb="8px">Name</Text>
            <Input
              value={selectedOU?.name}
              isInvalid={selectedOUError.name?.length > 0}
              placeholder="Organisation name"
              size="sm"
              isDisabled={!havePermission(PERMISSION.EDIT_ORGANISATION_UNIT)}
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
              Unit Type
            </Text>
            <Select
              focusBorderColor="purple.400"
              colorScheme="purple"
              value={selectedOU?.organisationUnitTypeId}
              onChange={(e) => {
                handleSetFormDataEditValue(
                  "organisationUnitTypeId",
                  e.target.value
                );
              }}
              isDisabled={!havePermission(PERMISSION.EDIT_ORGANISATION_UNIT)}
              placeholder="Select option"
            >
              {listOUType?.map((ele: any) => {
                return (
                  <option key={ele.id} value={ele.id}>
                    {ele.name}
                  </option>
                );
              })}
            </Select>
            {selectedOUError.organisationUnitTypeId && (
              <Text className="error-message">
                {selectedOUError.organisationUnitTypeId}
              </Text>
            )}
          </Box>
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Status
            </Text>
            <RadioGroup
              colorScheme="purple"
              value={selectedOU?.state}
              isDisabled={!havePermission(PERMISSION.EDIT_ORGANISATION_UNIT)}
              onChange={(e) => {
                handleSetFormDataEditValue("state", e);
              }}
            >
              <Stack direction="row">
                <Radio value="Active">Active</Radio>
                <Radio value="Inactive">Inactive</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box>
            <Text mb="8px">Description</Text>
            <Textarea
              value={selectedOU?.description}
              isDisabled={!havePermission(PERMISSION.EDIT_ORGANISATION_UNIT)}
              onChange={(e) => {
                handleSetFormDataEditValue("description", e.target.value);
              }}
              placeholder="Organisation description"
              size="sm"
            />
          </Box>
          <Box>
            <Text mb="8px" className="required">
              Area of Operation
            </Text>
            <Select
              focusBorderColor="purple.400"
              isInvalid={selectedOUError.areaOfOperation.length > 0}
              colorScheme="purple"
              value={selectedOU?.areaOfOperation}
              onChange={(e) => {
                handleSetFormDataEditValue("areaOfOperation", e.target.value);
              }}
              isDisabled={!havePermission(PERMISSION.EDIT_ORGANISATION_UNIT)}
              placeholder="Select option"
              variant="filled"
            >
              <option value="Business">Business</option>
              <option value="Office">Office</option>
              <option value="Supporting">Supporting</option>
              <option value="Producing">Producing</option>
            </Select>
            {selectedOUError.areaOfOperation && (
              <Text className="error-message">
                {selectedOUError.areaOfOperation}
              </Text>
            )}
          </Box>
          <Box>
            <Text mb="8px">Business Description</Text>
            <Textarea
              value={selectedOU?.businessFunctionDescription}
              onChange={(e) => {
                handleSetFormDataEditValue(
                  "businessFunctionDescription",
                  e.target.value
                );
              }}
              isDisabled={!havePermission(PERMISSION.EDIT_ORGANISATION_UNIT)}
              placeholder="Business description"
              size="sm"
            />
          </Box>
          <PermissionWrapper permission={PERMISSION.DELETE_ORGANISATION_UNIT}>
            <Button colorScheme="red" onClick={onOpenAlert}>
              Delete
            </Button>
          </PermissionWrapper>
        </Flex>
      </DrawerWrapper>
      <ModalWrapper
        title="Create organisation"
        onClose={() => {
          onClose();
          setFormDataError({
            name: "",
            areaOfOperation: "",
            organisationUnitTypeId: "",
          });
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
              Unit Type
            </Text>
            <Select
              isInvalid={formDataError.organisationUnitTypeId.length > 0}
              focusBorderColor="purple.400"
              colorScheme="purple"
              value={formData.organisationUnitTypeId}
              onChange={(e) => {
                handleSetFormDataValue(
                  "organisationUnitTypeId",
                  e.target.value
                );
              }}
              placeholder="Select option"
              variant="filled"
            >
              {listOUType?.map((ele: any) => {
                return (
                  <option key={ele.id} value={ele.id}>
                    {ele.name}
                  </option>
                );
              })}
            </Select>
            {formDataError.organisationUnitTypeId && (
              <Text className="error-message">
                {formDataError.organisationUnitTypeId}
              </Text>
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
              Parent Unit
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
                {structuralOU?.map((lv1: any) => {
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
            <Text className="required" fontWeight="bold" mb="8px">
              Area of Operation
            </Text>
            <Select
              focusBorderColor="purple.400"
              colorScheme="purple"
              isInvalid={formDataError.areaOfOperation.length > 0}
              value={formData.areaOfOperation}
              onChange={(e) => {
                handleSetFormDataValue("areaOfOperation", e.target.value);
              }}
              placeholder="Select option"
              variant="filled"
            >
              <option value="Business">Business</option>
              <option value="Office">Office</option>
              <option value="Supporting">Supporting</option>
              <option value="Producing">Producing</option>
            </Select>
            {formDataError.areaOfOperation && (
              <Text className="error-message">
                {formDataError.areaOfOperation}
              </Text>
            )}
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
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Organisation
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to delete? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default React.memo(OrganisationUnitContainer);
