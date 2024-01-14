/* eslint-disable no-empty-pattern */
import {
  Box,
  Button,
  Flex,
  Img,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import {
  ASSET_STATUS,
  ASSET_STATUS_LABEL,
  DEFAULT_FORMAT_DATE,
  LIMIT_LIST,
} from "constants/common";
import ResponsivePagination from "react-responsive-pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "store/store";
import { exportExcel, getListAssetPaging } from "services/asset.service";
import {
  assetSelector,
  getListAcquisitionSourceAction,
  getListAssetAction,
  getListAssetTypeAction,
} from "store/asset";
import { formatPrice, showData } from "utils/common";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AssetStatusTag } from "components/molecules/AssetStatusTag";
import { RiFileExcel2Fill } from "react-icons/ri";

type Props = {};

export default function ListAssetContainer({}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_LIST[2]);
  const { listAssetPaging, listAssetType, listAcquisitionSource } =
    useSelector(assetSelector);
  const [query, setQuery] = useState({
    assetTypeId: "",
    acquisitionSourceId: "",
    status: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeData = (key: string, value: string | number | boolean) => {
    setQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeCurrentPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  const exportData = async () => {
    const response = await exportExcel();
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Report-Asset-${moment()
        .format("DD/MM/YYYY HH:mm_ss")
        .replace(":", "h")
        .replace("_", "m")}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    dispatch(
      getListAssetAction({
        limit: limit,
        page: currentPage,
        ...query,
      })
    );
  }, [currentPage, dispatch, limit, query]);

  useEffect(() => {
    dispatch(getListAssetTypeAction({ categoryId: "" }));
    dispatch(getListAcquisitionSourceAction());
  }, [dispatch]);

  return (
    <PaperWrapper label="List Asset">
      <Button
        colorScheme="purple"
        position="absolute"
        top="24px"
        right="24px"
        onClick={() => {
          navigate("create");
        }}
      >
        Create Asset
      </Button>
      <Flex gap="12px" mb="12px">
        <Select
          focusBorderColor="purple.400"
          colorScheme="purple"
          placeholder="Select Asset Type..."
          variant="filled"
          w="400px"
          value={query.assetTypeId}
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
        <Select
          focusBorderColor="purple.400"
          colorScheme="purple"
          placeholder="Select Acquisition Source..."
          variant="filled"
          w="400px"
          value={query.acquisitionSourceId}
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
        <Button
          leftIcon={<RiFileExcel2Fill />}
          colorScheme="purple"
          onClick={exportData}
        >
          Export
        </Button>
      </Flex>
      <TableContainer
        border="1px solid var(--gray-02)"
        p="12px"
        borderRadius="6px"
      >
        <Table variant="striped" colorScheme="purple" size="md">
          <Thead>
            <Tr>
              <Th w="100px" fontSize="16px">
                ID
              </Th>
              <Th fontSize="16px" textAlign="center">
                Status
              </Th>
              <Th fontSize="16px" textAlign="center">
                Image
              </Th>
              <Th fontSize="16px" textAlign="center">
                Asset Name
              </Th>
              <Th fontSize="16px" textAlign="center">
                Type
              </Th>
              <Th fontSize="16px" textAlign="center">
                Original Cost
              </Th>
              <Th fontSize="16px" textAlign="center">
                Warranty Duration
              </Th>
              <Th fontSize="16px" textAlign="center">
                Warranty Start Date
              </Th>
              <Th fontSize="16px" textAlign="center">
                Warranty End Date
              </Th>
              <Th fontSize="16px" textAlign="center">
                Purchase Date
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {listAssetPaging?.result?.map((ele: any) => {
              return (
                <Tr
                  key={ele?.id}
                  cursor="pointer"
                  _hover={{
                    transition: "0.2s",
                    position: "relative",
                    zIndex: 100,
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  }}
                  onClick={() => {
                    navigate(String(ele.id));
                  }}
                >
                  <Td>{ele?.id}</Td>
                  <Td textAlign="center">
                    <AssetStatusTag
                      status={
                        ele?.isAvailable
                          ? ASSET_STATUS.AVAILABLE
                          : ASSET_STATUS.NOT_AVAILABLE
                      }
                    />
                  </Td>
                  <Td>
                    <Img
                      src={
                        ele?.image ? ele?.image : "/images/img-placeholder.jpg"
                      }
                    />
                  </Td>
                  <Td textAlign="center">{showData(ele?.name)}</Td>
                  <Td textAlign="center">{showData(ele?.type)}</Td>
                  <Td textAlign="center">
                    {showData(formatPrice(ele?.originalCost))}
                  </Td>
                  <Td textAlign="center">
                    {showData(ele?.warrantyDuration)} {showData(ele?.timeUnit)}
                  </Td>
                  <Td textAlign="center">
                    {moment(ele?.warrantyStartDate).format(DEFAULT_FORMAT_DATE)}
                  </Td>
                  <Td textAlign="center">
                    {moment(ele?.warrantyEndDate).format(DEFAULT_FORMAT_DATE)}
                  </Td>
                  <Td textAlign="center">
                    {showData(
                      ele?.purchase_date
                        ? moment(ele?.purchase_date).format(DEFAULT_FORMAT_DATE)
                        : null
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Box pt={3} display="flex" justifyContent="flex-end">
        <Select value={limit} onChange={handleChangeLimit} width="100px">
          {LIMIT_LIST.map((ele, idx) => {
            return (
              <option key={idx} value={ele}>
                {ele}
              </option>
            );
          })}
        </Select>
        <ResponsivePagination
          maxWidth={400}
          current={currentPage}
          total={Math.ceil(listAssetPaging?.total / limit)}
          onPageChange={handleChangeCurrentPage}
        />
      </Box>
    </PaperWrapper>
  );
}
