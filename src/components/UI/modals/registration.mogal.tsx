'use client';
import CustomModal from "@/components/common/modal";
import RegistrationForm from "@/forms/registration.form";


interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegistrationMogal({isOpen, onClose}: IProps)  {


  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Створити акаунт">
      <RegistrationForm onClose={onClose} />
    </CustomModal>
  )
}
