import { Box, Flex } from "@chakra-ui/react";
import { AssetCard } from "components/molecules/AssetCard";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "store/user";

type Props = {};

export function AssetTab({}: Props) {
  const { userDetail } = useSelector(userSelector);
  const navigate = useNavigate();

  return (
    <Flex flexWrap="wrap" gap="24px">
      {userDetail.assignedAsset && userDetail?.assignedAsset?.length > 0 ? (
        userDetail?.assignedAsset?.map((ele: any) => {
          return (
            <AssetCard
              key={ele?.id}
              title={ele?.name}
              image={ele?.image}
              onClick={() => {
                navigate(`/asset/${ele?.id}`);
              }}
            />
          );
        })
      ) : (
        <p>There are no assets assigned to the user!</p>
      )}
    </Flex>
  );
}
