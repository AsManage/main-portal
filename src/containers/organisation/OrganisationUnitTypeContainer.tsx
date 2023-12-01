import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";
import React, { useEffect, useState } from "react";
import {
  getListOUnitTypeAction,
  organisationSelector,
  setCurrentPageOUType,
  setLimitOUType,
} from "store/organisation";
import { useDispatch, useSelector } from "store/store";
import { showData } from "utils/common";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { MdDeleteForever } from "react-icons/md";
import { LIMIT_LIST } from "constants/common";
import { FaEdit } from "react-icons/fa";

import { IoMdAdd } from "react-icons/io";
import {
  createListOUnitType,
  deleteListOUnitType,
  updateListOUnitType,
} from "services/organisation.service";

type Props = {};

export const OrganisationUnitTypeContainer = (props: Props) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = React.useRef(null);
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [unitName, setUnitName] = useState("");
  const [unitNameError, setUnitNameError] = useState("");
  const [selected, setSelected] = useState<any>({});
  const { listOUType, totalOUType, limitOUType, currentPageOUType } =
    useSelector(organisationSelector);

  const handleChangeCurrentPage = (newPage: number) => {
    dispatch(setCurrentPageOUType(newPage));
  };

  const handleChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimitOUType(e.target.value));
  };

  const handleSubmit = async () => {
    let valid = true;
    if (!unitName.trim()) {
      setUnitNameError("Organisation Unit Type name cannot empty!");
      valid = false;
    } else if (unitName.trim().length > 100) {
      setUnitNameError("Maximum length is 100!");
      valid = false;
    }
    if (valid) {
      const res = await createListOUnitType({ name: unitName.trim() });
      const { data } = res;
      if (data.isSuccess) {
        onClose();
        setUnitName("");
        dispatch(
          getListOUnitTypeAction({
            limit: limitOUType,
            page: currentPageOUType,
          })
        );
      }
    }
  };

  const handleEdit = (id: number) => {
    setSelected(listOUType.find((ele: any) => ele.id === id));
    setUnitName(listOUType.find((ele: any) => ele.id === id)?.name);
    onOpenEdit();
  };

  const handleCompleteEdit = async () => {
    let valid = true;
    if (!unitName.trim()) {
      setUnitNameError("Organisation Unit Type name cannot empty!");
      valid = false;
    } else if (unitName.trim().length > 100) {
      setUnitNameError("Maximum length is 100!");
      valid = false;
    }
    if (valid) {
      const res = await updateListOUnitType({
        name: unitName.trim(),
        typeId: selected.id,
      });
      const { data } = res;
      if (data.isSuccess) {
        onCloseEdit();
        setUnitName("");
        dispatch(
          getListOUnitTypeAction({
            limit: limitOUType,
            page: currentPageOUType,
          })
        );
      }
    }
  };

  const handleOpenDelete = (id: number) => {
    setSelected(listOUType.find((ele: any) => ele.id === id));
    setUnitName(listOUType.find((ele: any) => ele.id === id)?.name);
    onOpenAlert();
  };

  const handleDelete = async () => {
    const res = await deleteListOUnitType({
      typeId: selected.id,
    });
    const { data } = res;
    if (data.isSuccess) {
      onCloseAlert();
      setUnitName("");
      dispatch(
        getListOUnitTypeAction({
          limit: limitOUType,
          page: currentPageOUType,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getListOUnitTypeAction({
        limit: limitOUType,
        page: currentPageOUType,
      })
    );
  }, [currentPageOUType, dispatch, limitOUType]);

  return (
    <Box>
      <PaperWrapper label="Organisation Unit Type">
        <Box textAlign="right" mb="12px">
          <Button
            leftIcon={<IoMdAdd fontSize="24px" />}
            colorScheme="purple"
            variant="outline"
            onClick={onOpen}
          >
            Unit Type
          </Button>
        </Box>

        <TableContainer
          border="1px solid var(--gray-02)"
          p="12px"
          borderRadius="6px"
        >
          <Table variant="striped" colorScheme="purple" size="sm">
            <Thead>
              <Tr>
                <Th w="100px">ID</Th>
                <Th>Unit Name</Th>
                <Th w="50px"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listOUType?.map((ele: any) => {
                return (
                  <Tr key={ele?.id}>
                    <Td>{ele?.id}</Td>
                    <Td>{showData(ele?.name)}</Td>
                    <Td>
                      <Icon
                        cursor="pointer"
                        as={FaEdit}
                        fontSize="24px"
                        color="purple.500"
                        mr="12px"
                        onClick={() => {
                          handleEdit(ele?.id);
                        }}
                      />
                      {/* <Icon
                        cursor="pointer"
                        as={MdDeleteForever}
                        fontSize="24px"
                        color="red.500"
                        onClick={() => {
                          handleOpenDelete(ele?.id);
                        }}
                      /> */}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Box pt={3} display="flex" justifyContent="flex-end">
          <Select
            value={limitOUType}
            onChange={handleChangeLimit}
            width="100px"
          >
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
            current={currentPageOUType}
            total={Math.ceil(totalOUType / limitOUType)}
            onPageChange={handleChangeCurrentPage}
          />
        </Box>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setUnitName("");
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Organisation Unit Type</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="8px">Organisation Unit Type Name</Text>
              <Input
                value={unitName}
                onChange={(e) => {
                  setUnitName(e.target.value);
                }}
                isInvalid={unitNameError.length > 0}
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
              />
              {unitNameError && (
                <Text className="error-message">{unitNameError}</Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                variant="solid"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isOpenEdit}
          onClose={() => {
            onCloseEdit();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Organisation Unit Type</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="8px">Organisation Unit Type Name</Text>
              <Input
                value={unitName}
                onChange={(e) => {
                  setUnitName(e.target.value);
                }}
                isInvalid={unitNameError.length > 0}
                focusBorderColor="purple.400"
                colorScheme="purple"
                variant="filled"
              />
              {unitNameError && (
                <Text className="error-message">{unitNameError}</Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                variant="solid"
                onClick={handleCompleteEdit}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <AlertDialog
          isOpen={isOpenAlert}
          leastDestructiveRef={cancelRef}
          onClose={onCloseAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Customer
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure to delete? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseAlert}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </PaperWrapper>
    </Box>
  );
};

