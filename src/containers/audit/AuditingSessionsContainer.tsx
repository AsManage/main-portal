import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import ModalWrapper from "components/modal/ModalWrapper";
import AuditCard from "components/molecules/AuditCard";
import {
  DEFAULT_FORMAT_DATE,
  DEFAULT_FORMAT_DATETIME,
  LIMIT_LIST,
} from "constants/common";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { createAuditSession } from "services/asset.service";
import {
  assetSelector,
  getListAssetAction,
  getListAuditSessionAction,
} from "store/asset";
import { useDispatch, useSelector } from "store/store";
import { getListUserOptionAction, userSelector } from "store/user";
import { formatPrice, showData } from "utils/common";
import ResponsivePagination from "react-responsive-pagination";

type Props = {};

export default function AuditingSessionsContainer({}: Props) {
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { listAuditSession } = useSelector(assetSelector);
  const { listUserOption } = useSelector(userSelector);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    assigneeId: "",
    note: "",
    assets: [],
  });
  const [formDataError, setFormDataError] = useState({
    name: "",
    startDate: "",
    endDate: "",
    assigneeId: "",
    assets: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_LIST[2]);
  const { listAssetPaging } = useSelector(assetSelector);

  const handleSubmit = async () => {
    console.log(formData);
    const error = { ...formDataError };
    let valid = true;
    if (!formData.name) {
      error.name = "Name is required";
      valid = false;
    } else {
      error.name = "";
    }
    if (!formData.startDate) {
      error.startDate = "Start Date is required";
      valid = false;
    } else {
      error.startDate = "";
    }
    if (!formData.endDate) {
      error.endDate = "End Date is required";
      valid = false;
    } else {
      error.endDate = "";
    }
    if (!formData.assigneeId) {
      error.assigneeId = "User is required";
      valid = false;
    } else {
      error.assigneeId = "";
    }
    if (formData.assets.length === 0) {
      error.assets = "At least 1 one asset in audit session";
      valid = false;
    } else {
      error.assets = "";
    }
    setFormDataError(error);
    if (valid) {
      await createAuditSession({
        ...formData,
      });
      handleClose();
      dispatch(getListAuditSessionAction());
    }
  };

  const handleChangeCurrentPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  const handleSelectAsset = (id: number) => {
    if ((formData.assets as any).includes(id)) {
      setFormData({
        ...formData,
        assets: formData.assets.filter((ele) => ele != id),
      });
    } else {
      setFormData({
        ...formData,
        assets: (formData.assets as any).concat([id]),
      });
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      assigneeId: "",
      note: "",
      assets: [],
    });
    setFormDataError({
      name: "",
      startDate: "",
      endDate: "",
      assigneeId: "",
      assets: "",
    });
    onClose();
  };

  useEffect(() => {
    dispatch(
      getListAssetAction({
        limit: limit,
        page: currentPage,
      })
    );
  }, [currentPage, dispatch, limit]);

  useEffect(() => {
    dispatch(getListAuditSessionAction());
    dispatch(getListUserOptionAction());
  }, [dispatch]);

  return (
    <PaperWrapper label="Audit Session">
      <Button
        colorScheme="purple"
        position="absolute"
        top="24px"
        right="24px"
        onClick={onOpen}
      >
        Create Session
      </Button>
      <Flex gap="12px" flexWrap="wrap">
        {listAuditSession?.map((session: any) => {
          return (
            <AuditCard
              width="calc((100% / 5) - 10px)"
              key={session?.id}
              sessionId={session?.id}
              name={session?.name}
              status={session.status}
              startDate={
                session?.startDate
                  ? moment(session?.startDate).format(DEFAULT_FORMAT_DATETIME)
                  : ""
              }
              endDate={
                session?.endDate
                  ? moment(session?.endDate).format(DEFAULT_FORMAT_DATETIME)
                  : ""
              }
              assignee={`${session?.createdUser?.firstName} ${session?.createdUser?.lastName}`}
              assigner={`${session?.assginedUser?.firstName} ${session?.assginedUser?.lastName}`}
              assigneeId={session?.createdUser?.id}
              assignerId={session?.assginedUser?.id}
            />
          );
        })}
      </Flex>
      <ModalWrapper
        title="Create Audit Session"
        onClose={handleClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        size="full"
      >
        <Flex flexDirection="column" gap="12px">
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
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
            />
            {formDataError.name && (
              <Text className="error-message">{formDataError.name}</Text>
            )}
          </Box>
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              Begin
            </Text>
            <Input
              type="datetime-local"
              placeholder=""
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              isInvalid={formDataError.startDate.length > 0}
              value={formData.startDate}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  startDate: e.target.value,
                });
              }}
            />
            {formDataError.startDate && (
              <Text className="error-message">{formDataError.startDate}</Text>
            )}
          </Box>
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              End Date
            </Text>
            <Input
              type="datetime-local"
              placeholder=""
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              isInvalid={formDataError.endDate.length > 0}
              value={formData.endDate}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  endDate: e.target.value,
                });
              }}
            />
            {formDataError.endDate && (
              <Text className="error-message">{formDataError.endDate}</Text>
            )}
          </Box>
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              User
            </Text>
            <Select
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Select user"
              variant="filled"
              isInvalid={formDataError.assigneeId.length > 0}
              value={formData.assigneeId}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  assigneeId: e.target.value,
                });
              }}
            >
              {listUserOption?.map((ele: any) => {
                return (
                  <option key={ele.id} value={ele.id}>
                    {`${ele?.firstName} ${ele?.lastName}-${ele?.phoneNumber}`}
                  </option>
                );
              })}
            </Select>
            {formDataError.assigneeId && (
              <Text className="error-message">{formDataError.assigneeId}</Text>
            )}
          </Box>
          <Box>
            <Text fontWeight="bold" mb="8px">
              Note
            </Text>
            <Textarea
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Reason..."
              variant="filled"
              value={formData.note}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  note: e.target.value,
                });
              }}
            />
          </Box>
          {formDataError.assets && (
            <Text className="error-message">{formDataError.assets}</Text>
          )}
          <TableContainer
            border="1px solid var(--gray-02)"
            p="12px"
            borderRadius="6px"
          >
            <Table variant="striped" colorScheme="purple" size="md">
              <Thead>
                <Tr>
                  <Th w="100px" fontSize="16px"></Th>
                  <Th w="100px" fontSize="16px">
                    ID
                  </Th>
                  <Th fontSize="16px" textAlign="center">
                    Image
                  </Th>
                  <Th fontSize="16px" textAlign="center">
                    Asset Name
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {listAssetPaging?.result?.map((ele: any) => {
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
                    >
                      <Td>
                        <Checkbox
                          colorScheme="purple"
                          checked={(formData.assets as any).includes(ele?.id)}
                          onChange={() => {
                            handleSelectAsset(ele?.id);
                          }}
                        />
                      </Td>
                      <Td>{ele?.id}</Td>
                      <Td>
                        <Avatar
                          size="lg"
                          src={
                            ele?.image
                              ? ele?.image
                              : "/images/img-placeholder.jpg"
                          }
                        >
                          <AvatarBadge
                            boxSize="1.25em"
                            bg={ele?.isAvailable ? "green.400" : "red.400"}
                          />
                        </Avatar>
                      </Td>
                      <Td textAlign="center">{showData(ele?.name)}</Td>
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
              total={Math.ceil(listAssetPaging?.total / limit)}
              onPageChange={handleChangeCurrentPage}
            />
          </Box>
        </Flex>
      </ModalWrapper>
    </PaperWrapper>
  );
}
