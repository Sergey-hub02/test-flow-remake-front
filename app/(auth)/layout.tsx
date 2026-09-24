import { ReactNode } from "react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { auth } from "@/app/auth"

type AuthLayoutProps = { children: ReactNode }

const AuthLayout = async ({ children }: AuthLayoutProps) => {
    const session = await auth()

    if (session) {
        redirect("/")
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-slate-700 shadow-lg shadow-slate-800/50 rounded-md py-5 px-6 w-full max-w-175 flex flex-col justify-center">
                <header className="text-center">
                    <Image
                        src="/test_flow_logo_128.png"
                        alt="Test Flow"
                        width={128}
                        height={128}
                        loading="eager"
                        className="m-auto"
                    />

                    <h1 className="mt-3 text-4xl text-shadow-lg text-shadow-slate-900 font-bold">Test Flow</h1>
                </header>

                {children}
            </div>
        </div>
    )
}

export default AuthLayout
