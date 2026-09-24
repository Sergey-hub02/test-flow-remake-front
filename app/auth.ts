import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from "axios"

import { decodeJwt } from "@/app/utils/auth"

class AuthError extends CredentialsSignin {
    constructor(message: string) {
        super()
        this.code = message
    }
}

const API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8000"

export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const response = await axios.post(
                        `${API_BASE_URL}/api/v1/auth/login`,
                        {
                            username: credentials?.username,
                            password: credentials?.password,
                        },
                        {
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        },
                    )

                    const accessToken: string = response.data.access_token
                    const payload = decodeJwt(accessToken)

                    if (!payload) {
                        throw new AuthError("Не удалось получить данные пользователя!")
                    }

                    return {
                        id: payload.id,
                        email: payload.email,
                        role: payload.role,
                        accessToken: response.data.access_token,
                        accessExpiresAt: payload.exp * 1000,
                        refreshToken: response.data.refresh_token,
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                catch (error: any) {
                    if (error instanceof CredentialsSignin) {
                        throw error
                    }

                    if (error.response) {
                        throw new AuthError(error.response.data.detail)
                    }

                    if (error.request) {
                        throw new AuthError("Не удалось соединиться с сервером!")
                    }

                    throw new AuthError((error as Error).message)
                }
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.sub = user.id
                token.email = user.email
                token.role = user.role
                token.accessToken = user.accessToken
                token.accessExpiresAt = user.accessExpiresAt
                token.refreshToken = user.refreshToken
            }

            if (Date.now() < token.accessExpiresAt) {
                return token
            }

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/api/v1/auth/refresh/${token.refreshToken}`
                )

                const accessToken: string = response.data.access_token
                const payload = decodeJwt(accessToken)

                if (!payload) {
                    token.error = "RefreshTokenError"
                    console.error("Пустое содержимое токена!")
                    return token
                }

                return {
                    sub: payload.sub,
                    email: payload.email,
                    role: payload.role,
                    accessToken: response.data.access_token,
                    accessExpiresAt: payload.exp * 1000,
                    refreshToken: response.data.refresh_token,
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch (error: any) {
                token.error = "RefreshTokenError"

                if (error.response) {
                    console.error(error.response.data.detail)
                }
                else if (error.request) {
                    console.error("Не удалось соединиться с сервером!")
                }
                else {
                    console.error(error)
                }

                return token
            }
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken

            if (session.user) {
                session.user.id = token.sub
                session.user.email = token.email
                session.user.role = token.role
            }

            return session
        },
    },
})
