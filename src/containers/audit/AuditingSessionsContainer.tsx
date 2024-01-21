import { Button, Flex } from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import AuditCard from "components/molecules/AuditCard";
import { DEFAULT_FORMAT_DATETIME } from "constants/common";
import moment from "moment";
import React, { useEffect } from "react";
import { assetSelector, getListAuditSessionAction } from "store/asset";
import { useDispatch, useSelector } from "store/store";

type Props = {};

export default function AuditingSessionsContainer({}: Props) {
  const dispatch = useDispatch();
  const { listAuditSession } = useSelector(assetSelector);

  useEffect(() => {
    dispatch(getListAuditSessionAction());
  }, [dispatch]);

  return (
    <PaperWrapper label="Audit Session">
      <Button colorScheme="purple" position="absolute" top="24px" right="24px">
        Create Session
      </Button>
      <Flex gap="12px">
        {listAuditSession?.map((session: any) => {
          return (
            <AuditCard
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
    </PaperWrapper>
  );
}
