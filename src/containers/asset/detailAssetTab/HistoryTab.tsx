import { Flex } from "@chakra-ui/react";
import { TransferCard } from "components/molecules/TransferCard";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assetSelector } from "store/asset";

type Props = {};

export function HistoryTab({}: Props) {
  const { detailAsset } = useSelector(assetSelector);
  const navigate = useNavigate();

  return (
    <Flex flexDirection="column" gap="12px">
      {detailAsset?.history && detailAsset?.history.length > 0 ? (
        detailAsset?.history?.map((ele: any) => {
          return (
            <TransferCard
              key={ele?.id}
              date={ele?.createdAt}
              from={
                ele?.fromCustodianId === -1
                  ? "INVENTORY"
                  : `${ele?.fromUser?.lastName} ${ele?.fromUser?.firstName}`
              }
              to={
                ele?.toCustodianId === -1
                  ? "INVENTORY"
                  : `${ele?.toUser?.lastName} ${ele?.toUser?.firstName}`
              }
              note={ele?.reason}
              onClickFrom={
                ele?.fromCustodianId !== -1
                  ? () => navigate(`/user/${ele?.fromUser?.id}`)
                  : () => {}
              }
              onClickTo={
                ele?.toCustodianId !== -1
                  ? () => navigate(`/user/${ele?.toUser?.id}`)
                  : () => {}
              }
            />
          );
        })
      ) : (
        <p>There is no activity on this asset!</p>
      )}
    </Flex>
  );
}
