import { useState } from "react";

export const useShowModal = () => {
     const [isOpen, setIsOpen] = useState(false);
          function showModal() {
            setIsOpen(true);
          }
          function closeModal() {
            setIsOpen(false);
          }
  return {isOpen, showModal, closeModal}
}
