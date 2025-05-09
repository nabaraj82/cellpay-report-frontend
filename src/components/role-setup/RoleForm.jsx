import React, { useEffect, useState, useCallback } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import ButtonSecondary from "@/components/common/ButtonSecondary";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import { useCreateMutation } from "@/hooks/query/common/useCreateMutation";
import { useUpdateMutation } from "@/hooks/query/common/useUpdateMutation";
import { useValidateForm } from "@/validations/hooks/useValidateForm";
import roleSchema from "@/validations/schema/roleSchema";

const initialFormState = {
  id: "",
  code: "",
  name: "",
  description: "",
  isActive: true,
};

const RoleForm = ({ editingRole, onCloseModal }) => {
  const [formData, setFormData] = useState(initialFormState);
  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    roleSchema
  );

  const createMutation = useCreateMutation(["role"], {
    onSuccess: onCloseModal,
  });
  const updateMutation = useUpdateMutation(["role"], {
    onSuccess: onCloseModal,
  });

  const isSubmitting = createMutation.isLoading || updateMutation.isLoading;

  useEffect(() => {
    if (editingRole) {
      setFormData((prev) => ({
        ...prev,
        ...editingRole,
      }));
    }
  }, [editingRole]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setErrors((prevErrors) => {
        if (prevErrors[name]) {
          const { [name]: _, ...rest } = prevErrors;
          return rest;
        }
        return prevErrors;
      });

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setErrors]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (!isValid) return;

    const mutation = editingRole ? updateMutation : createMutation;
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
      <Input
        id="code"
        label="Role Code"
        type="text"
        name="code"
        value={formData.code}
        onChange={handleChange}
        error={errors.code}
      />
      <Input
        id="name"
        label="Role Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextArea
        id="description"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
      />
      <div className="flex justify-end gap-8">
        <ButtonSecondary
          type="button"
          onClick={onCloseModal}
          disabled={isSubmitting}
        >
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default RoleForm;
