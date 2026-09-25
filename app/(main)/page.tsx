import { Metadata } from "next"
import Link from "next/link"
import axios from "axios"

import ChangeUserForm from "@/app/components/change-user-form/change-user-form"
import ChangePhotoForm from "@/app/components/change-photo-form/change-photo-form"
import { auth } from "@/app/auth"

export const metadata: Metadata = {
    title: "Профиль пользователя – Test Flow",
    description: "Профиль пользователя в системе тестирования обучающихся Test Flow",
}

const API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8000"

const HomePage = async () => {
    const session = await auth()

    const accessToken = session!.accessToken
    let user = null

    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users/me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        user = response.data
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        if (error.response) {
            if (error.response.status === 422) {
                throw new Error("Недостаточно данных для выполнения запроса!")
            }

            throw new Error(error.response.data.detail)
        }

        if (error.request) {
            throw new Error("Не удалось соединиться с сервером!")
        }

        throw error
    }

    return (
        <>
            <header className="">
                <span className="text-lg">/&nbsp;</span>
                <Link href="/" className="text-md font-bold">Профиль</Link>
            </header>

            <div>
                <section className="py-4">
                    <h2 className="font-bold text-xl mb-3">Общая информация</h2>

                    <ChangeUserForm user={user} accessToken={accessToken} />
                </section>

                <section className="py-4">
                    <h2 className="font-bold text-xl mb-3">Изменение фотографии</h2>

                    <ChangePhotoForm user={user} accessToken={accessToken} />
                </section>
            </div>
        </>
    )
}

export default HomePage
