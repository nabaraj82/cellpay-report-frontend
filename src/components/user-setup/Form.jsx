import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import ButtonSecondary from "../common/ButtonSecondary";
import ButtonPrimary from "../common/ButtonPrimary";
import { useValidateForm } from "../../validations/hooks/useValidateForm";
import userFormSchema from "../../validations/schema/userFormSchema";
import { useUserCreateMutation } from "../../hooks/query/user/useUserCreateMutation";
import { useUserUpdateMutation } from "../../hooks/query/user/useUserUpdateMutation";

const initialFormData = {
  name: "",
  nameLocal: "",
  mobileNumber: "",
  email: "",
};
const Form = ({ editingUser, closeModal }) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const userCreateMutation = useUserCreateMutation(["user"], {
    onSuccess: () => {
      closeModal();
    },
  });

  const userUpdateMutation = useUserUpdateMutation(['user'], {
    onSuccess: () =>{
      handleCloseModal();
    }
  })

  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    userFormSchema
  );

  function handleChange(e) {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prevState) => {
        const newErrors = { ...prevState };
        delete newErrors[name];
        return newErrors;
      });
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleCloseModal() {
    if (editingUser) {
      setErrors({});
    }
    closeModal();
  }
    async function handleSubmit(e) {
      e.preventDefault();
      const isValid = await validateForm();
      if (isValid) {
        if (editingUser) {
          userUpdateMutation.mutate(formData);
        } else {
          userCreateMutation.mutate(formData);
        }
        console.log(formData);
      }
    }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="FullName"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors["name"]}
      />
      <Input
        label="Local Name"
        name="nameLocal"
        value={formData.nameLocal}
        onChange={handleChange}
        error={errors["nameLocal"]}
      />
      <Input
        label="Contact Number"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        error={errors["mobileNumber"]}
      />
      <Input
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors["email"]}
      />

      <div className="flex gap-8 justify-end">
        <ButtonSecondary type="button" onClick={handleCloseModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default Form;
