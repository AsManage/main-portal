import {
  Box,
  Button,
  Checkbox,
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
import { FaMinusSquare, FaPlusSquare, FaTrash } from "react-icons/fa";
import { showData } from "utils/common";
import React, { useEffect, useState } from "react";
import {
  getListRoleAction,
  getListSystemPermissionAction,
  userSelector,
} from "store/user";
import { useDispatch, useSelector } from "store/store";
import { PERMISSION_LABEL_MAPPING } from "constants/common";
import AlertConfirm from "components/modal/AlertConfirm";
import { deleteRole } from "services/user.service";

type Props = {};

export function PermissionContainer({}: Props) {
  const { listPermission, listRole } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [closedList, setClosedList] = useState<number[]>([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const handleAddCloseList = (id: number) => {
    if (closedList.includes(id)) {
      setClosedList(closedList.filter((ele) => ele != id));
    } else {
      setClosedList(closedList.concat([id]));
    }
  };

  const handleDeleteRole = async () => {
    if (selectedRole) {
      const dataRes = await deleteRole(selectedRole);
      console.log(dataRes);
      const { isSuccess } = dataRes.data as any;
      if (isSuccess) {
        dispatch(getListRoleAction());
        onClose();
      }
    }
  };

  useEffect(() => {
    dispatch(getListSystemPermissionAction());
    dispatch(getListRoleAction());
  }, [dispatch]);

  return (
    <PaperWrapper label="Permission & Role">
      <Box display="flex" justifyContent="space-between" mb="12px">
        <Button variant="solid" colorScheme="purple">
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
        <Table colorScheme="purple" size="sm">
          <Thead>
            <Tr>
              <Th textAlign="left">Permission</Th>
              {listRole?.map((ele: any) => {
                return (
                  <Th key={ele?.id} textAlign="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="6px"
                      justifyContent="center"
                    >
                      <Text>{ele?.name}</Text>
                      {toggleEdit && (
                        <FaTrash
                          cursor="pointer"
                          fontSize="16px"
                          color="var(--chakra-colors-red-500)"
                          onClick={() => {
                            setSelectedRole(ele?.id);
                            onOpen();
                          }}
                        />
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
                  <Tr bgColor="purple.400">
                    <Td textAlign="left">
                      <Box
                        textAlign="center"
                        margin="auto"
                        display="flex"
                        cursor="pointer"
                        alignItems="center"
                        gap="12px"
                        onClick={() => {
                          handleAddCloseList(idx);
                        }}
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
                                  colorScheme="purple"
                                  disabled={!toggleEdit}
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
    </PaperWrapper>
  );
}
