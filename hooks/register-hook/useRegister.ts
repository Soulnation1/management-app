import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/authServices";


export const useRegister = () => {
    return useMutation({
        mutationFn: register,
    });
};