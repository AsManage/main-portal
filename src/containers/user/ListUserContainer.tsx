import {
  AlertDialog,
  Box,
  Button,
  Icon,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import "react-responsive-pagination/themes/classic.css";

import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "store/store";
import { useEffect, useState } from "react";
import { getListUserAction, userSelector } from "store/user";
import ResponsivePagination from "react-responsive-pagination";
import { LIMIT_LIST, PERMISSION } from "constants/common";
import { showData } from "utils/common";
import { FaEdit, FaTrash } from "react-icons/fa";
import AlertConfirm from "components/modal/AlertConfirm";
import { deleteUserInTenant } from "services/user.service";
import { PermissionWrapper } from "components/wrapper/PermissionWrapper";
import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";
import { useNavigate } from "react-router-dom";

type Props = {};

export const ListUserContainer = (props: Props) => {
  const dispatch = useDispatch();
  const { listUserPaging } = useSelector(userSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_LIST[2]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleChangeCurrentPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  const handleDelete = async () => {
    const response = await deleteUserInTenant({
      userId: Number(selectedUser),
    });
    const { isSuccess } = response.data as any;
    if (isSuccess) {
      dispatch(
        getListUserAction({
          limit: limit,
          page: currentPage,
        })
      );
      onClose();
    }
  };

  useEffect(() => {
    dispatch(
      getListUserAction({
        limit: limit,
        page: currentPage,
      })
    );
  }, [currentPage, dispatch, limit]);
  return (
    <Box>
      <PaperWrapper label="Users">
        <Button
          colorScheme="purple"
          position="absolute"
          top="24px"
          right="24px"
          onClick={() => {
            navigate("create");
          }}
        >
          Create User
        </Button>
        <Box>
          <PermissionPageWrapper permission={PERMISSION.VIEW_USER_LIST}>
            <TableContainer
              border="1px solid var(--gray-02)"
              p="12px"
              borderRadius="6px"
            >
              <Table variant="striped" colorScheme="purple" size="md">
                <Thead>
                  <Tr>
                    <Th w="100px" fontSize="16px">
                      ID
                    </Th>
                    <Th fontSize="16px">First name</Th>
                    <Th fontSize="16px">Last name</Th>
                    <Th fontSize="16px">Working Position</Th>
                    <Th fontSize="16px">Email</Th>
                    <Th fontSize="16px">Phone</Th>
                    <Th fontSize="16px">Gender</Th>
                    <Th fontSize="16px">Status</Th>
                    <Th fontSize="16px">Role</Th>
                    <Th w="50px" fontSize="16px"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listUserPaging?.result?.map((ele: any) => {
                    return (
                      <Tr
                        key={ele?.id}
                        cursor="pointer"
                        onClick={() => {
                          navigate(`${ele?.id}`);
                        }}
                      >
                        <Td>{ele?.id}</Td>
                        <Td>{showData(ele?.firstName)}</Td>
                        <Td>{showData(ele?.lastName)}</Td>
                        <Td>{showData(ele?.workingPosition)}</Td>
                        <Td>{showData(ele?.email)}</Td>
                        <Td>{showData(ele?.phoneNumber)}</Td>
                        <Td>{showData(ele?.gender)}</Td>
                        <Td>{showData(ele?.status)}</Td>
                        <Td>{showData(ele?.role)}</Td>
                        <Td w="50px" fontSize="16px">
                          <PermissionWrapper permission={PERMISSION.EDIT_USER}>
                            <Icon
                              cursor="pointer"
                              as={FaEdit}
                              fontSize="24px"
                              color="purple.500"
                              mr="12px"
                            />
                          </PermissionWrapper>
                          <PermissionWrapper
                            permission={PERMISSION.DELETE_USER}
                          >
                            <Icon
                              cursor="pointer"
                              as={FaTrash}
                              fontSize="24px"
                              color="red.500"
                              mr="12px"
                              onClick={() => {
                                setSelectedUser(ele?.id);
                                onOpen();
                              }}
                            />
                          </PermissionWrapper>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Box pt={3} display="flex" justifyContent="flex-end">
              <Select value={limit} onChange={handleChangeLimit} width="100px">
                {LIMIT_LIST.map((ele, idx) => {
                  return (
                    <option key={idx} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </Select>
              <ResponsivePagination
                maxWidth={400}
                current={currentPage}
                total={Math.ceil(listUserPaging?.total / limit)}
                onPageChange={handleChangeCurrentPage}
              />
            </Box>
          </PermissionPageWrapper>
        </Box>
        <AlertConfirm
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleDelete}
        />
      </PaperWrapper>
    </Box>
  );
};
