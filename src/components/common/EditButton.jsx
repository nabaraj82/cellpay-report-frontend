import React from "react";
import { FiEdit } from "react-icons/fi";

const EditButton = ({onClick}) => {
  return (
    <button
      className="cursor-pointer"
      onClick={onClick}
    >
      <FiEdit size={15} />
    </button>
  );
};

export default EditButton;
