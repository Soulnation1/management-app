"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
    forgotPasswordSchema,
    type ForgotPasswordFormData,
} from "@/lib/validations/authSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "@/hooks/forgot-password-hook/useForgotPassword";

export default function ForgotPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isPending },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const router = useRouter();

    const { mutate } = useForgotPassword();

    const onSubmit = (data: ForgotPasswordFormData) => {
        mutate(data.email, {
            onSuccess: () => {
                toast.success("Reset link sent successfully");
                router.push("/login");
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message ||
                    "Failed to send reset link"
                );
            },
        });
    };

    return (
        <div className="space-y-8 w-[80%]">
            <div>

                <h1 className="mt-2 text-4xl font-semibold text-white">
                    Forgot Your Password?
                </h1>

                <p className="mt-2 text-md text-slate-400">
                    Enter the email address linked to your account, and we’ll send you a link to reset your password.                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#6B8091]">
                        Email address
                    </label>

                    <Input
                        type="email"
                        {...register("email")}
                        className="h-10 border-slate-700 bg-transparent text-white"
                        placeholder="Enter your email"
                    />

                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>


                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 w-full bg-[#465FFF] text-lg font-semibold hover:bg-[#2563eb]"
                >

                    {isPending ? "Sending..." : "Send Reset Link"}
                </Button>



                <p className="text-start text-md text-slate-400">
                    Wait, I remember my password...{" "}
                    <Link href="/login" className="text-[#213C90] text-lg">
                        Click here
                    </Link>
                </p>
            </form>
        </div>
    );
}