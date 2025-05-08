import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "../../../api/postApi";
import { toast } from "react-toastify";

export const useAssignRoleMutation = (roleId, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => postApi("/user_role", body),
    onSuccess: () => {
      toast.success("Role assigned successfully");
      queryClient.invalidateQueries({
        queryKey: ["user_role/users", roleId, "unasigned"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_role/users", roleId, "asigned"],
      });
      queryClient.invalidateQueries(['role']);
      if (options.onSuccess) options.onSuccess();
    },
    onError: (error) => {
      toast.error(JSON.stringify(error.message) || "Failed to assign role");
      if (options.onError) options.onError();
    },
  });
};
