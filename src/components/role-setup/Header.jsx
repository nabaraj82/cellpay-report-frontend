import React from 'react'
import SearchInput from '../common/SearchInput';
import ButtonPrimary from '../common/ButtonPrimary';
import { useShowModal } from '../../hooks/useShowModal';
import Modal from '../common/Modal';
import RoleForm from './RoleForm';

const Header = ({ searchTerm, onChange }) => {
  
  const {isOpen, showModal, closeModal } = useShowModal();
  return (
    <>
      <Modal title="Create Role" isOpen={isOpen} onClose={closeModal}>
        <RoleForm  onCloseModal={closeModal}/>
      </Modal>
      <div className="flex justify-between">
        <SearchInput value={searchTerm} onChange={onChange} />
        <ButtonPrimary onClick={showModal}>Add</ButtonPrimary>
      </div>
    </>
  );
}

export default Header