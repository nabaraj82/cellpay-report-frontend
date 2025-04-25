import * as yup from "yup";

const roleSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    code: yup.string().required("Code is required"),
    description: yup.string().required("Description is required").min(20, "Description must be at least 20 characters")
});

export default roleSchema;
