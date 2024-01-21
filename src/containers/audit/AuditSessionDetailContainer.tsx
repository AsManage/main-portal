import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Link,
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
import {
  AUDIT_ASSET_STATUS,
  AUDIT_STATUS,
  DEFAULT_FORMAT_DATETIME,
} from "constants/common";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailAuditSession } from "services/asset.service";
import {
  assetSelector,
  getDetailAssetAction,
  getDetailAuditSessionAction,
} from "store/asset";
import { useDispatch, useSelector } from "store/store";
import { showData } from "utils/common";
import { LocalStorage } from "utils/localStorage";

type Props = {};

const storage = new LocalStorage();

export default function AuditSessionDetailContainer({}: Props) {
  const { sessionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = storage.getStorageItem(storage.availableKey.ACCOUNT_INFO);
  const { detailAuditSession } = useSelector(assetSelector);

  const tabColor = useMemo(() => {
    switch (detailAuditSession?.status) {
      case AUDIT_STATUS.UPCOMING:
        return "blue";
      case AUDIT_STATUS.AUDITING:
        return "green";
      case AUDIT_STATUS.CANCELED:
        return "red";
      case AUDIT_STATUS.FINISHED:
        return "gray";

      default:
        return "gray.400";
    }
  }, [detailAuditSession?.status]);

  useEffect(() => {
    dispatch(getDetailAuditSessionAction(Number(sessionId)));
  }, [dispatch, sessionId]);

  return (
    <PaperWrapper label={showData(detailAuditSession?.name)}>
      <VStack spacing="12px">
        <Badge
          fontSize="14px"
          colorScheme={tabColor}
          position="absolute"
          right="24px"
          top="24px"
        >
          {detailAuditSession?.status}
        </Badge>
        <Flex gap="12px" alignItems="center" w="100%">
          <Badge ml="1" colorScheme="blue">
            begin
          </Badge>
          <Text>
            {showData(
              detailAuditSession?.startDate
                ? moment(detailAuditSession?.startDate).format(
                    DEFAULT_FORMAT_DATETIME
                  )
                : ""
            )}
          </Text>
        </Flex>
        <Flex gap="12px" alignItems="center" w="100%">
          <Badge ml="1" colorScheme="red">
            Expired
          </Badge>
          <Text>
            {showData(
              detailAuditSession?.endDate
                ? moment(detailAuditSession?.endDate).format(
                    DEFAULT_FORMAT_DATETIME
                  )
                : ""
            )}
          </Text>
        </Flex>
        <Flex gap="12px" alignItems="center" w="100%">
          <Badge ml="1" colorScheme="gray">
            Assignee
          </Badge>
          <Link
            color={
              userInfo?.id == detailAuditSession?.createdBy
                ? "gray.400"
                : "purple.400"
            }
            fontWeight="bold"
            onClick={() => {
              if (userInfo?.id != detailAuditSession?.createdBy) {
                navigate(`/user/${detailAuditSession?.createdBy}`);
              }
            }}
          >
            {showData(
              userInfo?.id == detailAuditSession?.createdBy
                ? "YOU"
                : `${detailAuditSession?.createdUser?.firstName} ${detailAuditSession?.createdUser?.lastName}`
            )}
          </Link>
        </Flex>
        <Flex gap="12px" alignItems="center" w="100%">
          <Badge ml="1" colorScheme="gray">
            Created by
          </Badge>
          <Link
            color={
              userInfo?.id == detailAuditSession?.assigneeId
                ? "gray.400"
                : "purple.400"
            }
            fontWeight="bold"
            onClick={() => {
              if (userInfo?.id != detailAuditSession?.assigneeId) {
                navigate(`/user/${detailAuditSession?.assigneeId}`);
              }
            }}
          >
            {showData(
              userInfo?.id == detailAuditSession?.assigneeId
                ? "YOU"
                : `${detailAuditSession?.assginedUser?.firstName} ${detailAuditSession?.assginedUser?.lastName}`
            )}
          </Link>
        </Flex>
        <Flex gap="12px" alignItems="flex-start" w="100%">
          <Badge ml="1" colorScheme="gray">
            Note
          </Badge>
          <Text>{showData(detailAuditSession?.note)}</Text>
        </Flex>
        <Card w="100%">
          <TableContainer
            border="1px solid var(--gray-02)"
            p="12px"
            borderRadius="6px"
          >
            <Table variant="striped" colorScheme="purple" size="md">
              <Thead>
                <Tr>
                  <Th w="100px" fontSize="16px" textAlign="center">
                    ID
                  </Th>
                  <Th w="50px" fontSize="16px" textAlign="center">
                    Image
                  </Th>
                  <Th fontSize="16px" textAlign="center">
                    Asset Name
                  </Th>
                  <Th fontSize="16px" textAlign="center">
                    Status
                  </Th>
                  <Th fontSize="16px" textAlign="center">
                    Note
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {detailAuditSession?.assets?.map((ele: any) => {
                  return (
                    <Tr
                      key={ele?.id}
                      cursor="pointer"
                      _hover={{
                        transition: "0.2s",
                        position: "relative",
                        zIndex: 100,
                        boxShadow:
                          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                      }}
                      onClick={() => {
                        navigate(`/asset/${ele?.assetId}`);
                      }}
                    >
                      <Td>{ele?.id}</Td>
                      <Td>
                        <Avatar
                          size="lg"
                          src={
                            ele?.detail?.image
                              ? ele?.detail?.image
                              : "/images/img-placeholder.jpg"
                          }
                        ></Avatar>
                      </Td>
                      <Td textAlign="center">{showData(ele?.detail?.name)}</Td>
                      <Td textAlign="center">
                        <Badge
                          fontSize="14px"
                          colorScheme={
                            ele?.status === AUDIT_ASSET_STATUS.AUDITED
                              ? "green"
                              : "orange"
                          }
                        >
                          {ele?.status}
                        </Badge>
                      </Td>
                      <Td textAlign="center">{showData(ele?.note)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </VStack>
    </PaperWrapper>
  );
}
