"use client"

import Link from "next/link"
import Form from "next/form"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { useFormik } from "formik"
import * as Yup from "yup"
import { string } from "yup"

import axios from "axios"

const loginValidationSchema = Yup.object({
    username: string()
        .email("Неправильный формат e-mail!")
        .required("Заполните это поле!"),
    password: string().required("Заполните это поле!"),
})

const LoginForm = () => {
    const router = useRouter()
    const [error, setError] = useState<string>("")

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: (fields, { setSubmitting, resetForm }) => {
            axios.post("/api/v1/auth/login", fields, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
                .then(() => {
                    setSubmitting(false)
                    setError("")

                    resetForm()
                    router.push("/")
                })
                .catch(error => {
                    setSubmitting(false)

                    if (error.response) {
                        if (error.response.status === 422) {
                            alert("Недостаточно данных для выполнения запроса!")
                            return
                        }

                        setError(error.response.data.detail)
                        return
                    }
                    if (error.request) {
                        alert("Не удалось соединиться с сервером!")
                        return
                    }

                    alert("Ошибка при выполнении запроса!")
                    console.error(error)
                })
        },
    })

    return (
        <Form onSubmit={formik.handleSubmit} action="">
            {error.length > 0 && (
                <div className="mt-3 rounded-md border border-red-700 bg-slate-900 py-3 px-5 text-red-400">{error}</div>
            )}

            <div className="mt-3">
                <label htmlFor="username" className="block font-bold text-shadow-lg text-shadow-slate-800">E-mail&nbsp;<span className="text-red-600">*</span></label>

                <div className="mt-1">
                    <input
                        id="username"
                        type="email"
                        className="block bg-slate-900 rounded-sm border-zinc-200 border py-2 px-4 w-full focus:outline-blue-500 scheme-dark"
                        placeholder="Ваш e-mail"
                        autoComplete="email"
                        {...formik.getFieldProps("username")}
                    />
                </div>

                {formik.touched.username && formik.errors.username ? (
                    <div className="mt-1">
                        <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.username}</span>
                    </div>
                ) : null}
            </div>

            <div className="mt-3">
                <label htmlFor="password" className="block font-bold text-shadow-lg text-shadow-slate-800">Пароль&nbsp;<span className="text-red-600">*</span></label>

                <div className="mt-1">
                    <input
                        id="password"
                        type="password"
                        className="block bg-slate-900 rounded-sm border-zinc-200 border py-2 px-4 w-full focus:outline-blue-500 scheme-dark"
                        placeholder="Ваш пароль"
                        {...formik.getFieldProps("password")}
                    />
                </div>

                {formik.touched.password && formik.errors.password ? (
                    <div className="mt-1">
                        <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.password}</span>
                    </div>
                ) : null}
            </div>

            <div className="mt-6 text-center">
                <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-700/50 rounded-sm py-2 px-6 cursor-pointer shadow-sm shadow-slate-800/50"
                    disabled={formik.isSubmitting}
                >{formik.isSubmitting ? "Загрузка..." : "Войти"}</button>
            </div>

            <nav className="mt-3 flex flex-col">
                <div className="text-center mb-2">
                    <Link href="/register" className="text-blue-500 hover:text-blue-400 hover:underline">Нет учётной записи? Зарегистрируйтесь!</Link>
                </div>

                <div className="text-center mb-2">
                    <Link href="/forgot_password" className="text-blue-500 hover:text-blue-400 hover:underline">Забыли пароль?</Link>
                </div>
            </nav>
        </Form>
    )
}

export default LoginForm
