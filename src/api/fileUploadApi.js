import api from "@/config/axiosConfig";

export async function fileUploadApi(endpoint, body) {
  try {
    const response = await api({
      url: endpoint,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data", 
      },
      data: body,
    });
    return response.data;
  } catch (error) {
    throw {
      ...error.response?.data,
    };
  }
}
