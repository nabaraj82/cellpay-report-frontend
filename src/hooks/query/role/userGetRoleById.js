import { useQuery } from "@tanstack/react-query"
import { getApi } from "../../../api/getApi"

export const useGetRoleById = (id) => {
    return useQuery({
        queryKey: ['role', id],
        queryFn: ({ signal }) => getApi(`/permission/role/${id}`, {}, signal),
        enabled: !!id, 
        staleTime: 2 * 1000 * 60
    });
}