import { Metadata } from "next"
import LoginForm from '@/app/components/login-form/login-form'

export const metadata: Metadata = {
    title: "Вход в систему – Test Flow",
    description: "Авторизация в системе тестирования обучающихся Test Flow",
}

const LoginPage = () => {
    return <LoginForm />
}

export default LoginPage
