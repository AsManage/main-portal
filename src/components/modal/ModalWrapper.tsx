import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
};

export default function ModalWrapper({
  title,
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  children,
}: Props) {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="purple" variant="solid" onClick={onSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
