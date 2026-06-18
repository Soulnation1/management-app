import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = (signUp: any) => {
    return useMutation({
        mutationFn: async (data: SignUpFormData) => {
            const result = await signUp.create({
                emailAddress: data.email,
                password: data.password,
                firstName: data.fullName,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            return result;
        },
    });
};