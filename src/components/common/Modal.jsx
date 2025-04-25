import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const Modal = ({ title, children, isOpen, onClose }) => {
  
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const modalRef = useRef();
  if (isOpen) {
    modalRef.current?.showModal();
  } else {
    modalRef.current?.close();
}
  return createPortal(
    <dialog
      className={`dialog-slide-in ${
        darkMode ? "dark" : ""
      } dark:bg-gray-600 dark:text-stone-300`}
      ref={modalRef}
      onClose={onClose}
    >
      <div className="bg-white dark:bg-gray-600 rounded-xl shadow-lg w-full  p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
       {children}
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
};

export default Modal;
