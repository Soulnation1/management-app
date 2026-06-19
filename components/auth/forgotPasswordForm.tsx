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

                    {isSubmitting ? "Sending..." : "Send Reset Link"}
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