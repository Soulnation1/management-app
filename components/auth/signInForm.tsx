"use client";
import { Check } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/login-hook/useLogin";

import {
    signInSchema,
    type SignInFormData,
} from "@/lib/validations/authSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {

    const router = useRouter();
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

    const { mutate } = useLogin();

    const onSubmit = (data: SignInFormData) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Login successful");
                router.push("/dashboard");
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message ||
                    "Login failed"
                );
            },
        });
    };
    const password = watch("password");
    const email = watch("email");
    const [showPassword, setShowPassword] = useState(false);
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
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            className="h-12 border-slate-700 bg-transparent pr-16 text-white"
                        />

                        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                            {password &&
                                !errors.password &&
                                password.length >= 8 && (
                                    <Check className="h-5 w-5 text-green-500" />
                                )}

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="flex items-center justify-center text-black hover:text-slate-700 transition duration-300"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
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