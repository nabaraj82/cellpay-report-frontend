import ButtonPrimary from "@/components/common/ButtonPrimary";
import Modal from "@/components/common/Modal";
import SearchInput from "@/components/common/SearchInput";
import Form from "@/components/module-setup/Form";
import { useShowModal } from "@/hooks/useShowModal";
import React, { memo, useCallback } from "react";

const Header = memo(({ searchTerm, onChange }) => {
  const { isOpen, showModal, closeModal } = useShowModal();

  const handleCloseModal = useCallback(() => {
    closeModal();
  }, []);
  return (
    <>
      <Modal title="Add Module" isOpen={isOpen} onClose={handleCloseModal}>
        <Form closeModal={handleCloseModal} />
      </Modal>
      <div className="flex justify-between">
        <SearchInput value={searchTerm} onChange={onChange} />
        <ButtonPrimary onClick={showModal}>Add</ButtonPrimary>
      </div>
    </>
  );
});

export default Header;
