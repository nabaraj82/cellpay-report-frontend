import React, { useState } from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import ButtonSecondary from "../common/ButtonSecondary";
import ButtonPrimary from "../common/ButtonPrimary";
import { useValidateForm } from "../../validations/hooks/useValidateForm";
import screenSchema from "../../validations/schema/screenSchema";
import { useCreateMutation } from "../../hooks/query/common/useCreateMutation";
import { useUpdateMutation } from "../../hooks/query/common/useUpdateMutation";

const initialFormData = {
  id: "",
  code: "",
  name: "",
  description: "",
};

const Form = ({ closeModal, editingData }) => {
  const [formData, setFormData] = useState(editingData || initialFormData);

  
    const createMutation = useCreateMutation(["privilege"], {
      onSuccess: () => {
        closeModal();
        setFormData(initialFormData);
      },
      onError: () => {
        closeModal();
      },
    });
    const updateMutation = useUpdateMutation(["privilege"], {
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        closeModal();
      },
    });
  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    screenSchema
  );

   function handleChange(e) {
     const { name, value } = e.target;
     if (errors[name]) {
       setErrors((prevState) => {
         const newErrorObj = { ...prevState };
         delete newErrorObj[name];
         return newErrorObj;
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
      if (editingData) {
        updateMutation.mutate(formData);
      } else {
        createMutation.mutate(formData);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
      <Input
        id="code"
        label="Privilege Code"
        type="text"
        value={formData.code}
        onChange={handleChange}
        name="code"
        error={errors["code"]}
      />
      <Input
        id="name"
        label="Privilege Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        name="name"
        error={errors["name"]}
      />
      <TextArea
        id="description"
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        name="description"
        error={errors["description"]}
      />
      <div className="flex gap-8 justify-end">
        <ButtonSecondary type="button" onClick={closeModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default Form;
