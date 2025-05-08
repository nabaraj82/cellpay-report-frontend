import React, { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import { useValidateForm } from "@/validations/hooks/useValidateForm";
import passwordChangeSchema from "@/validations/schema/passwordChangeSchema";
import ButtonPrimary from "@/components/common/ButtonPrimary";

const initialFormState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const PasswordChangeForm = ({
  onSubmit,
  isLoading = false,
  initialValues = initialFormState,
  onCancel,
  title = "Change Password",
  submitButtonText = "Save",
  resetTrigger,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    passwordChangeSchema
  );

  useEffect(() => {
    setFormData(initialFormState);
    setErrors({});
  }, [resetTrigger]);

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
    if (isValid) {
      onSubmit(formData);
    }
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center shadow-sm my-10 px-8 mx-auto border dark:bg-gray-600 border-gray-200 rounded-md py-6">
      <h3 className="tracking-wider text-lg">{title}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <Input
          label="Old Password"
          type="password" 
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          error={errors["oldPassword"]}
        />
        <Input
          label="New Password"
          type="password" 
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors["newPassword"]}
        />
        <Input
          label="Confirm New Password"
          type="password" 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors["confirmPassword"]}
        />
        <div className="flex gap-2">
          {onCancel && (
            <ButtonPrimary type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </ButtonPrimary>
          )}
          <ButtonPrimary type="submit" disabled={isLoading}>
            {submitButtonText}
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
