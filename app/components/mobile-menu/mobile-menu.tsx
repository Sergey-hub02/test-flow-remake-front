"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpenIcon, HomeIcon } from "@heroicons/react/24/outline"

interface MobileMenuProps {
    show: boolean,
    close: () => void,
}

const MobileMenu = ({ show, close }: MobileMenuProps) => {
    const pathname = usePathname()

    if (!show) {
        return null
    }

    return (
        <>
            <div
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={close}
            />

            <aside className={`absolute lg:w-0 w-full max-w-sm transition-[width] z-50 bg-slate-900 h-full overflow-y-auto`}>
                <nav className="flex flex-col">
                    <Link href="/" className={`${pathname === "/" ? "bg-slate-800" : ""} px-7 py-4 hover:bg-slate-800 active:bg-slate-800`}>
                        <HomeIcon className="w-7 inline-block" />
                        <span className="align-middle text-md leading-0">&nbsp;Профиль</span>
                    </Link>

                    <Link href="/courses" className={`${pathname === "/courses" ? "bg-slate-800" : ""} px-7 py-4 hover:bg-slate-800 active:bg-slate-800`}>
                        <BookOpenIcon className="w-7 inline-block" />
                        <span className="align-middle text-md leading-0">&nbsp;Курсы</span>
                    </Link>

                    <Link href="/about" className={`${pathname === "/about" ? "bg-slate-800" : ""} px-7 py-4 hover:bg-slate-800 active:bg-slate-800`}>
                        <span className="align-middle text-md leading-0">&nbsp;О проекте</span>
                    </Link>

                    <Link href="/policy" className={`${pathname === "/policy" ? "bg-slate-800" : ""} px-7 py-4 hover:bg-slate-800 active:bg-slate-800`}>
                        <span className="align-middle text-md leading-0">&nbsp;Политика конфиденциальности</span>
                    </Link>

                    <Link href="/agreement" className={`${pathname === "/agreement" ? "bg-slate-800" : ""} px-7 py-4 hover:bg-slate-800 active:bg-slate-800`}>
                        <span className="align-middle text-md leading-0">&nbsp;Пользовательское соглашение</span>
                    </Link>
                </nav>
            </aside>
        </>
    )
}

export default MobileMenu
