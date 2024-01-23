import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
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
  ...rest
}: Props & ModalProps) {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalContent overflow="auto" h="100vh">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow="auto" h="calc(100% - 100px)">
          {children}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="purple" variant="solid" onClick={onSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
