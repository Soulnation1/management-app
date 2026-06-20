"use client";
import { FcGoogle } from "react-icons/fc";


import Link from "next/link";
import { Check } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
    signUpSchema,
    type SignUpFormData,
} from "@/lib/validations/authSchema";

import { useState } from "react";
import { useRegister } from "@/hooks/register-hook/useRegister";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });
    const [showPassword, setShowPassword] = useState(false);


    const { mutate } = useRegister();
    const router = useRouter();

    const onSubmit = (data: SignUpFormData) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Registration successful");
                router.push("/login")
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message ||
                    "Registration failed"
                );
            },
        });
    };

    const firstName = watch("firstName");
    const lastName = watch("lastName");
    const email = watch("email");
    const password = watch("password");



    return (
        <div className="space-y-8">
            <div>
                <h1 className="mt-2 text-[32px] font-bold leading-none text-white">
                    Sign Up
                </h1>

                <p className="mt-2 mb-10 text-[16px] text-slate-400">
                    Enter your email and password to sign up!
                </p>
            </div>
            <div className="flex justify-center mt-4">
                <Link href="#" className="flex items-center justify-center gap-2 rounded-lg bg-[#1C2433] hover:bg-[#2C3444] transition-colors duration-300 text-white h-14 w-full"> <FcGoogle size={24} />   Sign In with Google</Link>

            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
                <div className="h-[0.5px] w-full bg-slate-700"></div>
                <div className="text-slate-400">or</div>
                <div className="h-[0.5px] w-full bg-slate-700"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="relative space-y-3">
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col mb-1 w-[48%]">
                            <label className="text-base text-[#6B8091] font-medium ">
                                First Name
                            </label>

                            <div className="relative">
                                <Input
                                    type="text"
                                    {...register("firstName")}
                                    className="h-12 border-slate-700 bg-transparent text-white pr-10"
                                />

                                {firstName && !errors.firstName && firstName.length >= 3 && (
                                    <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                                )}
                            </div>


                            {errors.firstName && (
                                <p className="text-sm text-red-500">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>


                        <div className="flex flex-col mb-1 w-[48%]">
                            <label className="text-base text-[#6B8091] font-medium ">
                                Last Name
                            </label>

                            <div className="relative">
                                <Input
                                    type="text"
                                    {...register("lastName")}
                                    className="h-12 border-slate-700 bg-transparent text-white pr-10"
                                />

                                {lastName && !errors.lastName && lastName.length >= 3 && (
                                    <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                                )}
                            </div>

                            {errors.lastName && (
                                <p className="text-sm text-red-500">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="relative space-y-3">
                    <label className="text-base text-[#6B8091] font-medium ">
                        Email address
                    </label>

                    <div className="relative">
                        <Input
                            type="email"
                            {...register("email")}
                            className="h-12 border-slate-700 bg-transparent text-white pr-10"
                        />

                        {email && !errors.email && (
                            <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                        )}
                    </div>

                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="relative space-y-3">
                    <label className="text-base text-[#6B8091] font-medium ">
                        Password
                    </label>

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
                                className="flex items-center justify-center text-slate-400 hover:text-white"
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
                        <p className="text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="flex w-full  gap-3 items-star">
                    <Checkbox id="terms" className="border border-[#1B2638] t" />
                    <label htmlFor="terms" className="text-sm text-[#6B8091] w-full">
                        <span ><label className="text-sm text-[#6B8091]">By creating an account means you agree to the <p className="text-sm text-white" >Terms and conditions</p><span className="">and our <p className="text-sm text-white">  privacy policy</p></span></label></span>
                    </label>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[48px] w-full bg-[#465FFF] text-lg font-semibold"
                >

                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>

                <p className="text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#465FFF] hover:text-blue-300">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
}