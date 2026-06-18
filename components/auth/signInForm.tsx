"use client";

import Link from "next/link";
import { LogIn, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSignIn, useAuth } from "@clerk/nextjs";

import {
    signInSchema,
    type SignInFormData,
} from "@/lib/validations/auth";

export default function SignInForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { signIn, setActive } = useSignIn();
    const { isLoaded } = useAuth();

    const onSubmit = async (data: SignInFormData) => {
        if (!isLoaded || !signIn) return;

        try {
            const result = await signIn.create({
                identifier: data.email,
                password: data.password,
            });

            if (result.status === "complete") {
                await setActive({
                    session: result.createdSessionId,
                });
            }
        } catch (error: any) {
            console.error(error?.errors?.[0]?.message || error);
        }
    };

    const password = watch("password");
    const email = watch("email");
    return (
        <div>
            <p className="text-md font-bold uppercase tracking-wider text-[#5EA1FF]">
                SECURE ACCESS
            </p>

            <h1 className="mt-2 text-[28px] font-bold leading-none text-white">
                Login
            </h1>

            <p className="mt-3 text-[18px] text-slate-400">
                Sign in to your admin workspace.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-7">

                <div>
                    <label className="mb-3 block text-base font-medium text-white">
                        Email address
                    </label>
                    <div className="relative">
                        <div className="relative">
                            <Input
                                type="text"
                                {...register("email")}
                                className="h-10 border-slate-700 bg-transparent text-white pr-10"
                            />

                            {email && !errors.email && email.includes('@') && (
                                <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                            )}
                        </div>

                        {errors.email && (
                            <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                        )}
                    </div>

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>


                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <label className="text-base font-medium text-white">
                            Password
                        </label>

                        <Link
                            href="/forgot-password"
                            className="font-medium text-[#5EA1FF]"
                        >
                            Forgot?
                        </Link>
                    </div>

                    <div className="relative">
                        <Input
                            type="text"
                            {...register("password")}
                            className="h-10 border-slate-700 bg-transparent text-white pr-10"
                        />

                        {password &&
                            !errors.password &&
                            password.length >= 8 && (
                                <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                            )}
                    </div>

                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className="text-[16px] text-white">
                        Remember me
                    </label>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[48px] w-full bg-[#69A3F0] text-lg font-semibold"
                >
                    <LogIn className="mr-1 h-5 w-5" />

                    {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>

                <p className="text-center text-[16px] text-slate-400">
                    New here?{" "}
                    <Link href="/register" className="text-[#5EA1FF]">
                        Create an account
                    </Link>
                </p>
            </form>
        </div>
    );
}