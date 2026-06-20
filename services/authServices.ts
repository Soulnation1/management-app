import api from "@/lib/axios";
import { SignInFormData, SignUpFormData } from "@/lib/validations/authSchema";


//login
export const login = async (data: SignInFormData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

//register
export const register = async (data: SignUpFormData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};


//forgot password
export const forgotPassword = async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
};

//reset password
export const resetPassword = async (data: { password: string; token: string }) => {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
};