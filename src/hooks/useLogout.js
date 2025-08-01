import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../lib/api";

const useLogout = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: logOut,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    });
    return { logoutMutation:mutate };
};

export default useLogout;
