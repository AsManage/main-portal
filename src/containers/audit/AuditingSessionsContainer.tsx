import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import ModalWrapper from "components/modal/ModalWrapper";
import AuditCard from "components/molecules/AuditCard";
import { DEFAULT_FORMAT_DATETIME } from "constants/common";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { createAuditSession } from "services/asset.service";
import { assetSelector, getListAuditSessionAction } from "store/asset";
import { useDispatch, useSelector } from "store/store";
import { getListUserOptionAction, userSelector } from "store/user";

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
  });
  const [formDataError, setFormDataError] = useState({
    name: "",
    startDate: "",
    endDate: "",
    assigneeId: "",
  });

  const handleSubmit = async () => {
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
    setFormDataError(error);
    if (valid) {
      await createAuditSession({
        ...formData,
      });
      handleClose();
      dispatch(getListAuditSessionAction());
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      assigneeId: "",
      note: "",
    });
    setFormDataError({
      name: "",
      startDate: "",
      endDate: "",
      assigneeId: "",
    });
    onClose();
  };

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
        </Flex>
      </ModalWrapper>
    </PaperWrapper>
  );
}
