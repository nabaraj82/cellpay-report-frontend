import { useMutation } from "@tanstack/react-query";
import { deleteApi } from "../../../api/deleteApi";
import { queryClient } from "../../../queryClient";
import { toast } from "react-toastify";

export const useDeleteMutation = (queryKey, options = {}) => {
  return useMutation({
    mutationFn: (id) => deleteApi(`${queryKey[0]}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      toast.success(`${queryKey[0]} deleted successfully`);
      if (options.onSuccess) options.onSuccess();
    },
    onError: (error) => {
      toast.error(JSON.stringify(error.message) || "Failed to delete");
      if (options.onError) options.onError();
    },
  });
};
