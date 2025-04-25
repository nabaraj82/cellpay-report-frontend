import api from "../config/axiosConfig";

export async function getApi(endpoint, params = {}, signal=null) {
  try {
      const response = await api({
        url: endpoint,
        method: "GET",
        params,
        signal
      });
    return response.data.data;
  } catch (error) {
    throw {
         ...error.response?.data 
    }
  }
}
