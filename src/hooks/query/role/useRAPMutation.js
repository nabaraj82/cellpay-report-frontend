import { useMutation } from "@tanstack/react-query"
import { postApi } from "../../../api/postApi"
import { queryClient } from "../../../queryClient"
import { toast } from "react-toastify"


export const useRAPMutation = (queryKey, options = {}) => {
    return useMutation({
        mutationFn: (data) => postApi('/permission/remove/module', data),
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey);
            toast.success("Permissions updated successfully");
            if (options.onSuccess) options.onSuccess();
        },
        onError: (error) => {
            toast.error(JSON.stringify(error) || "Failed to update")
        }
    })
}