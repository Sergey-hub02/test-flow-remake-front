import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User {
        id: string,
        email: string,
        role: string,
        accessToken: string,
        accessExpiresAt: number,
        refreshToken: string,
    }

    interface Session {
        user: {
            id: string,
            email: string,
            role: string,
        },
        accessToken: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub: string,
        email: string,
        role: string,
        accessToken: string,
        accessExpiresAt: number,
        refreshToken: string,
        error?: string,
    }
}
