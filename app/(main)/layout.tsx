import { redirect } from "next/navigation"
import { ReactNode } from "react"

import MainLayoutFrame from "@/app/components/main-layout-frame/main-layout-frame"
import { auth } from "@/app/auth"

type MainLayoutProps = { children: ReactNode }

const MainLayout = async ({ children }: MainLayoutProps) => {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <MainLayoutFrame>{children}</MainLayoutFrame>
        </div>
    )
}

export default MainLayout
