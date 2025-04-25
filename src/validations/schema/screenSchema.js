import * as yup from "yup";
const screenSchema = yup.object().shape({
    name: yup.string().required('Screen name is required'),
    code: yup.string().required("Screen code is required"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters")
});

export default screenSchema;