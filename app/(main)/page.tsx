import { Metadata } from "next"
import Link from "next/link"

import ChangeUserForm from "@/app/components/change-user-form/change-user-form"
import ChangePhotoForm from "@/app/components/change-photo-form/change-photo-form"

export const metadata: Metadata = {
    title: "Профиль пользователя – Test Flow",
    description: "Профиль пользователя в системе тестирования обучающихся Test Flow",
}

const HomePage = () => {
    return (
        <>
            <header className="">
                <span className="text-lg">/&nbsp;</span>
                <Link href="/" className="text-md font-bold">Профиль</Link>
            </header>

            <div>
                <section className="py-4">
                    <h2 className="font-bold text-xl mb-3">Общая информация</h2>

                    <ChangeUserForm />
                </section>

                <section className="py-4">
                    <h2 className="font-bold text-xl mb-3">Изменение фотографии</h2>

                    <ChangePhotoForm />
                </section>
            </div>
        </>
    )
}

export default HomePage
