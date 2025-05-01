import * as yup from "yup";

export const assignRoleValidationSchema = yup.object().shape({
  roleId: yup
    .string()
    .required("Role is required") // Ensures a user is selected
    .trim(),

  effectiveFrom: yup
    .date()
    .required("Effective From date is required") // Must be a valid date
    .typeError("Please enter a valid date"), // Custom error for invalid dates

  effectiveTo: yup
    .mixed()
    .nullable()
    .test(
      "is-after-effectiveFrom",
      "Effective To must be after Effective From",
      function (value) {
        // If value is null/undefined, it's valid
        if (!value) return true;

        // Compare dates only if both exist
        const effectiveFrom = this.parent.effectiveFrom;
        if (!effectiveFrom) return true; // or false if you want to require effectiveFrom first

        return new Date(value) > new Date(effectiveFrom);
      }
    )
    .typeError("Please enter a valid date"),
});
