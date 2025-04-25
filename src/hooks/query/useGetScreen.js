import { useQuery } from "@tanstack/react-query";
import { getApi } from "../../api/getApi";

export const useGetScreen = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["screen"],
    queryFn: ({ signal }) => getApi("/screen", {}, signal),
  });
    return {data, isPending, isError, error}
};
