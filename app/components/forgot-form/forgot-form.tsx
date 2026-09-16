"use client"

import Form from 'next/form'
import Link from 'next/link'

import { useState } from "react"

import { useFormik } from "formik"
import * as Yup from "yup"
import { string } from "yup"

import axios from "axios"

const forgotValidationSchema = Yup.object({
    email: string()
        .email("Неправильный формат e-mail!")
        .required("Заполните это поле!"),
})

const ForgotForm = () => {
    const [error, setError] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: forgotValidationSchema,
        onSubmit: async (fields, { setSubmitting, resetForm }) => {
            try {
                const response = await axios.post("api/v1/auth/forgot", fields)
                setSubmitting(false)

                setError("")
                setMessage(response.data.message)

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
                <label htmlFor="email" className="block font-bold text-shadow-lg text-shadow-slate-800">E-mail&nbsp;<span className="text-red-600">*</span></label>

                <div className="mt-1">
                    <input
                        id="email"
                        type="email"
                        className="block bg-slate-900 rounded-sm border-zinc-200 border py-2 px-4 w-full focus:outline-blue-500 scheme-dark"
                        placeholder="Ваш e-mail"
                        autoComplete="email"
                        {...formik.getFieldProps("email")}
                    />
                </div>

                {formik.touched.email && formik.errors.email ? (
                    <div className="mt-1">
                        <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.email}</span>
                    </div>
                ) : null}
            </div>

            <div className="mt-6 text-center">
                <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-700/50 rounded-sm py-2 px-6 cursor-pointer shadow-sm shadow-slate-800/50"
                    disabled={formik.isSubmitting}
                >{formik.isSubmitting ? "Загрузка..." : "Получить код"}</button>
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

export default ForgotForm
