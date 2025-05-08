import { useMutation } from "@tanstack/react-query";
import { putApi } from "../../../api/putApi";
import { queryClient } from "../../../queryClient";
import { toast } from "react-toastify";

export const useUpdateMutation = (queryKey, options = {}) => {
  return useMutation({
    mutationFn: (data) => putApi(queryKey[0], data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      toast.success(`${queryKey[0]} updated successfully`)
      if (options.onSuccess) options.onSuccess();
    },
    onError: (error) => {
      toast.error(JSON.stringify(error.message) || "Failed to update");
      if (options.onError) options.onError();
    },
  });
};
