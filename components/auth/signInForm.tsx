"use client";
import { LogIn, Check } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";

import Link from "next/link";


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

            <h1 className="mt-2 text-[32px] font-bold leading-none text-white">
                Sign In
            </h1>

            <p className="mt-2 mb-10 text-[16px] text-slate-400">
                Enter your email and password to sign in!
            </p>
            <div className="flex justify-between gap-8 mt-4">
                <Link href="#" className="flex items-center justify-center gap-2 rounded-lg bg-[#1C2433] hover:bg-[#2C3444] transition-colors duration-300 text-white h-14 w-full"> <FcGoogle size={24} />   Sign In with Google</Link>
                <Link href="#" className="flex items-center justify-center gap-2 rounded-lg bg-[#1C2433] hover:bg-[#2C3444] transition-colors duration-300 text-white h-14 w-full"><FaXTwitter size={24} /> Sign In with X</Link>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
                <div className="h-[0.5px] w-full bg-slate-700"></div>
                <div className="text-slate-400">or</div>
                <div className="h-[0.5px] w-full bg-slate-700"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-7">

                <div>
                    <label className="mb-1 block text-base font-medium text-white">
                        Email
                    </label>
                    <div className="relative">
                        <div className="relative">
                            <Input
                                type="text"
                                {...register("email")}
                                className="h-12 border-slate-700 bg-transparent text-white pr-10 placeholder:text-[#3D4452] placeholder:text-[16px] "
                                placeholder="info@gmail.com"
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
                    <div className="mb-1 flex items-center justify-between">
                        <label className="text-base font-medium text-white">
                            Password
                        </label>


                    </div>

                    <div className="relative">
                        <Input
                            type="text"
                            {...register("password")}
                            className="h-12 border-slate-700 bg-transparent text-white pr-10 placeholder:text-[#3D4452] placeholder:text-[16px] "
                            placeholder="Enter your password"
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

                <div className="flex justify-between gap-3">

                    <label htmlFor="remember" className="flex items-center gap-2 text-[16px] text-white">
                        <Checkbox id="remember" className="border border-[#1B2638]" /> Keep me logged in
                    </label>
                    <Link
                        href="/forgot-password"
                        className="font-medium text-[#3759AB]"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[48px] w-full bg-[#465FFF] text-lg font-semibold hover:bg-[#2533df]"
                >


                    {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>

                <p className=" text-[16px] text-slate-400">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-[#5EA1FF]">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}