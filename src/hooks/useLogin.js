import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { logIn } from "../lib/api";

const useLogin = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: logIn,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    });
    return { error, isPending, loginMutation: mutate };
};

export default useLogin;
