import React, { useState } from "react";
import { useShowModal } from "../../hooks/useShowModal";
import Modal from "../common/Modal";
import ButtonSecondary from "../common/ButtonSecondary";
import ButtonPrimary from "../common/ButtonPrimary";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import SearchInput from "../common/SearchInput";
import { useValidateForm } from "../../validations/hooks/useValidateForm";
import screenSchema from "../../validations/schema/screenSchema";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "../../api/postApi";
import { queryClient } from "../../queryClient";
import { toast } from "react-toastify";
import Toast from "../common/Toast";
import Form from './Form';

const initialFormData = {
  code: "",
  name: "",
  description: "",
};
const Header = ({ searchTerm, onChange }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { isOpen, showModal, closeModal } = useShowModal();
  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    screenSchema
  );

  const mutation = useMutation({
    mutationFn: (data) => postApi("/screen", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["screen"]);
      closeModal();
      setFormData(initialFormData);
      toast.success("Screen created successfully!");
    },
    onError: (error) => {
      closeModal();
      toast.error(JSON.stringify(error));
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prevState) => {
        const newState = { ...prevState };
        delete newState[name];
        return newState;
      });
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      mutation.mutate(formData);
    }
  }

  return (
    <>
      <Toast />
      <Modal title="Add Screen" isOpen={isOpen} onClose={closeModal}>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          closeModal={closeModal}
          errors={errors}
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
