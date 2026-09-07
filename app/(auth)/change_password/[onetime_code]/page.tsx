import { Metadata } from "next"
import ChangePasswordForm from "@/app/components/change-password-form/change-password-form"

export const metadata: Metadata = {
    title: "Изменение пароля – Test Flow",
    description: "Изменение пароял от учётной записи в системе тестирования обучающихся Test Flow",
}

interface ChangePasswordPageParams { onetime_code: string }

const ChangePasswordPage
    = async ({ params }: { params: Promise<ChangePasswordPageParams>}) => {
    const { onetime_code } = await params
    return <ChangePasswordForm onetime_code={onetime_code} />
}

export default ChangePasswordPage
