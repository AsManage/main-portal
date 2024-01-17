import { Box, Flex } from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import AuditCard from "components/molecules/AuditCard";
import { AUDIT_STATUS } from "interfaces/auth.interface";
import React from "react";

type Props = {};

export default function AuditingSessionsContainer({}: Props) {
  return (
    <PaperWrapper label="Audit Session">
      <Flex gap="12px">
        <AuditCard status={AUDIT_STATUS.UPCOMING} />
        <AuditCard status={AUDIT_STATUS.AUDITING} />
      </Flex>
    </PaperWrapper>
  );
}
