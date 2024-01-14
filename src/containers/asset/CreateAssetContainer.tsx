import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAsset } from "services/asset.service";
import {
  assetSelector,
  getListAcquisitionSourceAction,
  getListAssetCategoryAction,
  getListAssetTypeAction,
} from "store/asset";
import { useDispatch, useSelector } from "store/store";
import { showData } from "utils/common";

type Props = {};

export default function CreateAssetContainer({}: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listAcquisitionSource, listAssetCategory, listAssetType } =
    useSelector(assetSelector);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "1",
    image: "",
    originalCost: "",
    specification: "",
    isWarranty: true,
    warrantyDuration: "",
    timeUnit: "",
    warrantyStartDate: "",
    warrantyEndDate: "",
    warrantyCondition: "",
    note: "",
    conditionState: "",
    purchaseDate: "",
    depreciationAmount: "",
    usefulLife: "",
    serialNumber: "",
    acquisitionSourceId: "",
    assetTypeId: "",
    categoryId: "",
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    quantity: "",
    originalCost: "",
    specification: "",
    warrantyDuration: "",
    timeUnit: "",
    warrantyStartDate: "",
    warrantyEndDate: "",
    warrantyCondition: "",
    note: "",
    conditionState: "",
    purchaseDate: "",
    depreciationAmount: "",
    usefulLife: "",
    serialNumber: "",
    acquisitionSourceId: "",
    assetTypeId: "",
    categoryId: "",
  });

  const handleChangeData = (key: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const currentCategory = useMemo(() => {
    return listAssetCategory?.find(
      (ele: any) => ele?.id == formData.categoryId
    );
  }, [formData.categoryId, listAssetCategory]);

  const handleSubmit = async () => {
    const error = { ...formDataError };
    let valid = true;
    if (!formData.name) {
      error.name = "Name is required";
      valid = false;
    } else {
      error.name = "";
    }
    // if (!Number(formData.quantity)) {
    //   error.quantity = "Quantity greater than 0";
    //   valid = false;
    // } else {
    //   error.quantity = "";
    // }
    if (!Number(formData.originalCost)) {
      error.originalCost = "Original Cost greater than 0";
      valid = false;
    } else {
      error.originalCost = "";
    }
    if (!formData.serialNumber) {
      error.serialNumber = "Serial Number is required";
      valid = false;
    } else {
      error.serialNumber = "";
    }
    if (
      !Number(formData.depreciationAmount) ||
      Number(formData.depreciationAmount) <
        Number(currentCategory?.depreciationBasisMinValue) ||
      Number(formData.depreciationAmount) >
        Number(currentCategory?.depreciationBasisMaxValue)
    ) {
      error.depreciationAmount = "Depreciation Amount invalid";
      valid = false;
    } else {
      error.depreciationAmount = "";
    }
    if (
      !Number(formData.usefulLife) ||
      Number(formData.usefulLife) <
        Number(currentCategory?.usefulLifeMinYear) ||
      Number(formData.usefulLife) > Number(currentCategory?.usefulLifeMaxYear)
    ) {
      error.usefulLife = "Useful Life invalid";
      valid = false;
    } else {
      error.usefulLife = "";
    }
    if (!formData.acquisitionSourceId) {
      error.acquisitionSourceId = "Acquisition Source is required";
      valid = false;
    } else {
      error.acquisitionSourceId = "";
    }
    if (!formData.categoryId) {
      error.categoryId = "Category is required";
      valid = false;
    } else {
      error.categoryId = "";
    }
    if (!formData.assetTypeId) {
      error.assetTypeId = "Asset Type is required";
      valid = false;
    } else {
      error.assetTypeId = "";
    }

    if (!formData.purchaseDate) {
      error.purchaseDate = "Purchase Date is required";
      valid = false;
    } else {
      error.purchaseDate = "";
    }

    if (!Number(formData.warrantyDuration)) {
      error.warrantyDuration = "Warranty Duration greater than 0";
      valid = false;
    } else {
      error.warrantyDuration = "";
    }
    if (!formData.timeUnit) {
      error.timeUnit = "Time Unit is required";
      valid = false;
    } else {
      error.timeUnit = "";
    }
    if (!formData.warrantyStartDate) {
      error.warrantyStartDate = "Warranty Start Date is required";
      valid = false;
    } else {
      error.warrantyStartDate = "";
    }
    if (!formData.warrantyEndDate) {
      error.warrantyEndDate = "Warranty End Date is required";
      valid = false;
    } else {
      error.warrantyEndDate = "";
    }
    setFormDataError(error);

    if (valid) {
      const response = await createAsset(formData);
      const { isSuccess } = response.data;
      if (isSuccess) {
        navigate("/asset");
        setFormData({
          name: "",
          quantity: "1",
          image: "",
          originalCost: "",
          specification: "",
          isWarranty: true,
          warrantyDuration: "",
          timeUnit: "",
          warrantyStartDate: "",
          warrantyEndDate: "",
          warrantyCondition: "",
          note: "",
          conditionState: "",
          purchaseDate: "",
          depreciationAmount: "",
          usefulLife: "",
          serialNumber: "",
          acquisitionSourceId: "",
          assetTypeId: "",
          categoryId: "",
        });
      }
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      assetTypeId: "",
    }));
    dispatch(getListAssetTypeAction({ categoryId: formData.categoryId }));
  }, [dispatch, formData.categoryId]);

  useEffect(() => {
    dispatch(getListAcquisitionSourceAction());
    dispatch(getListAssetCategoryAction());
  }, [dispatch]);

  return (
    <PaperWrapper label="Create New Asset">
      <Button
        colorScheme="purple"
        position="absolute"
        top="24px"
        right="24px"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Box display="flex" gap="12px" flexDirection="column">
        <Flex gap="12px">
          <Box w="100%">
            <Text className="required" mb="8px">
              Asset Name
            </Text>
            <Input
              placeholder="Macbook pro M1..."
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              value={formData.name}
              onChange={(e) => {
                handleChangeData("name", e.target.value);
              }}
            />
            {formDataError.name && (
              <Text className="error-message">{formDataError.name}</Text>
            )}
          </Box>
          {/* <Box w="50%">
            <Text className="required" mb="8px">
              Quantity
            </Text>
            <Input
              type="number"
              placeholder="1"
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              value={formData.quantity}
              onChange={(e) => {
                handleChangeData("quantity", e.target.value);
              }}
            />
            {formDataError.quantity && (
              <Text className="error-message">{formDataError.quantity}</Text>
            )}
          </Box> */}
        </Flex>
        <Flex gap="12px">
          <Box w="50%">
            <Text className="required" mb="8px">
              Original Cost
            </Text>
            <Input
              type="number"
              placeholder="450$"
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              value={formData.originalCost}
              onChange={(e) => {
                handleChangeData("originalCost", e.target.value);
              }}
            />
            {formDataError.originalCost && (
              <Text className="error-message">
                {formDataError.originalCost}
              </Text>
            )}
          </Box>
          <Box w="50%">
            <Text className="required" mb="8px">
              Series Number
            </Text>
            <Input
              placeholder="HSWQQ12321..."
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              value={formData.serialNumber}
              onChange={(e) => {
                handleChangeData("serialNumber", e.target.value);
              }}
            />
            {formDataError.serialNumber && (
              <Text className="error-message">
                {formDataError.serialNumber}
              </Text>
            )}
          </Box>
        </Flex>
        <Flex gap="12px">
          <Box w="50%">
            <Text className="required" mb="8px">
              Category
            </Text>
            <Select
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Select option"
              variant="filled"
              value={formData.categoryId}
              onChange={(e) => {
                handleChangeData("categoryId", e.target.value);
              }}
            >
              {listAssetCategory?.map((ele: any) => {
                return (
                  <option key={ele?.id} value={ele?.id}>
                    {showData(ele?.name)}
                  </option>
                );
              })}
            </Select>
            {formDataError.categoryId && (
              <Text className="error-message">{formDataError.categoryId}</Text>
            )}
          </Box>
          <Box w="50%">
            <Text className="required" mb="8px">
              Type
            </Text>
            <Select
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Select option"
              variant="filled"
              value={formData.assetTypeId}
              onChange={(e) => {
                handleChangeData("assetTypeId", e.target.value);
              }}
            >
              {listAssetType?.map((ele: any) => {
                return (
                  <option key={ele?.id} value={ele?.id}>
                    {showData(ele?.name)}
                  </option>
                );
              })}
            </Select>
            {formDataError.assetTypeId && (
              <Text className="error-message">{formDataError.assetTypeId}</Text>
            )}
          </Box>
        </Flex>
        <Flex gap="12px">
          <Box w="25%">
            <Text className="required" mb="8px">
              Depreciation Rate
            </Text>

            <Input
              type="number"
              placeholder={
                currentCategory
                  ? currentCategory?.depreciationBasisMinValue !=
                    currentCategory?.depreciationBasisMaxValue
                    ? `${showData(
                        currentCategory?.depreciationBasisMinValue
                      )} - ${showData(
                        currentCategory?.depreciationBasisMaxValue
                      )}%`
                    : `${showData(
                        currentCategory?.depreciationBasisMaxValue
                      )} years`
                  : "Please select category"
              }
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              value={formData.depreciationAmount}
              onChange={(e) => {
                handleChangeData("depreciationAmount", e.target.value);
              }}
            />
            {formDataError.depreciationAmount && (
              <Text className="error-message">
                {formDataError.depreciationAmount}
              </Text>
            )}
          </Box>
          <Box w="25%">
            <Text className="required" mb="8px">
              Useful Years
            </Text>
            <Input
              type="number"
              placeholder={
                currentCategory
                  ? currentCategory?.usefulLifeMinYear !=
                    currentCategory?.usefulLifeMaxYear
                    ? `${showData(
                        currentCategory?.usefulLifeMinYear
                      )} - ${showData(
                        currentCategory?.usefulLifeMaxYear
                      )} years`
                    : `${showData(currentCategory?.usefulLifeMaxYear)} years`
                  : "Please select category"
              }
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              value={formData.usefulLife}
              onChange={(e) => {
                handleChangeData("usefulLife", e.target.value);
              }}
            />
            {formDataError.usefulLife && (
              <Text className="error-message">{formDataError.usefulLife}</Text>
            )}
          </Box>
          <Box w="50%">
            <Text className="required" mb="8px">
              Acquisition Source
            </Text>
            <Select
              focusBorderColor="purple.400"
              colorScheme="purple"
              placeholder="Select option"
              variant="filled"
              value={formData.acquisitionSourceId}
              onChange={(e) => {
                handleChangeData("acquisitionSourceId", e.target.value);
              }}
            >
              {listAcquisitionSource?.map((ele: any) => {
                return (
                  <option key={ele?.id} value={ele?.id}>
                    {showData(ele?.name)}
                  </option>
                );
              })}
            </Select>
            {formDataError.acquisitionSourceId && (
              <Text className="error-message">
                {formDataError.acquisitionSourceId}
              </Text>
            )}
          </Box>
        </Flex>
        <Flex gap="12px">
          <Box w="50%">
            <Text mb="8px">Condition State</Text>
            <Textarea
              placeholder=""
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              value={formData.conditionState}
              onChange={(e) => {
                handleChangeData("conditionState", e.target.value);
              }}
            />
          </Box>
          <Box w="50%">
            <Text mb="8px">Note</Text>
            <Textarea
              placeholder=""
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              value={formData.note}
              onChange={(e) => {
                handleChangeData("note", e.target.value);
              }}
            />
          </Box>
        </Flex>
        <Flex gap="12px">
          <Box w="50%">
            <Text fontWeight="bold">Have Warranty</Text>
            <Switch
              colorScheme="purple"
              defaultChecked={formData.isWarranty}
              size="md"
              onChange={(e) => {
                handleChangeData("isWarranty", e.target.checked);
              }}
            />
          </Box>
          <Box w="50%">
            <Text className="required" mb="8px">
              Purchase Date
            </Text>
            <Input
              type="date"
              placeholder=""
              focusBorderColor="purple.400"
              colorScheme="purple"
              variant="filled"
              value={formData.purchaseDate}
              onChange={(e) => {
                handleChangeData("purchaseDate", e.target.value);
              }}
            />
            {formDataError.purchaseDate && (
              <Text className="error-message">
                {formDataError.purchaseDate}
              </Text>
            )}
          </Box>
        </Flex>

        <>
          <Flex gap="12px">
            <Box w="50%">
              <Text className="required" mb="8px">
                Warrant Duration
              </Text>
              <Input
                type="number"
                placeholder="12"
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                value={formData.warrantyDuration}
                onChange={(e) => {
                  handleChangeData("warrantyDuration", e.target.value);
                }}
              />
              {formDataError.warrantyDuration && (
                <Text className="error-message">
                  {formDataError.warrantyDuration}
                </Text>
              )}
            </Box>
            <Box w="50%">
              <Text className="required" mb="8px">
                Time Unit
              </Text>
              <Input
                placeholder="month..."
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                value={formData.timeUnit}
                onChange={(e) => {
                  handleChangeData("timeUnit", e.target.value);
                }}
              />
              {formDataError.timeUnit && (
                <Text className="error-message">{formDataError.timeUnit}</Text>
              )}
            </Box>
          </Flex>
          <Flex gap="12px">
            <Box w="50%">
              <Text mb="8px">Specification</Text>
              <Textarea
                placeholder=""
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                value={formData.specification}
                onChange={(e) => {
                  handleChangeData("specification", e.target.value);
                }}
              />
            </Box>
            <Box w="50%">
              <Text mb="8px">Warranty Condition</Text>
              <Textarea
                placeholder=""
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                value={formData.warrantyCondition}
                onChange={(e) => {
                  handleChangeData("warrantyCondition", e.target.value);
                }}
              />
            </Box>
          </Flex>
          <Flex gap="12px">
            <Box w="50%">
              <Text className="required" mb="8px">
                Warranty Start Date
              </Text>
              <Input
                type="date"
                placeholder=""
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                value={formData.warrantyStartDate}
                onChange={(e) => {
                  handleChangeData("warrantyStartDate", e.target.value);
                }}
              />
              {formDataError.warrantyStartDate && (
                <Text className="error-message">
                  {formDataError.warrantyStartDate}
                </Text>
              )}
            </Box>
            <Box w="50%">
              <Text className="required" mb="8px">
                Warranty End Date
              </Text>
              <Input
                type="date"
                placeholder=""
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
                value={formData.warrantyEndDate}
                onChange={(e) => {
                  handleChangeData("warrantyEndDate", e.target.value);
                }}
              />
              {formDataError.warrantyEndDate && (
                <Text className="error-message">
                  {formDataError.warrantyEndDate}
                </Text>
              )}
            </Box>
          </Flex>
        </>
      </Box>
    </PaperWrapper>
  );
}
