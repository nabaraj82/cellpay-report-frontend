import * as yup from "yup";

export const assignUserValidationSchema = yup.object().shape({
  userId: yup
    .string()
    .required("User is required") // Ensures a user is selected
    .trim(),

  effectiveFrom: yup
    .date()
    .required("Effective From date is required") // Must be a valid date
    .typeError("Please enter a valid date"), // Custom error for invalid dates

  effectiveTo: yup
    .date()
    .min(
      yup.ref("effectiveFrom"), // Ensures `effectiveTo` is after `effectiveFrom`
      "Effective To must be after Effective From"
    )
    .typeError("Please enter a valid date"),
});
