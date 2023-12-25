import {
  Box,
  Button,
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
import { DEFAULT_FORMAT_DATE, LIMIT_LIST } from "constants/common";
import ResponsivePagination from "react-responsive-pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "store/store";
import { getListAssetPaging } from "services/asset.service";
import { assetSelector, getListAssetAction } from "store/asset";
import { formatPrice, showData } from "utils/common";
import moment from "moment";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function ListAssetContainer({}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_LIST[2]);
  const { listAssetPaging } = useSelector(assetSelector);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChangeCurrentPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  useEffect(() => {
    dispatch(
      getListAssetAction({
        limit: limit,
        page: currentPage,
      })
    );
  }, [currentPage, dispatch, limit]);

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
              <Th fontSize="16px">Image</Th>
              <Th fontSize="16px">Asset Name</Th>
              <Th fontSize="16px">Type</Th>
              <Th fontSize="16px">Quantity</Th>
              <Th fontSize="16px">Original Cost</Th>
              <Th fontSize="16px">Warranty Duration</Th>
              <Th fontSize="16px">Warranty Start Date</Th>
              <Th fontSize="16px">Warranty End Date</Th>
              <Th fontSize="16px">Purchase Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listAssetPaging?.result?.map((ele: any) => {
              return (
                <Tr key={ele?.id}>
                  <Td>{ele?.id}</Td>
                  <Td>
                    <Img src="images/img-placeholder.jpg" />
                  </Td>
                  <Td textAlign="center">{showData(ele?.name)}</Td>
                  <Td textAlign="center">{showData(ele?.type)}</Td>
                  <Td textAlign="center">{showData(ele?.quantity)}</Td>
                  <Td textAlign="center">
                    {showData(formatPrice(ele?.quantity))}
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