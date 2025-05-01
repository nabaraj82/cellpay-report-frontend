import { useMutation } from "@tanstack/react-query";
import { postApi } from "../../../api/postApi";
import { queryClient } from "../../../queryClient";
import { toast } from "react-toastify";

export const useCreateMutation = (queryKey, options = {}) => {
  return useMutation({
    mutationFn: (data) => postApi(queryKey[0], data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      toast.success(`${queryKey[0]} created successfully`);
      if (options.onSuccess) options.onSuccess();
    },
    onError: (error) => {
      toast.error(JSON.stringify(error) || "Failed to create");
      if (options.onError) options.onError();
    },
  });
};
