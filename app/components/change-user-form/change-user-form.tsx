"use client"

import Form from "next/form"
import { useFormik } from "formik"
import { DateTime } from "luxon"
import * as Yup from "yup"
import { date, string } from "yup"

const changeUserFormValidationSchema = Yup.object({
    last_name: string().required("Заполните это поле!"),
    first_name: string().required("Заполните это поле!"),
    email: string()
        .email("Неправильный формат e-mail!")
        .required("Заполните это поле!"),
    birthday: date().required("Заполните это поле!"),
})

const ChangeUserForm = () => {
    const formik = useFormik({
        initialValues: {
            last_name: "",
            first_name: "",
            second_name: "",
            email: "",
            birthday: "",
            photo: "",
        },
        validationSchema: changeUserFormValidationSchema,
        onSubmit: (fields) => {
            console.log("Отправка данных на сервер:", fields)
        },
    })

    return (
        <Form action="" onSubmit={formik.handleSubmit} className="grid grid-cols-6 gap-4">
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

                {formik.touched.second_name && formik.errors.second_name ? (
                    <div className="mt-1">
                        <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.second_name}</span>
                    </div>
                ) : null}
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
                        placeholder="Ваша дата рождения"
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

            <div className="col-span-6">
                <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-700/50 rounded-sm py-2 px-6 cursor-pointer shadow-sm shadow-slate-800/50"
                    disabled={formik.isSubmitting}
                >{formik.isSubmitting ? "Загрузка..." : "Сохранить"}</button>
            </div>
        </Form>
    )
}

export default ChangeUserForm
