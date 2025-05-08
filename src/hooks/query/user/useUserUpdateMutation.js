import { useMutation } from "@tanstack/react-query";
import { postApi } from "../../../api/postApi";
import { toast } from "react-toastify";
import { queryClient } from "../../../queryClient";
import { putApi } from "../../../api/putApi";

export const useUserUpdateMutation = (queryKey, options = {}) => {
  return useMutation({
    mutationFn: (body) => putApi(queryKey[0], body),
    onSuccess: () => {
      queryClient.invalidateQueries(["/user/paginated"]);
      toast.success(`user updated successfully`);
      if (options.onSuccess) options.onSuccess();
    },
    onError: (error) => {
      console.log(error);
      toast.error(JSON.stringify(error.message) || "Failed to update user");
      if (options.onError) options.onError();
    },
  });
};
