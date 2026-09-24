"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid"
import { ArrowRightStartOnRectangleIcon, BookmarkIcon, EnvelopeIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useEffect } from "react"

const UserDropdown = () => {
    const { data: session } = useSession()
    const [opened, setOpened] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpened(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const arrowIcon = opened
        ? <ChevronUpIcon className="w-4 inline-block" />
        : <ChevronDownIcon className="w-4 inline-block" />

    return (
        <div ref={containerRef} className="pl-5 relative ml-auto">
            <button
                className="cursor-pointer font-bold"
                onClick={() => setOpened(!opened)}
            >{session?.user?.email} {arrowIcon}</button>

            <nav className={`absolute top-full left-0 z-50 flex-col bg-slate-800 rounded-md ${opened ? "flex" : "hidden"}`}>
                <Link href="/my_courses" className="py-3 px-4 hover:bg-slate-700">
                    <BookmarkIcon className="w-5 inline-block" />
                    <span className="align-middle">&nbsp;Мои курсы</span>
                </Link>

                <Link href="/change_email" className="py-3 px-4 hover:bg-slate-700">
                    <EnvelopeIcon className="w-5 inline-block" />
                    <span className="align-middle">&nbsp;Изменить e-mail</span>
                </Link>

                <Link href="/logout" className="py-3 px-4 hover:bg-slate-700">
                    <ArrowRightStartOnRectangleIcon className="w-5 inline-block" />
                    <span className="align-middle">&nbsp;Выход из системы</span>
                </Link>
            </nav>
        </div>
    )
}

export default UserDropdown
