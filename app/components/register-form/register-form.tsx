"use client"

import Link from "next/link"
import Form from "next/form"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import { useState } from "react"

import { DateTime } from "luxon"
import { useFormik } from "formik"

import * as Yup from "yup"
import { string, date } from "yup"

import axios from "axios"

const registerValidationSchema = Yup.object({
    last_name: string().required("Заполните это поле!"),
    first_name: string().required("Заполните это поле!"),
    second_name: string().notRequired(),
    email: string()
        .email("Неправильный формат e-mail!")
        .required("Заполните это поле!"),
    birthday: date().required("Заполните это поле!"),
    password: string()
        .min(6, "Длина пароля должна быть от 6 до 32 символов!")
        .max(32, "Длина пароля должна быть от 6 до 32 символов!")
        .required("Заполните это поле!"),
    repeated_password: string()
        .required("Заполните это поле!")
        .oneOf([Yup.ref("password")], "Пароли не совпадают!"),
})

const RegisterForm = () => {
    const router = useRouter()
    const [error, setError] = useState<string>("")

    const formik = useFormik({
        initialValues: {
            last_name: "",
            first_name: "",
            second_name: "",
            email: "",
            birthday: "",
            password: "",
            repeated_password: "",
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (fields, { setSubmitting, resetForm }) => {
            setError("")

            try {
                await axios.post("/api/v1/users", fields)

                const response = await signIn("credentials", {
                    username: fields.email,
                    password: fields.password,
                    redirect: false,
                })

                if (!response || response.error) {
                    setError(response.code ?? "Ошибка при входе в учётную запись!")
                    setSubmitting(false)
                    return
                }

                setSubmitting(false)
                resetForm()

                router.push("/")
                router.refresh()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch (error: any) {
                setSubmitting(false)

                if (error.response) {
                    if (error.response.status === 422) {
                        setError("Недостаточно данных для выполнения запроса!")
                        return
                    }

                    setError(error.response.data.detail)
                    return
                }

                if (error.request) {
                    setError("Не удалось соединиться с сервером!")
                    return
                }

                setError("Ошибка при выполнении запроса!")
                console.error(error)
            }
        },
    })

    return (
        <Form onSubmit={formik.handleSubmit} action="">
            {error.length > 0 && (
                <div className="mt-3 rounded-md border border-red-700 bg-slate-900 py-3 px-5 text-red-400">{error}</div>
            )}

            <div className="mt-3 grid grid-cols-6 sm:gap-4 gap-2">
                <div className="sm:col-span-2 col-span-6">
                    <label htmlFor="last-name" className="block font-bold">Фамилия&nbsp;<span className="text-red-600">*</span></label>

                    <div className="mt-1">
                        <input
                            id="last-name"
                            type="text"
                            className="block bg-slate-900 rounded-sm border-zinc-200 border py-2 px-4 w-full focus:outline-blue-500 scheme-dark"
                            placeholder="Ваша фамилия"
                            {...formik.getFieldProps("last_name")}
                        />
                    </div>

                    {formik.touched.last_name && formik.errors.last_name ? (
                        <div className="mt-1">
                            <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.last_name}</span>
                        </div>
                    ) : null}
                </div>

                <div className="sm:col-span-2 col-span-6">
                    <label htmlFor="first-name" className="block font-bold">Имя&nbsp;<span className="text-red-600">*</span></label>

                    <div className="mt-1">
                        <input
                            id="first-name"
                            type="text"
                            className="block bg-slate-900 rounded-sm border-zinc-200 border py-2 px-4 w-full focus:outline-blue-500 scheme-dark"
                            placeholder="Ваше имя"
                            {...formik.getFieldProps("first_name")}
                        />
                    </div>

                    {formik.touched.first_name && formik.errors.first_name ? (
                        <div className="mt-1">
                            <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.first_name}</span>
                        </div>
                    ) : null}
                </div>

                <div className="sm:col-span-2 col-span-6">
                    <label htmlFor="second-name" className="block font-bold">Отчество</label>

                    <div className="mt-1">
                        <input
                            id="second-name"
                            type="text"
                            className="block bg-slate-900 rounded-sm border-zinc-200 border py-2 px-4 w-full focus:outline-blue-500 scheme-dark"
                            placeholder="Ваше отчество"
                            {...formik.getFieldProps("second_name")}
                        />
                    </div>
                </div>

                <div className="sm:col-span-3 col-span-6">
                    <label htmlFor="email" className="block font-bold">E-mail&nbsp;<span className="text-red-600">*</span></label>

                    <div className="mt-1">
                        <input
                            id="email"
                            type="email"
                            className="block bg-slate-900 rounded-sm border-zinc-200 border py-2 px-4 w-full focus:outline-blue-500 scheme-dark"
                            placeholder="Ваш e-mail"
                            {...formik.getFieldProps("email")}
                        />
                    </div>

                    {formik.touched.email && formik.errors.email ? (
                        <div className="mt-1">
                            <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.email}</span>
                        </div>
                    ) : null}
                </div>

                <div className="sm:col-span-3 col-span-6">
                    <label htmlFor="birthday" className="block font-bold">Дата рождения&nbsp;<span className="text-red-600">*</span></label>

                    <div className="mt-1">
                        <input
                            id="birthday"
                            type="date"
                            className="block bg-slate-900 rounded-sm border-zinc-200 border py-2 px-4 w-full focus:outline-blue-500 scheme-dark"
                            max={DateTime.now().toFormat("yyyy-MM-dd")}
                            {...formik.getFieldProps("birthday")}
                        />
                    </div>

                    {formik.touched.birthday && formik.errors.birthday ? (
                        <div className="mt-1">
                            <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.birthday}</span>
                        </div>
                    ) : null}
                </div>

                <div className="sm:col-span-3 col-span-6">
                    <label htmlFor="password" className="block font-bold">Пароль&nbsp;<span className="text-red-600">*</span></label>

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

                <div className="sm:col-span-3 col-span-6">
                    <label htmlFor="repeated-password" className="block font-bold">Повторите пароль&nbsp;<span className="text-red-600">*</span></label>

                    <div className="mt-1">
                        <input
                            id="repeated-password"
                            type="password"
                            className="block bg-slate-900 rounded-sm border-zinc-200 border py-2 px-4 w-full focus:outline-blue-500 scheme-dark"
                            placeholder="Повторите пароль"
                            {...formik.getFieldProps("repeated_password")}
                        />
                    </div>

                    {formik.touched.repeated_password && formik.errors.repeated_password ? (
                        <div className="mt-1">
                            <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.repeated_password}</span>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="mt-6 text-center">
                <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-700/50 rounded-sm py-2 px-6 cursor-pointer shadow-sm shadow-slate-800/50"
                    disabled={formik.isSubmitting}
                >{formik.isSubmitting ? "Загрузка..." : "Зарегистрироваться"}</button>
            </div>

            <nav className="mt-3 flex flex-col">
                <div className="text-center mb-2">
                    <Link href="/login" className="text-blue-500 hover:text-blue-400 hover:underline">Уже есть учётная запись? Войдите в аккаунт!</Link>
                </div>

                <div className="text-center mb-2">
                    <Link href="/forgot_password" className="text-blue-500 hover:text-blue-400 hover:underline">Забыли пароль?</Link>
                </div>
            </nav>
        </Form>
    )
}

export default RegisterForm
