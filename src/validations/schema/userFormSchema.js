import * as yup from "yup";

const userFormSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "minium 3 characters required").max(20, "maximum 20 characters allowed"),
  nameLocal: yup.string().required("Local Name is required").min(3, "minium 3 charactes required").max(20, "maximum 20 characters allowed"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be numbers only")
    .min(10, "Phone must be at least 10 digits")
    .max(10, "invalid phone number")
    .required("Phone is required"),
});

export default userFormSchema;
