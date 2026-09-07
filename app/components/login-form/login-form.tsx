"use client"

import Link from "next/link"
import Form from "next/form"

import { useFormik } from "formik"
import * as Yup from "yup"
import { string } from "yup"

const loginValidationSchema = Yup.object({
    email: string()
        .email("Неправильный формат e-mail!")
        .required("Заполните это поле!"),
    password: string().required("Заполните это поле!"),
})

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
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
