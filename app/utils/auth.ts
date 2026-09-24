import { jwtDecode } from "jwt-decode"

export const decodeJwt = (jwt: string) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return jwtDecode<any>(jwt)
    }
    catch (error) {
        console.error(error)
        return null
    }
}
