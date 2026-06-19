

import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function AuthLayout({
    children,
}: Props) {
    return (
        <div className="min-h-screen bg-[#101828] flex items-center justify-center p-4 md:p-6">
            <div className="w-full max-w-[650px] overflow-hidden rounded-2xl bg-[#101828] ">


                <div className="px-6 py-2 pb-8 md:px-8">
                    {children}
                </div>
            </div>
        </div>
    );
}