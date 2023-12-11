import {
  Box,
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import { FaPlusSquare } from "react-icons/fa";
import { showData } from "utils/common";
import { LocalStorage } from "utils/localStorage";
import { useDispatch, useSelector } from "store/store";
import { getListSystemPermissionAction, userSelector } from "store/user";
import React, { useEffect, useState } from "react";
import { PERMISSION_LABEL_MAPPING } from "constants/common";
import { FaMinusSquare } from "react-icons/fa";

type Props = {};

const storage = new LocalStorage();

export function SettingPermissionContainer({}: Props) {
  const userInfo = storage.getStorageItem(storage.availableKey.ACCOUNT_INFO);
  const { permission: userPermissions } = userInfo;
  const dispatch = useDispatch();
  const { listPermission } = useSelector(userSelector);
  const [closedList, setClosedList] = useState<number[]>([]);

  const handleAddCloseList = (id: number) => {
    if (closedList.includes(id)) {
      setClosedList(closedList.filter((ele) => ele !== id));
    } else {
      setClosedList(closedList.concat([id]));
    }
  };

  useEffect(() => {
    dispatch(getListSystemPermissionAction());
  }, [dispatch]);

  return (
    <VStack spacing="24px" w="100%" justifyContent="center" alignItems="center">
      <PaperWrapper label="Your Permission in System">
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
                <Th textAlign="center" fontSize="16px">
                  {showData(userInfo.role)}
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
                      <Td></Td>
                    </Tr>
                    {ele?.permissions?.map((permission: any) => {
                      return (
                        !closedList.includes(idx) && (
                          <Tr key={permission?.id}>
                            <Td textAlign="left">
                              {showData(permission?.description)}
                            </Td>
                            <Td textAlign="center">
                              <Checkbox
                                colorScheme="purple"
                                disabled
                                defaultChecked={userPermissions?.includes(
                                  permission?.name
                                )}
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
      </PaperWrapper>
    </VStack>
  );
}
