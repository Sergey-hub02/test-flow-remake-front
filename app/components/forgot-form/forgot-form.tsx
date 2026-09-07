"use client"

import Form from 'next/form'
import Link from 'next/link'

import { useFormik } from "formik"
import * as Yup from "yup"
import { string } from "yup"

const forgotValidationSchema = Yup.object({
    email: string()
        .email("Неправильный формат e-mail!")
        .required("Заполните это поле!"),
})

const ForgotForm = () => {
    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: forgotValidationSchema,
        onSubmit: (fields) => {
            console.log("Отправка данных на сервер:", fields)
        },
    })

    return (
        <Form onSubmit={formik.handleSubmit} action="">
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
