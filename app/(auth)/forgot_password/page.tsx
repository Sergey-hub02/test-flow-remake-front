import { Metadata } from "next"
import ForgotForm from '@/app/components/forgot-form/forgot-form'

export const metadata: Metadata = {
    title: "Восстановление пароля – Test Flow",
    description: "Восстановление пароля в системе тестирования обучающихся Test Flow",
}

const ForgotPage = () => {
    return <ForgotForm />
}

export default ForgotPage
