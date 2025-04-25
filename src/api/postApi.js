
import api from '../config/axiosConfig'

export async function postApi(endpoint, body) {
  try {
    const response = await api({
      url: endpoint,
      method: "POST",
      data: body,
    });
      return response.data
  } catch (error) {
   throw {
     ...error.response?.data,
   };
  }
}

