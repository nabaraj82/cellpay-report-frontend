import { useMutation } from "@tanstack/react-query"
import { postApi } from "../../../api/postApi"
import { toast } from "react-toastify"
import { queryClient } from "../../../queryClient"


export const useRemoveUserRoleMutation = (options={}) => {
    return useMutation({
        mutationFn: (body) => postApi('/user_role/remove', body),
        onSuccess: () => {
            toast.success('removed user successfully');
            queryClient.invalidateQueries(["user_role/user"]);
            if (options.onSuccess) options.onSuccess();
        },
        onError: (error) => {
            toast.error(JSON.stringify(error) || "failed to remove user");
            if (options.onError) options.onError();
        }
    })
}