import { useMutation } from "@tanstack/react-query";
import React from "react";
import { postApi } from "../../../api/postApi";
import { queryClient } from "../../../queryClient";
import { toast } from "react-toastify";

export const useRPSMutation = (queryKey, options = {}) => {
  return useMutation({
    mutationFn: (data) => postApi("/permission/remove/screen", data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      toast.success("Permission removed successfully");
      if (options.onSuccess) options.onSuccess();
    },
    onError: (error) => {
      toast.error(JSON.stringify(error.message) || "Failed to remove permission");
      if (options.onError) options.onError();
    },
  });
};
