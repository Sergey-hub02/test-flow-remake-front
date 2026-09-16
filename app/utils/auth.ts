import { jwtDecode } from "jwt-decode"

export type User = {
    id: string,
    email: string,
    role: string,
}

export const decodeJwt = (jwt: string): User | null => {
    try {
        const payload = jwtDecode<User>(jwt)

        return {
            id: payload.id,
            email: payload.email,
            role: payload.role,
        }
    }
    catch (error) {
        console.error(error)
        return null
    }
}
