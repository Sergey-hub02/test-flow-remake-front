"use client"

import Form from "next/form"
import Link from "next/link"

import { useState } from "react"

import { useFormik } from "formik"
import * as Yup from "yup"
import { string } from "yup"

import axios from "axios"

interface ChangePasswordFormProps { onetime_code: string }

const changePasswordValidationSchema = Yup.object({
    password: string()
        .min(6, "Длина пароля должна быть от 6 до 32 символов!")
        .max(32, "Длина пароля должна быть от 6 до 32 символов!")
        .required("Заполните это поле!"),
    repeated_password: string()
        .required("Заполните это поле!")
        .oneOf([Yup.ref("password")], "Пароли не совпадают!"),
})

const ChangePasswordForm = ({ onetime_code }: ChangePasswordFormProps) => {
    const [error, setError] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const formik = useFormik({
        initialValues: {
            password: "",
            repeated_password: "",
        },
        validationSchema: changePasswordValidationSchema,
        onSubmit: async (fields, { setSubmitting, resetForm }) => {
            try {
                await axios.patch(`/api/v1/auth/change_password/${onetime_code}`, fields)
                setSubmitting(false)

                setError("")
                setMessage("Пароль был успешно изменён!")

                resetForm()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch (error: any) {
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
            }
        },
    })

    return (
        <Form onSubmit={formik.handleSubmit} action="">
            {error.length > 0 && (
                <div className="mt-3 rounded-md border border-red-700 bg-slate-900 py-3 px-5 text-red-400">{error}</div>
            )}

            {message.length > 0 && (
                <div className="mt-3 rounded-md border border-green-700 bg-slate-900 py-3 px-5 text-green-400">{message}</div>
            )}

            <div className="mt-3">
                <label htmlFor="password" className="block font-bold text-shadow-lg text-shadow-slate-800">Новый пароль&nbsp;<span className="text-red-600">*</span></label>

                <div className="mt-1">
                    <input
                        id="password"
                        type="password"
                        className="block bg-slate-900 rounded-sm border-zinc-200 border py-2 px-4 w-full focus:outline-blue-500 scheme-dark"
                        placeholder="Ваш новый пароль"
                        {...formik.getFieldProps("password")}
                    />
                </div>

                {formik.touched.password && formik.errors.password ? (
                    <div className="mt-1">
                        <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.password}</span>
                    </div>
                ) : null}
            </div>

            <div className="mt-3">
                <label htmlFor="repeated-password" className="block font-bold text-shadow-lg text-shadow-slate-800">Повторите пароль&nbsp;<span className="text-red-600">*</span></label>

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

            <div className="mt-6 text-center">
                <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-700/50 rounded-sm py-2 px-6 cursor-pointer shadow-sm shadow-slate-800/50"
                    disabled={formik.isSubmitting}
                >{formik.isSubmitting ? "Загрузка..." : "Сохранить"}</button>
            </div>

            <nav className="mt-3 flex flex-col">
                <div className="text-center mb-2">
                    <Link href="/login" className="text-blue-500 hover:text-blue-400 hover:underline">Уже есть учётная запись? Войдите в аккаунт!</Link>
                </div>

                <div className="text-center mb-2">
                    <Link href="/register" className="text-blue-500 hover:text-blue-400 hover:underline">Нет учётной записи? Зарегистрируйтесь!</Link>
                </div>
            </nav>
        </Form>
    )
}

export default ChangePasswordForm
