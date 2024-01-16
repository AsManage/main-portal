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
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { IconLabelValue } from "components/atoms/IconLabelValue";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assetSelector, getDetailAssetAction } from "store/asset";
import { useDispatch, useSelector } from "store/store";
import { formatPrice, showData } from "utils/common";
import { HistoryTab } from "./detailAssetTab/HistoryTab";
import { AssetStatusTag } from "components/molecules/AssetStatusTag";
import { ASSET_STATUS, PERMISSION } from "constants/common";
import ModalWrapper from "components/modal/ModalWrapper";
import { getListUserOptionAction, userSelector } from "store/user";
import { assignAssetToUser, retrieveAsset } from "services/asset.service";
import AlertConfirm from "components/modal/AlertConfirm";
import AlertEnsure from "components/modal/AlertEnsure";
import { PermissionWrapper } from "components/wrapper/PermissionWrapper";
import { PermissionPageWrapper } from "components/wrapper/PermissionPageWrapper";

export default function DetailAssetContainer() {
  const { assetId } = useParams();
  const { detailAsset } = useSelector(assetSelector);
  const { listUserOption } = useSelector(userSelector);
  const [userId, setUserId] = useState({
    userId: "",
    note: "",
  });
  const [userIdError, setUserIdError] = useState("");
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onClose: onCloseAlert,
    onOpen: onOpenAlert,
  } = useDisclosure();
  const navigate = useNavigate();

  const handleAssignUser = async () => {
    if (userId.userId) {
      const res = await assignAssetToUser({
        assetId: String(assetId),
        reason: userId.note,
        toUserId: userId.userId,
      });
      const { data } = res;
      if (data?.isSuccess) {
        onClose();
        setUserId({ userId: "", note: "" });
        dispatch(getDetailAssetAction({ assetId: assetId || "" }));
      }
      setUserIdError("");
    } else {
      setUserIdError("User is required!");
    }
  };

  const handleRetrieveAsset = async () => {
    if (detailAsset?.history && detailAsset?.history?.length > 0) {
      const res = await retrieveAsset({
        assetId: String(assetId),
        fromUserId:
          detailAsset?.history &&
          detailAsset?.history?.length > 0 &&
          detailAsset?.history[0].toCustodianId,
      });
      const { data } = res;
      if (data?.isSuccess) {
        onCloseAlert();
        dispatch(getDetailAssetAction({ assetId: assetId || "" }));
      }
    }
  };

  useEffect(() => {
    dispatch(getDetailAssetAction({ assetId: assetId || "" }));
    dispatch(getListUserOptionAction());
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
      <Flex alignItems="flex-start" gap="24px">
        <Box
          w="100%"
          minW="300px"
          maxW="600px"
          maxHeight="600px"
          overflow="hidden"
          borderRadius="12px"
          boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        >
          <Img
            width="100%"
            h="100%"
            objectFit="cover"
            src={
              detailAsset?.image
                ? detailAsset?.image
                : "/images/img-placeholder.jpg"
            }
          />
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
            label="Useful Life"
            value={`${showData(detailAsset?.usefulLife)} years`}
          />
          <IconLabelValue
            label="Depreciation Rate"
            value={`${showData(detailAsset?.depreciationAmount)}%`}
          />
          <IconLabelValue
            label="Original Cost"
            value={showData(formatPrice(detailAsset?.originalCost))}
          />
          <IconLabelValue
            label="Remaining Cost"
            value={showData(formatPrice(detailAsset?.currentCost))}
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
            label="Purchase Date"
            value={showData(
              moment(detailAsset?.purchase_date).format("DD/MM/YYYY")
            )}
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
                  <Link
                    color="var(--chakra-colors-purple-500)"
                    onClick={() => {
                      navigate(`/user/${detailAsset?.history[0]?.toUser?.id}`);
                    }}
                  >
                    {detailAsset?.history &&
                      detailAsset?.history?.length > 0 &&
                      `${detailAsset?.history[0]?.toUser?.lastName}
                      ${detailAsset?.history[0]?.toUser?.firstName}`}
                  </Link>
                }
              />
              <PermissionWrapper permission={PERMISSION.RETRIEVE_ASSET_USER}>
                <Button colorScheme="orange" onClick={onOpenAlert}>
                  Retrieve
                </Button>
              </PermissionWrapper>
            </>
          )}
          {detailAsset?.isAvailable && (
            <PermissionWrapper permission={PERMISSION.ASSIGN_ASSET_USER}>
              <Button colorScheme="purple" onClick={onOpen}>
                Assign to
              </Button>
            </PermissionWrapper>
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
              <PermissionPageWrapper
                permission={PERMISSION.VIEW_ASSET_ASSIGN_HISTORY}
              >
                <HistoryTab />
              </PermissionPageWrapper>
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
        onSubmit={handleAssignUser}
      >
        <Flex direction="column" gap="12px">
          <Box>
            <Text className="required" fontWeight="bold" mb="8px">
              User
            </Text>
            <Select
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Select user"
              variant="filled"
              isInvalid={userIdError.length > 0}
              value={userId.userId}
              onChange={(e) => {
                setUserId({
                  ...userId,
                  userId: e.target.value,
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
            {userIdError && (
              <Text className="error-message">{userIdError}</Text>
            )}
          </Box>
          <Box>
            <Text fontWeight="bold" mb="8px">
              Reason
            </Text>
            <Textarea
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Reason..."
              variant="filled"
              value={userId.note}
              onChange={(e) => {
                setUserId({
                  ...userId,
                  note: e.target.value,
                });
              }}
            />
          </Box>
        </Flex>
      </ModalWrapper>
      <AlertEnsure
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        onSubmit={handleRetrieveAsset}
      />
    </PaperWrapper>
  );
}
