import * as yup from "yup";

const userFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  nameLocal: yup.string().required("Local Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be numbers only")
    .min(10, "Phone must be at least 10 digits")
    .required("Phone is required"),
});

export default userFormSchema;
