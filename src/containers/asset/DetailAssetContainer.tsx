import { Box, Flex, Img } from "@chakra-ui/react";
import { IconLabelValue } from "components/atoms/IconLabelValue";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import moment from "moment";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { assetSelector, getDetailAssetAction } from "store/asset";
import { useDispatch, useSelector } from "store/store";
import { formatPrice, showData } from "utils/common";
type Props = {};

export default function DetailAssetContainer({}: Props) {
  const { assetId } = useParams();
  const { detailAsset } = useSelector(assetSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(detailAsset);
  }, [detailAsset]);

  useEffect(() => {
    dispatch(getDetailAssetAction({ assetId: assetId || "" }));
  }, [assetId, dispatch]);

  return (
    <PaperWrapper label={showData(detailAsset?.name)}>
      <Flex alignItems="flex-start">
        <Box w="300px">
          <Img src="/images/img-placeholder.jpg" />
        </Box>
        <Box>
          <IconLabelValue
            label="Serial Number"
            value={showData(detailAsset?.serialNumber)}
          />
          <IconLabelValue label="Type" value={showData(detailAsset?.type)} />
          <IconLabelValue
            label="Acquisition Source"
            value={showData(detailAsset?.acquisitionSource)}
          />
          <IconLabelValue
            label="Quantity"
            value={showData(detailAsset?.quantity)}
          />
          <IconLabelValue
            label="Original Cost"
            value={showData(formatPrice(detailAsset?.originalCost))}
          />
          <IconLabelValue
            label="Condition State"
            value={showData(detailAsset?.conditionState)}
          />
          <IconLabelValue label="Note" value={showData(detailAsset?.note)} />
          <IconLabelValue
            label="Specification"
            value={showData(detailAsset?.specification)}
          />
          <IconLabelValue
            label="Warranty Duration"
            value={`${showData(detailAsset?.warrantyDuration)} ${showData(
              detailAsset?.timeUnit
            )}`}
          />
          <IconLabelValue
            label="Warranty Start Date"
            value={showData(
              moment(detailAsset?.warrantyStartDate).format("DD/MM/YYYY")
            )}
          />
          <IconLabelValue
            label="Warranty End Date"
            value={showData(
              moment(detailAsset?.warrantyEndDate).format("DD/MM/YYYY")
            )}
          />
          <IconLabelValue
            label="Warranty Condition"
            value={showData(detailAsset?.warrantyCondition)}
          />
        </Box>
      </Flex>
    </PaperWrapper>
  );
}
