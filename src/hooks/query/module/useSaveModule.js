import { useMutation } from "@tanstack/react-query"
import { postApi } from "../../../api/postApi"
const useSaveModule = () => {
    return useMutation({
        mutationKey: ['save_module'],
        mutationFn: (requestBody) => postApi('/module', requestBody),
  })
}

