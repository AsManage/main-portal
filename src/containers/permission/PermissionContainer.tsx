import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import { FaEdit, FaMinusSquare, FaPlusSquare, FaTrash } from "react-icons/fa";
import { showData } from "utils/common";
import React, { useEffect, useMemo, useState } from "react";
import {
  getListRoleAction,
  getListSystemPermissionAction,
  userSelector,
} from "store/user";
import { useDispatch, useSelector } from "store/store";
import { PERMISSION_LABEL_MAPPING } from "constants/common";
import AlertConfirm from "components/modal/AlertConfirm";
import { createRole, deleteRole, updateRole } from "services/user.service";
import ModalWrapper from "components/modal/ModalWrapper";
import { DrawerWrapper } from "components/drawer/DrawerWrapper";
import _ from "lodash";

type Props = {};

const initForm = {
  name: "",
  permissions: [],
};

const initFormError = {
  name: "",
};

export function PermissionContainer({}: Props) {
  const { listPermission, listRole } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [roleInfo, setRoleInfo] = useState<{
    name: string;
    permissions: number[];
  }>(initForm);
  const [roleInfoEdit, setRoleInfoEdit] = useState<{
    name: string;
    permissions: number[];
  }>(initForm);
  const [roleInfoError, setRoleInfoError] = useState(initFormError);
  const [roleInfoEditError, setRoleInfoEditError] = useState(initFormError);
  const [closedList, setClosedList] = useState<number[]>([]);
  const [closedListAdd, setClosedListAdd] = useState<number[]>([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenModalAdd,
    onClose: onCloseModalAdd,
    onOpen: onOpenModalAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onClose: onCloseDrawer,
    onOpen: onOpenDrawer,
  } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const handleAddCloseList = (id: number) => {
    if (closedList.includes(id)) {
      setClosedList(closedList.filter((ele) => ele !== id));
    } else {
      setClosedList(closedList.concat([id]));
    }
  };

  const handleAddCloseListAdd = (id: number) => {
    if (closedListAdd.includes(id)) {
      setClosedListAdd(closedListAdd.filter((ele) => ele !== id));
    } else {
      setClosedListAdd(closedListAdd.concat([id]));
    }
  };

  const handleDeleteRole = async () => {
    if (selectedRole) {
      const dataRes = await deleteRole(selectedRole);
      const { isSuccess } = dataRes.data as any;
      if (isSuccess) {
        dispatch(getListRoleAction());
        onClose();
      }
    }
  };

  const handleAddRole = async () => {
    const error = { ...roleInfoError };
    let valid = true;
    if (!roleInfo.name) {
      error.name = "Name is required";
      valid = false;
    } else {
      error.name = "";
    }
    setRoleInfoError(error);
    if (valid) {
      const response = await createRole({
        roleName: roleInfo.name,
        permissions: roleInfo.permissions,
      });
      const { isSuccess } = response.data;
      if (isSuccess) {
        dispatch(getListSystemPermissionAction());
        dispatch(getListRoleAction());
        onCloseModalAdd();
        setRoleInfo(initForm);
        setRoleInfoError(initFormError);
      }
    }
  };

  const handleUpdateRole = async () => {
    const error = { ...roleInfoEditError };
    let valid = true;
    if (!roleInfoEdit.name) {
      error.name = "Name is required";
      valid = false;
    } else {
      error.name = "";
    }
    setRoleInfoEditError(error);
    if (valid) {
      const response = await updateRole({
        roleId: selectedRole || -1,
        roleName: roleInfoEdit.name,
        permissions: roleInfoEdit.permissions,
      });
      const { isSuccess } = response.data;
      if (isSuccess) {
        dispatch(getListSystemPermissionAction());
        dispatch(getListRoleAction());
        onCloseDrawer();
        setRoleInfoEdit(initForm);
        setRoleInfoEditError(initFormError);
      }
    }
  };

  const handleSetFormDataValue = (key: string, value: string | number) => {
    setRoleInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSetFormDataValueEdit = (key: string, value: string | number) => {
    setRoleInfoEdit((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckedPermission = (id: number) => {
    if (roleInfo.permissions.includes(id)) {
      setRoleInfo((prev) => ({
        ...prev,
        permissions: roleInfo.permissions.filter((ele) => ele !== id),
      }));
    } else {
      setRoleInfo((prev) => ({
        ...prev,
        permissions: roleInfo.permissions.concat([id]),
      }));
    }
  };

  const handleCheckedPermissionEdit = (id: number) => {
    if (roleInfoEdit.permissions.includes(id)) {
      setRoleInfoEdit((prev) => ({
        ...prev,
        permissions: roleInfoEdit.permissions.filter((ele) => ele !== id),
      }));
    } else {
      setRoleInfoEdit((prev) => ({
        ...prev,
        permissions: roleInfoEdit.permissions.concat([id]),
      }));
    }
  };

  const listPermissionIds = useMemo(() => {
    const result: any[] = [];
    listPermission?.forEach((ele: any) => {
      ele?.permissions.forEach((item: any) => {
        item?.id && result.push({ id: item?.id, label: item.name });
      });
    });
    return result;
  }, [listPermission]);

  useEffect(() => {
    dispatch(getListSystemPermissionAction());
    dispatch(getListRoleAction());
  }, [dispatch]);

  return (
    <PaperWrapper label="Permission & Role">
      <Box display="flex" justifyContent="space-between" mb="12px">
        <Button variant="solid" colorScheme="purple" onClick={onOpenModalAdd}>
          Create Role
        </Button>
        <Box display="flex" alignItems="center" gap="6px">
          <Text fontWeight="bold">Edit</Text>
          <Switch
            colorScheme="purple"
            checked={toggleEdit}
            size="md"
            onChange={() => {
              setToggleEdit(!toggleEdit);
            }}
          />
        </Box>
      </Box>
      <TableContainer
        border="1px solid var(--gray-02)"
        p="12px"
        borderRadius="6px"
      >
        <Table colorScheme="purple" size="md">
          <Thead>
            <Tr>
              <Th textAlign="left" fontSize="16px">
                Permission
              </Th>
              {listRole?.map((ele: any) => {
                return (
                  <Th key={ele?.id} textAlign="center" verticalAlign="top">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap="6px"
                      justifyContent="center"
                    >
                      <Text fontSize="16px">{ele?.name}</Text>
                      {toggleEdit && ele?.id !== 0 && (
                        <Box display="flex" gap="12px">
                          <FaEdit
                            cursor="pointer"
                            fontSize="18px"
                            color="var(--chakra-colors-purple-500)"
                            onClick={() => {
                              setSelectedRole(ele?.id);
                              const permissionLabel = ele?.permissions;
                              const keys = _.mapKeys(
                                listPermissionIds,
                                "label"
                              );
                              setRoleInfoEdit({
                                name: ele?.name,
                                permissions: permissionLabel?.map(
                                  (ele: any) => {
                                    if (keys[ele]) return keys[ele].id;
                                  }
                                ),
                              });
                              onOpenDrawer();
                            }}
                          />
                          <FaTrash
                            cursor="pointer"
                            fontSize="18px"
                            color="var(--chakra-colors-red-500)"
                            onClick={() => {
                              setSelectedRole(ele?.id);
                              onOpen();
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {listPermission?.map((ele: any, idx: number) => {
              return (
                <React.Fragment key={idx}>
                  <Tr
                    bgColor="purple.400"
                    cursor="pointer"
                    onClick={() => {
                      handleAddCloseList(idx);
                    }}
                  >
                    <Td textAlign="left">
                      <Box
                        textAlign="center"
                        margin="auto"
                        display="flex"
                        alignItems="center"
                        gap="12px"
                      >
                        {closedList.includes(idx) ? (
                          <FaPlusSquare color="white" fontSize="18px" />
                        ) : (
                          <FaMinusSquare color="white" fontSize="18px" />
                        )}
                        <Text color="white" fontSize="16px" fontWeight="bold">
                          {showData(
                            PERMISSION_LABEL_MAPPING[
                              ele.groupName as keyof typeof PERMISSION_LABEL_MAPPING
                            ]
                          )}
                        </Text>
                      </Box>
                    </Td>
                    {listRole.map((ele: any) => {
                      return <Td key={ele.id} textAlign="center"></Td>;
                    })}
                  </Tr>
                  {ele?.permissions?.map((permission: any) => {
                    return (
                      !closedList.includes(idx) && (
                        <Tr key={permission?.id}>
                          <Td textAlign="left">
                            {showData(permission?.description)}
                          </Td>
                          {listRole.map((ele: any) => {
                            return (
                              <Td key={ele.id} textAlign="center">
                                <Checkbox
                                  key={JSON.stringify(listRole)}
                                  colorScheme="purple"
                                  disabled
                                  defaultChecked={ele.permissions?.includes(
                                    permission?.name
                                  )}
                                />
                              </Td>
                            );
                          })}
                        </Tr>
                      )
                    );
                  })}
                </React.Fragment>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertConfirm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleDeleteRole}
      />
      <ModalWrapper
        title="Create Role"
        onClose={() => {
          onCloseModalAdd();
          setRoleInfo(initForm);
          setRoleInfoError(initFormError);
        }}
        isOpen={isOpenModalAdd}
        onSubmit={handleAddRole}
      >
        <Flex flexDirection="column" gap="12px">
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Role Name
            </Text>
            <Input
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              placeholder="Enter role name..."
              isInvalid={roleInfoError.name.length > 0}
              value={roleInfo.name}
              onChange={(e) => {
                handleSetFormDataValue("name", e.target.value);
              }}
            />
            {roleInfoError.name && (
              <Text className="error-message">{roleInfoError.name}</Text>
            )}
          </Box>
          <Box maxH="500px" overflow="auto">
            <TableContainer
              border="1px solid var(--gray-02)"
              p="12px"
              borderRadius="6px"
            >
              <Table colorScheme="purple" size="sm">
                <Thead>
                  <Tr>
                    <Th textAlign="left">Permission</Th>
                    <Th textAlign="center">
                      <Checkbox
                        key={JSON.stringify(roleInfo.permissions)}
                        colorScheme="purple"
                        defaultChecked={
                          roleInfo.permissions.length ===
                          listPermissionIds.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRoleInfo((prev) => ({
                              ...prev,
                              permissions: listPermissionIds.map(
                                (ele) => ele.id
                              ),
                            }));
                          } else {
                            setRoleInfo((prev) => ({
                              ...prev,
                              permissions: [],
                            }));
                          }
                        }}
                      />
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listPermission?.map((ele: any, idx: number) => {
                    return (
                      <React.Fragment key={idx}>
                        <Tr
                          bgColor="purple.400"
                          cursor="pointer"
                          onClick={() => {
                            handleAddCloseListAdd(idx);
                          }}
                        >
                          <Td textAlign="left">
                            <Box
                              textAlign="center"
                              margin="auto"
                              display="flex"
                              alignItems="center"
                              gap="12px"
                            >
                              {closedListAdd.includes(idx) ? (
                                <FaPlusSquare color="white" fontSize="18px" />
                              ) : (
                                <FaMinusSquare color="white" fontSize="18px" />
                              )}
                              <Text
                                color="white"
                                fontSize="16px"
                                fontWeight="bold"
                              >
                                {showData(
                                  PERMISSION_LABEL_MAPPING[
                                    ele.groupName as keyof typeof PERMISSION_LABEL_MAPPING
                                  ]
                                )}
                              </Text>
                            </Box>
                          </Td>
                          <Td></Td>
                        </Tr>
                        {ele?.permissions?.map((permission: any) => {
                          return (
                            !closedListAdd.includes(idx) && (
                              <Tr key={permission?.id}>
                                <Td textAlign="left">
                                  {showData(permission?.description)}
                                </Td>
                                <Td textAlign="center">
                                  <Checkbox
                                    key={JSON.stringify(roleInfo.permissions)}
                                    colorScheme="purple"
                                    defaultChecked={roleInfo.permissions.includes(
                                      permission?.id
                                    )}
                                    onChange={(e) => {
                                      handleCheckedPermission(permission?.id);
                                    }}
                                  />
                                </Td>
                              </Tr>
                            )
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </ModalWrapper>
      <DrawerWrapper
        title="Edit Role"
        onClose={() => {
          onCloseDrawer();
          setRoleInfoEdit(initForm);
          setRoleInfoEditError(initFormError);
        }}
        isOpen={isOpenDrawer}
        onSubmit={handleUpdateRole}
      >
        <Flex flexDirection="column" gap="12px">
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Role Name
            </Text>
            <Input
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              placeholder="Enter role name..."
              isInvalid={roleInfoEditError.name.length > 0}
              value={roleInfoEdit.name}
              onChange={(e) => {
                handleSetFormDataValueEdit("name", e.target.value);
              }}
            />
            {roleInfoEditError.name && (
              <Text className="error-message">{roleInfoEditError.name}</Text>
            )}
          </Box>
          <Box overflow="auto">
            <TableContainer
              border="1px solid var(--gray-02)"
              p="12px"
              borderRadius="6px"
            >
              <Table colorScheme="purple" size="sm">
                <Thead>
                  <Tr>
                    <Th textAlign="left">Permission</Th>
                    <Th textAlign="center">
                      <Checkbox
                        key={JSON.stringify(roleInfoEdit.permissions)}
                        colorScheme="purple"
                        defaultChecked={
                          roleInfoEdit.permissions.length ===
                          listPermissionIds.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRoleInfoEdit((prev) => ({
                              ...prev,
                              permissions: listPermissionIds.map(
                                (ele) => ele.id
                              ),
                            }));
                          } else {
                            setRoleInfoEdit((prev) => ({
                              ...prev,
                              permissions: [],
                            }));
                          }
                        }}
                      />
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listPermission?.map((ele: any, idx: number) => {
                    return (
                      <React.Fragment key={idx}>
                        <Tr
                          bgColor="purple.400"
                          cursor="pointer"
                          onClick={() => {
                            handleAddCloseListAdd(idx);
                          }}
                        >
                          <Td textAlign="left">
                            <Box
                              textAlign="center"
                              margin="auto"
                              display="flex"
                              alignItems="center"
                              gap="12px"
                            >
                              {closedListAdd.includes(idx) ? (
                                <FaPlusSquare color="white" fontSize="18px" />
                              ) : (
                                <FaMinusSquare color="white" fontSize="18px" />
                              )}
                              <Text
                                color="white"
                                fontSize="16px"
                                fontWeight="bold"
                              >
                                {showData(
                                  PERMISSION_LABEL_MAPPING[
                                    ele.groupName as keyof typeof PERMISSION_LABEL_MAPPING
                                  ]
                                )}
                              </Text>
                            </Box>
                          </Td>
                          <Td></Td>
                        </Tr>
                        {ele?.permissions?.map((permission: any) => {
                          return (
                            !closedListAdd.includes(idx) && (
                              <Tr key={permission?.id}>
                                <Td textAlign="left">
                                  {showData(permission?.description)}
                                </Td>
                                <Td textAlign="center">
                                  <Checkbox
                                    key={JSON.stringify(
                                      roleInfoEdit.permissions
                                    )}
                                    colorScheme="purple"
                                    defaultChecked={roleInfoEdit.permissions.includes(
                                      permission?.id
                                    )}
                                    onChange={(e) => {
                                      handleCheckedPermissionEdit(
                                        permission?.id
                                      );
                                    }}
                                  />
                                </Td>
                              </Tr>
                            )
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </DrawerWrapper>
    </PaperWrapper>
  );
}
