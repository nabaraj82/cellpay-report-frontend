import * as yup from "yup";

const passwordChangeSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("current password is required")
    .min(6, "current password must be at least 6 characters"),
  newPassword: yup
    .string()
    .required("new password is required")
    .min(6, "current password must be at least 6 characters")
    .notOneOf(
      [yup.ref("oldPassword"), null],
      "new password must be different from current password"
    ),
  confirmPassword: yup
    .string()
    .required("please confirm your new password")
    .oneOf([yup.ref("newPassword"), null], "passwords must match"),
});

export default passwordChangeSchema;
