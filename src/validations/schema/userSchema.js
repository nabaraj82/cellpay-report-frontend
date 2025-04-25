import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  nameLocal: yup.string().required("Local Name is required"),
  code: yup.string().required("Code is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be numbers only")
    .min(10, "Phone must be at least 10 digits")
    .required("Phone is required"),
  roles: yup
    .array()
    .of(yup.number().required())
    .required("Role is required")
    .min(1, "Please select at least one role")
    .required("At least one role is required"),
});

export default userSchema;
