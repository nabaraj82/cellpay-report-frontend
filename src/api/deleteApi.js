import api from "../config/axiosConfig";

export async function deleteApi(endpoint) {
  try {
    const response = await api({
      url: endpoint,
      method: "DELETE",
    });
    return response.data;
  } catch (error) {
    throw {
      ...error.response?.data,
    };
  }
}
