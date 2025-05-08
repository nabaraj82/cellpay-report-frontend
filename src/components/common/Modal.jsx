import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import ButtonSecondary from "./ButtonSecondary";

const Modal = ({ title, children, isOpen, onClose, isCloseButton }) => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close modal when clicking on backdrop
  // const handleBackdropClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     onClose();
  //   }
  // };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      // onClick={handleBackdropClick}
    >
      <div
        className={`relative rounded-xl shadow-lg w-auto  max-h-[90vh] overflow-y-auto ${
          darkMode ? "dark" : ""
        } bg-white dark:bg-gray-600 dark:text-stone-300 p-6`}
      >
        {isCloseButton ? (
          <div className="flex w-full justify-between items-center mb-4">
            <h2 className="text-xl text-center font-semibold">{title}</h2>
            <ButtonSecondary type="button" onClick={onClose}>
              X
            </ButtonSecondary>
          </div>
        ) : (
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        )}

        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
