"use client"

import { createContext, PropsWithChildren, useState, useEffect, useCallback, useRef } from "react"
import { getCookie, hasCookie } from "cookies-next/client"
import { useRouter } from "next/navigation"
import axios from "axios"

import { decodeJwt, type User } from "@/app/utils/auth"

export const AuthContext = createContext<{
    user: User | null,
    loading: boolean,
}>({
    user: null,
    loading: true,
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    const didInit = useRef<boolean>(false)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const login = useCallback(() => {
        const accessToken = getCookie("access_token")

        if (!accessToken) {
            setUser(null)
            setLoading(false)
            return
        }

        const user = decodeJwt(accessToken)

        setUser(user)
        setLoading(false)
    }, [])

    const refresh = useCallback(async () => {
        const refreshToken = getCookie("refresh_token")

        if (!refreshToken) {
            setUser(null)
            setLoading(false)

            router.push("/login")
            return
        }

        try {
            await axios.post(`/api/v1/auth/refresh/${refreshToken}`)

            if (!hasCookie("access_token")) {
                setUser(null)
                setLoading(false)

                router.push("/login")
                return
            }

            login()
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            if (error.response) {
                if (error.response.status === 422) {
                    console.error("Недостаточно данных для выполнения запроса!")
                }
                else {
                    console.error(`Ошибка при обновлении сессии: ${error.response.data.detail}`)
                }
            }
            else if (error.request) {
                console.error("Не удалось соединиться с сервером!")
            }
            else {
                console.error(error)
            }

            setUser(null)
            setLoading(false)

            router.push("/login")
        }
    }, [router, login])

    useEffect(() => {
        if (didInit.current) {
            return
        }

        didInit.current = true

        if (!hasCookie("access_token") && !hasCookie("refresh_token")) {
            router.push("/login")
            return
        }

        if (hasCookie("refresh_token") && !hasCookie("access_token")) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            refresh()
            return
        }

        login()
    }, [refresh, router, login])

    return (
        <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
    )
}
