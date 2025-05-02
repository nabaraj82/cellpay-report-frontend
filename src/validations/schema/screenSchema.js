import * as yup from "yup";
const screenSchema = yup.object().shape({
    name: yup.string().required('name is required'),
    code: yup.string().required("code is required"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters")
});

export default screenSchema;