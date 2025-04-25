import { useState } from "react";

export const useValidateForm = (formData, schema) => {
  const [errors, setErrors] = useState({});

  const validateForm = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};

      err.inner.forEach((error) => {
        // Split the path into parts
        const pathParts = error.path.split(".");

        // Initialize nested structure
        let currentLevel = newErrors;

        pathParts.forEach((part, index) => {
          if (!currentLevel[part]) {
            // If we're at the last part, assign the message
            if (index === pathParts.length - 1) {
              currentLevel[part] = error.message;
            } else {
              // Otherwise create a nested object
              currentLevel[part] = {};
            }
          }
          currentLevel = currentLevel[part];
        });
      });

      setErrors(newErrors);
      return false;
    }
  };

  return { errors, setErrors, validateForm };
};
