"use client"

import { SessionProvider } from "next-auth/react"
import { useState, PropsWithChildren } from "react"

import Header from "@/app/components/header/header"
import SidebarMenu from "@/app/components/sidebar-menu/sidebar-menu"
import MobileMenu from "@/app/components/mobile-menu/mobile-menu"

const MainLayoutFrame = ({ children }: PropsWithChildren) => {
    const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false)

    return (
        <SessionProvider>
            <Header onMenuClick={() => setMobileMenuOpened(!mobileMenuOpened)} />

            <div className="flex flex-1 overflow-hidden relative">
                <aside className="basis-1/5 border-r border-r-zinc-200 h-full overflow-y-auto lg:block hidden">
                    <SidebarMenu />
                </aside>

                <MobileMenu show={mobileMenuOpened} close={() => setMobileMenuOpened(false)} />

                <main className="lg:basis-4/5 basis-5/5 h-full p-5">
                    <div className="bg-slate-800 py-4 px-7 rounded-md h-full overflow-y-auto">
                        {children}
                    </div>
                </main>
            </div>
        </SessionProvider>
    )
}

export default MainLayoutFrame
