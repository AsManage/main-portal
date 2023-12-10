import {
  Box,
  Checkbox,
  Collapse,
  HStack,
  Image,
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
import { IconLabelValue } from "components/atoms/IconLabelValue";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import {
  FaMailBulk,
  FaPhone,
  FaPlusSquare,
  FaStreetView,
  FaTransgender,
  FaUser,
  FaUserCheck,
} from "react-icons/fa";
import { showData } from "utils/common";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { LocalStorage } from "utils/localStorage";
import { MdDateRange } from "react-icons/md";

import moment from "moment";
import { useDispatch, useSelector } from "store/store";
import { getListSystemPermissionAction, userSelector } from "store/user";
import React, { useEffect, useState } from "react";
import { PERMISSION_LABEL_MAPPING } from "constants/common";
import { BsFillPlusSquareFill } from "react-icons/bs";
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
      setClosedList(closedList.filter((ele) => ele != id));
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
          <Table colorScheme="purple" size="sm">
            <Thead>
              <Tr>
                <Th textAlign="left">Permission</Th>
                <Th textAlign="center">{showData(userInfo.role)}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listPermission?.map((ele: any, idx: number) => {
                return (
                  <React.Fragment key={idx}>
                    <Tr>
                      <Td textAlign="left">
                        <Text key={idx} fontSize="16px" fontWeight="bold">
                          {showData(
                            PERMISSION_LABEL_MAPPING[
                              ele.groupName as keyof typeof PERMISSION_LABEL_MAPPING
                            ]
                          )}
                        </Text>
                      </Td>
                      <Td textAlign="center">
                        <Box
                          textAlign="center"
                          margin="auto"
                          display="inline-block"
                          cursor="pointer"
                        >
                          {closedList.includes(idx) ? (
                            <FaPlusSquare
                              fontSize="18px"
                              onClick={() => {
                                handleAddCloseList(idx);
                              }}
                            />
                          ) : (
                            <FaMinusSquare
                              fontSize="18px"
                              onClick={() => {
                                handleAddCloseList(idx);
                              }}
                            />
                          )}
                        </Box>
                      </Td>
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
        {/* {listPermission?.map((ele: any, idx: any) => {
          return (
            <Box mb="12px">
              <Text key={idx} fontSize="20px" fontWeight="bold" mb="12px">
                {showData(
                  PERMISSION_LABEL_MAPPING[
                    ele.groupName as keyof typeof PERMISSION_LABEL_MAPPING
                  ]
                )}
              </Text>
              <VStack alignItems="flex-start">
                {ele?.permissions?.map((permission: any) => {
                  return (
                    <Checkbox key={permission?.id} disabled>
                      {showData(permission?.name)}
                    </Checkbox>
                  );
                })}
              </VStack>
            </Box>
          );
        })} */}
      </PaperWrapper>
    </VStack>
  );
}
