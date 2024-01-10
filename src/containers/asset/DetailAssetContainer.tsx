import {
  Box,
  Button,
  Flex,
  Img,
  Link,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { IconLabelValue } from "components/atoms/IconLabelValue";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import moment from "moment";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { assetSelector, getDetailAssetAction } from "store/asset";
import { useDispatch, useSelector } from "store/store";
import { formatPrice, showData } from "utils/common";
import { HistoryTab } from "./detailAssetTab/HistoryTab";
import { AssetStatusTag } from "components/molecules/AssetStatusTag";
import { ASSET_STATUS } from "constants/common";
import ModalWrapper from "components/modal/ModalWrapper";

export default function DetailAssetContainer() {
  const { assetId } = useParams();
  const { detailAsset } = useSelector(assetSelector);
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    dispatch(getDetailAssetAction({ assetId: assetId || "" }));
  }, [assetId, dispatch]);

  return (
    <PaperWrapper label={showData(detailAsset?.name)}>
      <AssetStatusTag
        status={
          detailAsset?.isAvailable
            ? ASSET_STATUS.AVAILABLE
            : ASSET_STATUS.NOT_AVAILABLE
        }
        position="absolute"
        top="30px"
        right="24px"
      />
      <Flex alignItems="flex-start">
        <Box w="300px">
          <Img src="/images/img-placeholder.jpg" />
        </Box>
        <VStack spacing="6px" alignItems="flex-start">
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
          {!detailAsset?.isAvailable && (
            <>
              <IconLabelValue
                label="Assigned To"
                value={
                  <Link color="var(--chakra-colors-purple-500)">
                    {detailAsset?.history &&
                      detailAsset?.history?.length > 0 &&
                      `${detailAsset?.history[0]?.toUser?.lastName}
                      ${detailAsset?.history[0]?.toUser?.firstName}`}
                  </Link>
                }
              />
              <Button colorScheme="orange" onClick={onOpen}>
                Retrieve
              </Button>
            </>
          )}
          {detailAsset?.isAvailable && (
            <Button colorScheme="purple" onClick={onOpen}>
              Assign to
            </Button>
          )}
        </VStack>
      </Flex>
      <Box mt="12px">
        <Tabs variant="enclosed" colorScheme="purple">
          <TabList>
            <Tab>History</Tab>
          </TabList>

          <TabPanels border="1px solid var(--chakra-colors-gray-200)">
            <TabPanel>
              <HistoryTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <ModalWrapper
        title="Assign Asset"
        onClose={() => {
          onClose();
        }}
        isOpen={isOpen}
      >
        <Box>
          <Text className="required" fontWeight="bold" mb="8px">
            User
          </Text>
          <Select
            focusBorderColor="purple.400"
            colorScheme="purple"
            placeholder="Select user"
            variant="filled"
          >
            {[1, 2]?.map((ele: any) => {
              return (
                <option key={ele.id} value={ele.id}>
                  {ele.name}
                </option>
              );
            })}
          </Select>
        </Box>
      </ModalWrapper>
    </PaperWrapper>
  );
}
