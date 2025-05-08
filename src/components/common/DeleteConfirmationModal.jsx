import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux';

const DeleteConfirmationModal = ({ isOpen, onClose, children }) => {
    const darkMode = useSelector((state) => state.darkMode.isDarkMode);
     const modalRef = useRef();
      if (isOpen) {
        modalRef.current?.showModal();
      } else {
        modalRef.current?.close();
  }
    const handleClose = (e) => {
      e.stopPropagation(); 
      onClose();
    };
  return createPortal(
    <dialog
      className={`dialog-slide-in ${
        darkMode ? "dark" : ""
      } dark:bg-gray-600 dark:text-stone-300`}
      ref={modalRef}
      onClose={handleClose}
    >
      <div className="bg-white dark:bg-gray-600 rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl text-red-500 font-semibold mb-4 tracking-wide">
          Delete Confirmation
        </h2>
        <h3 className="text-base">Are you sure want to delete this?</h3>
        <p className='text-sm mt-1'>
          This action cannot be undone, and all associated data will be
          permanently removed.
        </p>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default DeleteConfirmationModal