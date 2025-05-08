import { FiDelete } from "react-icons/fi";

const DeleteButton = ({onClick}) => {
  return (
    <button
      className="cursor-pointer"
      onClick={onClick}
    >
      <FiDelete className="text-red-500" size={15} />
    </button>
  );
};

export default DeleteButton;
