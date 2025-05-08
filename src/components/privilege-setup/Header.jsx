import ButtonPrimary from "@/components/common/ButtonPrimary";
import Modal from "@/components/common/Modal";
import SearchInput from "@/components/common/SearchInput";
import Toast from "@/components/common/Toast";
import Form from "@/components/privilege-setup/Form";
import { useShowModal } from "@/hooks/useShowModal";


const Header = ({ searchTerm, onChange }) => {
  const { isOpen, showModal, closeModal } = useShowModal();
  return (
    <>
      <Toast />
      <Modal title="Add Privilege" isOpen={isOpen} onClose={closeModal}>
        <Form closeModal={closeModal} />
      </Modal>
      <div className="flex justify-between">
        <SearchInput value={searchTerm} onChange={onChange} />
        <ButtonPrimary onClick={showModal}>Add</ButtonPrimary>
      </div>
    </>
  );
};

export default Header;
