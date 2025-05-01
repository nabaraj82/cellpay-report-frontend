import { useMutation } from "@tanstack/react-query";
import { postApi } from "../../../api/postApi";
import { queryClient } from "../../../queryClient";
import { toast } from "react-toastify";

const usePermissionUpdateMutation = (queryKey, endpoint, options = {}) => {
  return useMutation({
    mutationFn: (data) => postApi(endpoint, data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      toast.success("Privilege updated successfully");
      if (options.onSuccess) options.onSuccess();
    },
    onError: (error) => {
      toast.error(JSON.stringify(error) || "Faild to update");
      if (options.onError) options.onError();
    },
  });
};

export default usePermissionUpdateMutation;
