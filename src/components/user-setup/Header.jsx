import React from 'react'
import SearchInput from '../common/SearchInput';
import ButtonPrimary from '../common/ButtonPrimary';
import { useShowModal } from '../../hooks/useShowModal';
import Modal from '../common/Modal';
import Form from './Form';
import Toast from '../common/Toast';

const Header = ({ searchTerm, onChange }) => {
  const { isOpen, showModal, closeModal } = useShowModal();
  return (
    <>
      <Toast />
      <Modal title="Create User" isOpen={isOpen} onClose={closeModal}>
        <Form closeModal={closeModal} />
      </Modal>
      
      <div className="flex justify-between">
              <SearchInput value={searchTerm} onChange={onChange} />
        <ButtonPrimary onClick={showModal} >Add</ButtonPrimary>
      </div>
    </>
  );
}

export default Header