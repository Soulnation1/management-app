"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSignIn } from "@clerk/nextjs";

import {
    forgotPasswordSchema,
    type ForgotPasswordFormData,
} from "@/lib/validations/auth";

export default function ForgotPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const { signIn, isLoaded } = useSignIn();

    const onSubmit = async (data: ForgotPasswordFormData) => {
        if (!isLoaded || !signIn) return;

        try {
            await signIn.create({
                strategy: "reset_password_email_code",
                identifier: data.email,
            });

            alert("Reset link sent to your email");
        } catch (error: any) {
            console.error(error?.errors?.[0]?.message || error);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
                    SECURE ACCESS
                </p>

                <h1 className="mt-2 text-3xl font-semibold text-white">
                    Forgot Password
                </h1>

                <p className="mt-2 text-lg text-[#436481]">
                    Get a reset link for your account.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-medium text-white">
                        Email address
                    </label>

                    <Input
                        type="email"
                        {...register("email")}
                        className="h-10 border-slate-700 bg-transparent text-white"
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
                    className="h-14 w-full bg-[#60A5FA] text-lg font-semibold hover:bg-[#2563eb]"
                >
                    <Mail />
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>

                <p className="text-md text-[#436481]">
                    Check your inbox and spam folder after submitting.
                </p>

                <p className="text-center text-lg text-slate-400">
                    Remember it?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300">
                        Back to Login
                    </Link>
                </p>
            </form>
        </div>
    );
}