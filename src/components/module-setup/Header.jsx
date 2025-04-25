import React, { memo, useCallback } from 'react'
import SearchInput from '../common/SearchInput';
import ButtonPrimary from '../common/ButtonPrimary';
import { useShowModal } from '../../hooks/useShowModal';
import Form from './Form';
import Modal from '../common/Modal';

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
