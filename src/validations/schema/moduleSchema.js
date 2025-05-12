import * as yup from "yup";

export const moduleSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, "minimum 3 characters required").max(20, "maximum 20 characters allowed"),
    code: yup.string().required("Code is required").min(3, "minimum 3 characters required").max(10, "maximum 10 characters are allowed"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 20 characters").max(50, 'maximum 50 characters allowed'),
    screenId: yup.string().required('Screen is required')
});

const endpointSchema = yup.object().shape({
  url: yup
    .string()
    .required("Endpoint URL is required")
    .matches(
      /^\/[a-zA-Z0-9\/{}]*$/,
      "Endpoint must start with / and contain only letters, numbers, and slashes"
    ),
  method: yup
    .string()
    .required("HTTP Method is required")
    .oneOf(
      ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      "Invalid HTTP method"
    ),
});

const privilegeSchema = yup.object().shape({
  privilegeId: yup
    .number()
    .required("Privilege selection is required")
    .positive("Invalid privilege ID"),
  endPoints: yup
    .array()
    .of(endpointSchema)
    .min(1, "At least one endpoint is required")
    .max(10, "Maximum 10 endpoints per privilege"),
});

export const privilegesValidationSchema = yup
  .array()
  .of(privilegeSchema)
  .min(1, "At least one privilege is required");