"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import UserDropdown from "@/app/components/user-dropdown/user-dropdown"

interface HeaderProps {
    onMenuClick: () => void,
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const path = usePathname()

    const activeClasses = "text-zinc-100 underline"
    const hoverClasses = activeClasses
        .split(" ")
        .map(className => `hover:${className}`)
        .join(" ")

    return (
        <header className="py-3 px-6 border-b border-b-zinc-200">
            <div className="flex items-center">
                <div className="sm:flex hidden items-center">
                    <Image
                        src="/test_flow_icon_64.png"
                        alt="Test Flow"
                        width={50}
                        height={50}
                        loading="eager"
                    />

                    <h1 className="ml-2 text-shadow-lg text-shadow-slate-800 text-2xl font-bold xl:block hidden">Test Flow</h1>
                </div>

                <button
                    type="button"
                    className="lg:hidden block text-transparent w-14 h-10 rounded-lg px-2 focus:outline-1 focus:outline-blue-500"
                    onClick={onMenuClick}
                >
                    <span className="block w-full h-0.75 bg-zinc-200 rounded-lg relative before:content-[''] before:absolute before:w-full before:h-0.75 before:bg-zinc-200 before:-top-2.5 before:left-0 before:rounded-lg after:content-[''] after:absolute after:w-full after:h-0.75 after:bg-zinc-200 after:top-2.5 after:left-0 after:rounded-lg"></span>
                </button>

                <nav className="lg:flex hidden items-center">
                    <Link
                        href="/about"
                        className={`px-3 ${hoverClasses} ${path === "/about" ? activeClasses : ""}`}
                    >О проекте</Link>

                    <Link
                        href="/policy"
                        className={`px-3 ${hoverClasses} ${path === "/policy" ? activeClasses : ""}`}
                    >Политика конфиденциальности</Link>

                    <Link
                        href="/agreement"
                        className={`px-3 ${hoverClasses} ${path === "/agreement" ? activeClasses : ""}`}
                    >Пользовательское соглашение</Link>
                </nav>

                <UserDropdown />
            </div>
        </header>
    )
}

export default Header
