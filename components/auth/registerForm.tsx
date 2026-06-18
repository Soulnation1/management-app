"use client";

import Link from "next/link";
import { UserPlus, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSignUp } from "@clerk/nextjs";

import {
    signUpSchema,
    type SignUpFormData,
} from "@/lib/validations/auth";

import { useSignUpMutation } from "@/hooks/useCreateUserProfile";

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
            fullName: "",
            email: "",
            password: "",
        },
    });

    const { signUp, isLoaded } = useSignUp();

    const { mutateAsync: signUpUser } = useSignUpMutation(signUp);

    const onSubmit = async (data: SignUpFormData) => {
        if (!isLoaded || !signUp) return;

        try {
            const result = await signUpUser(data);

            console.log("Signup result:", result);



        } catch (error: any) {
            console.error(error?.errors?.[0]?.message || error);
        }
    };

    const fullName = watch("fullName");
    const email = watch("email");
    const password = watch("password");

    return (
        <div className="space-y-8">
            <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
                    Secure Access
                </p>

                <h1 className="mt-2 text-xl font-bold text-white">
                    Register
                </h1>

                <p className="mt-2 text-lg text-slate-400">
                    Create your adminHMD account.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="relative space-y-3">
                    <label className="text-xl font-medium text-white">
                        Full name
                    </label>

                    <div className="relative">
                        <Input
                            type="text"
                            {...register("fullName")}
                            className="h-10 border-slate-700 bg-transparent text-white pr-10"
                        />

                        {fullName && !errors.fullName && fullName.length >= 3 && (
                            <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                        )}
                    </div>

                    {errors.fullName && (
                        <p className="text-sm text-red-500">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                <div className="relative space-y-3">
                    <label className="text-xl font-medium text-white">
                        Email address
                    </label>

                    <div className="relative">
                        <Input
                            type="email"
                            {...register("email")}
                            className="h-10 border-slate-700 bg-transparent text-white pr-10"
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
                    <label className="text-xl font-medium text-white">
                        Password
                    </label>

                    <div className="relative">
                        <Input
                            type="password"
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
                        <p className="text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Checkbox id="terms" />
                    <label htmlFor="terms" className="text-lg text-white">
                        I agree to the terms
                    </label>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[48px] w-full bg-[#69A3F0] text-lg font-semibold"
                >
                    <UserPlus className="mr-2 h-5 w-5" />

                    {isSubmitting ? "Creating..." : "Create Account"}
                </Button>

                <p className="text-center text-lg text-slate-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
}