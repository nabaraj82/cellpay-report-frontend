import ButtonPrimary from "@/components/common/ButtonPrimary";
import Modal from "@/components/common/Modal";
import SearchInput from "@/components/common/SearchInput";
import RoleForm from "@/components/role-setup/RoleForm";
import { useShowModal } from "@/hooks/useShowModal";


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