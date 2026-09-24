"use client"

import { useEffect } from "react"
import Image from "next/image"

interface ErrorPageProps {
    error: Error,
    retry: () => void,
}

const ErrorPage = ({ error, retry }: ErrorPageProps) => {
    useEffect(() => {
        console.error(error)
    }, [error])

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

                    <h1 className="mt-3 text-4xl text-shadow-lg text-shadow-slate-900 font-bold">Что-то пошло не так!</h1>
                </header>

                <div className="mt-3 rounded-md border border-red-700 bg-slate-900 py-3 px-5 text-red-400">
                    <p>При выполнении запроса произошла непредвиденная ошибка. Возможно, ошибка временная. Попробуйте перезагрузить страницу.</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
