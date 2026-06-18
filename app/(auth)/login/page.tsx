
import SignInForm from "@/components/auth/signInForm";
import AuthLayout from "../AuthLayout";

export default function LoginPage() {
    return (
        <AuthLayout>
            <SignInForm />
        </AuthLayout>
    );
}