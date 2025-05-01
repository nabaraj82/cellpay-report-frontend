import { useShowModal } from "../../hooks/useShowModal";
import Modal from "../common/Modal";
import ButtonPrimary from "../common/ButtonPrimary";
import SearchInput from "../common/SearchInput";
import Toast from "../common/Toast";
import Form from './Form';

const Header = ({ searchTerm, onChange }) => {
  const { isOpen, showModal, closeModal } = useShowModal();
  return (
    <>
      <Toast />
      <Modal title="Add Screen" isOpen={isOpen} onClose={closeModal}>
        <Form
          closeModal={closeModal}
        />
      </Modal>
      <div className="flex justify-between">
        <SearchInput value={searchTerm} onChange={onChange} />
        <ButtonPrimary onClick={showModal}>Add</ButtonPrimary>
      </div>
    </>
  );
};

export default Header;
