import { Box, Flex } from "@chakra-ui/react";
import { AssetCard } from "components/molecules/AssetCard";
import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "store/user";

type Props = {};

export function AssetTab({}: Props) {
  const { userDetail } = useSelector(userSelector);

  return (
    <Flex flexWrap="wrap" gap="24px">
      {userDetail.assignedAsset && userDetail?.assignedAsset?.length > 0 ? (
        userDetail?.assignedAsset?.map((ele: any) => {
          return <AssetCard key={ele?.id} title={ele?.name} />;
        })
      ) : (
        <p>There are no assets assigned to the user!</p>
      )}
    </Flex>
  );
}
