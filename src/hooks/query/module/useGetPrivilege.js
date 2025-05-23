import { useQuery } from "@tanstack/react-query";
import { getApi } from "../../../api/getApi";

export const useGetPrivilege = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["privilege"],
    queryFn: ({ signal }) => getApi("/privilege", {}, signal),
    staleTime: 2*10000
  });
  return { data, isPending, isError, error };
};
