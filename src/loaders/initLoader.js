import { getApi } from "../api/getApi";
import { queryClient } from "../queryClient";
import {
  setCurrentUSer,
  setErrors,
  setIsLoading,
} from "../redux/slices/userSlice";
import store from "../redux/store";

export async function initLoader() {
  store.dispatch(setIsLoading(true));
  try {
    const response = await queryClient.fetchQuery({
      queryKey: ["init"],
      queryFn: ({ signal }) => getApi("/init", {}, signal),
    });
      store.dispatch(setCurrentUSer(response));
      return response;
  } catch (error) {
      store.dispatch(setErrors(error));
  } finally {
      store.dispatch(setIsLoading(false));
      
  }
}
