import { Metadata } from "next"
import RegisterForm from '@/app/components/register-form/register-form'

export const metadata: Metadata = {
    title: "Регистрация в системе – Test Flow",
    description: "Регистрация в системе тестирования обучающихся Test Flow",
}

const RegisterPage = () => {
    return <RegisterForm />
}

export default RegisterPage
