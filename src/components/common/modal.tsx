'use client';
import { Modal, ModalContent, ModalBody, ModalHeader } from "@heroui/react";
import { ReactNode } from "react";


interface IProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}


export default function CustomModal({isOpen, onClose, title, children, size = 'xs'}: IProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} >
      <ModalContent>

        <ModalHeader className="boreder-b">
            <h3 className="text-xl font-semibold">
                {title}
            </h3>
        </ModalHeader>

        <ModalBody className="space-y-4 py-6">
            {children}  
        </ModalBody>

      </ModalContent>
    </Modal>
  )
}
