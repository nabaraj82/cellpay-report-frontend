import { useState, useCallback } from "react";

export const useShowModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsOpen(true);
  }, []); // No dependencies - function never changes

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []); // No dependencies - function never changes

  return { isOpen, showModal, closeModal };
};
