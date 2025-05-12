import * as yup from "yup";
const screenSchema = yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .min(3, "minimum 3 characters required")
    .max(20, "maximum 20 characters allowed"),
  code: yup
    .string()
    .required("code is required")
    .min(3, "min 3 characters required")
    .max(10, "maximum 10 characters allowed"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(50, "maximum 50 characters allowed"),
});

export default screenSchema;
