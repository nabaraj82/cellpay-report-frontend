import { useQuery } from "@tanstack/react-query";
import { getApi } from "../../../api/getApi";

export const useGetAll = (queryKey, params={}, enabled = true) => {
  const { data, isFetching, isError, error } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getApi(queryKey[0], params, signal),
    staleTime: 20 * 1000,
    enabled,
  });
  return { data, isFetching, isError, error };
};
