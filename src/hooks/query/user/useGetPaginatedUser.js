import { useQuery } from "@tanstack/react-query";
import { postApi } from "../../../api/postApi";
import { toast } from "react-toastify";

export const useGetPaginatedUser = (queryKey, options = {}) => {
  const paginationParams = queryKey[1] || {};

  return useQuery({
    queryKey, 
    queryFn: () => postApi("/user/paginated", paginationParams),
    keepPreviousData: true, 
    ...options,
    onSuccess: (data) => {
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to fetch users");
      if (options.onError) options.onError(error);
    },
    staleTime: 2*10000
  });
};
