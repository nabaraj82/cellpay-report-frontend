import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { toast } from "react-toastify";
import { postApi } from "../../../api/postApi";

export const useAssignRoleMutation = (userId, options = {}) => {

  return useMutation({
    mutationFn: (body) => postApi("/user_role", body),
    onSuccess: () => {
      toast.success("Role assigned successfully");
      queryClient.invalidateQueries({
        queryKey: ["user_role/roles", userId, "unasigned"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_role/roles", userId, "asigned"],
      });
      if (options.onSuccess) options.onSuccess();
    },
      onError: (error) => {
        console.log("error: ", error)
      toast.error(JSON.stringify(error.message) || "Failed to assign role");
      if (options.onError) options.onError();
    },
  });
};
