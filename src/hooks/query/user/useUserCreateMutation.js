import { useMutation } from "@tanstack/react-query";
import { postApi } from "../../../api/postApi";
import { toast } from "react-toastify";
import { queryClient } from "../../../queryClient";

export const useUserCreateMutation = (queryKey, options = {}) => {
  return useMutation({
    mutationFn: (data) => postApi(queryKey[0], data),
    onSuccess: () => {
      queryClient.invalidateQueries(["/user/paginated"]);
      toast.success(`user created successfully`);
      if (options.onSuccess) options.onSuccess();
    },
      onError: (error) => {
        console.log(error)
      toast.error(JSON.stringify(error.message) || "Failed to create user");
      if (options.onError) options.onError();
    },
  });
};