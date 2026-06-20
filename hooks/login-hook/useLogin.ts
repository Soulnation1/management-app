import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/authServices";

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
};