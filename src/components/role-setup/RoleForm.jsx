import ButtonPrimary from "@/components/common/ButtonPrimary";
import ButtonSecondary from "@/components/common/ButtonSecondary";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import { useCreateMutation } from "@/hooks/query/common/useCreateMutation";
import { useUpdateMutation } from "@/hooks/query/common/useUpdateMutation";
import { useValidateForm } from "@/validations/hooks/useValidateForm";
import roleSchema from "@/validations/schema/roleSchema";
import React, { useEffect, useState } from "react";

const initialFormState = {
  id: "",
  code: "",
  name: "",
  description: "",
  isActive: true,
};

const RoleForm = ({ editingRole, onCloseModal }) => {
  const [formData, setFormData] = useState(initialFormState);

  const updateMutation = useUpdateMutation(["role"], {
    onSuccess: () => {
      onCloseModal();
    },
  });

  const createMutation = useCreateMutation(["role"], {
    onSuccess: () => {
      onCloseModal();
    },
  });

  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    roleSchema
  );
  useEffect(() => {
    if (editingRole) {
      setFormData({
        id: editingRole.id,
        code: editingRole.code,
        name: editingRole.name,
        description: editingRole.description,
        isActive: editingRole.isActive,
      });
    }
  }, [editingRole]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = await validateForm();
    console.log(isValid);
    if (isValid) {
      if (editingRole) {
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
        label="Role Code"
        type="text"
        value={formData.code}
        onChange={handleChange}
        name="code"
        error={errors["code"]}
      />
      <Input
        id="name"
        label="Role Name"
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
        <ButtonSecondary type="button" onClick={onCloseModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default RoleForm;
