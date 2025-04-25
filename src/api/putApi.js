import api from "../config/axiosConfig";


export async function putApi(endpoint, body) {
    try {
      const response = await api({
        url: endpoint,
        method: "PUT",
        data: body,
      });
      return response.data;
    } catch (error) {
      throw {
        ...error.response?.data,
      };
    }
}