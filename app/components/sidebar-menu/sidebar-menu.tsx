"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, BookOpenIcon } from "@heroicons/react/24/outline"

const SidebarMenu = () => {
    const pathname = usePathname()

    return (
        <nav className="flex flex-col">
            <Link href="/" className={`${pathname === "/" ? "bg-slate-800" : ""} px-7 py-4 hover:bg-slate-800 active:bg-slate-800`}>
                <HomeIcon className="w-7 inline-block" />
                <span className="align-middle text-md leading-0">&nbsp;Профиль</span>
            </Link>

            <Link href="/courses" className={`${pathname === "/courses" ? "bg-slate-800" : ""} px-7 py-4 hover:bg-slate-800 active:bg-slate-800`}>
                <BookOpenIcon className="w-7 inline-block" />
                <span className="align-middle text-md leading-0">&nbsp;Курсы</span>
            </Link>
        </nav>
    )
}

export default SidebarMenu
