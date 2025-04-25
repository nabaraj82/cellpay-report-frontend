import { useQuery } from "@tanstack/react-query";
import { getApi } from "../../../api/getApi";

export const useGetModuleById = (moduleId) => {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["module", moduleId],
    queryFn: ({ signal }) => getApi(`/module/${moduleId}`, {}, signal),
    enabled: !!moduleId,
  });

  return { data, isFetching, isError, error };
};
