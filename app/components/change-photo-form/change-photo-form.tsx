"use client"

import Form from "next/form"
import Image from "next/image"
import { useFormik } from "formik"
import * as Yup from "yup"
import { mixed } from "yup"
import { ChangeEvent, useState } from "react"

const changePhotoValidationSchema = Yup.object().shape({
    photo: mixed()
        .test(
            "fileType",
            "Файл должен быть изображением!",
            (photo) => {
                if (!photo) {
                    return true
                }

                return (photo as File).type.includes("image")
            },
        )
        .test(
            "fileSize",
            "Размер файла не должен превышать 1,5 МБ!",
            (photo) => {
                if (!photo) {
                    return true
                }

                return (photo as File).size <= 1572864
            },
        ),
})

const ChangePhotoForm = () => {
    const formik = useFormik({
        initialValues: {
            photo: "",
        },
        validationSchema: changePhotoValidationSchema,
        onSubmit: fields => {
            console.log("Отправка данных на сервер:", fields)
        },
    })

    const [image, setImage] = useState<string>("/user_stub.png")

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const photo = e.target.files?.[0]
        formik.setFieldValue("photo", photo)

        if (!photo) {
            return
        }

        const uploadedPhoto = URL.createObjectURL(photo)
        setImage(uploadedPhoto)
    }

    return (
        <Form action="" onSubmit={formik.handleSubmit} formEncType="multipart/form-data" className="grid grid-cols-6 gap-4">
            <div className="xl:col-span-1 sm:col-span-2 col-span-6 sm:row-span-2">
                <div className="w-full max-w-32 h-32 mx-auto overflow-hidden">
                    <Image
                        src={image}
                        alt="Фотография"
                        width={128}
                        height={128}
                        className="rounded-full object-cover object-center w-full h-full"
                        loading="eager"
                        onLoad={() => {
                            if (!image || !image.startsWith("blob")) {
                                return
                            }

                            URL.revokeObjectURL(image)
                        }}
                    />
                </div>
            </div>

            <div className="xl:col-span-5 sm:col-span-4 col-span-6">
                <label htmlFor="photo" className="block font-bold">Фотография</label>

                <div className="mt-1">
                    <input
                        id="photo"
                        type="file"
                        name="photo"
                        className="block bg-slate-900 rounded-sm border-zinc-200 border py-1 px-4 w-full focus:outline-blue-500 scheme-dark cursor-pointer file:bg-blue-700 file:rounded-md file:py-1 file:px-3 file:mr-2"
                        onChange={handlePhotoChange}
                        accept="image/*"
                    />
                </div>

                {formik.errors.photo ? (
                    <div className="mt-1">
                        <span className="text-red-500 text-shadow-xs text-shadow-slate-800">{formik.errors.photo}</span>
                    </div>
                ) : null}
            </div>

            <div className="xl:col-span-5 sm:col-span-4 col-span-6">
                <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-700/50 rounded-sm py-2 px-6 cursor-pointer shadow-sm shadow-slate-800/50"
                    disabled={formik.isSubmitting}
                >{formik.isSubmitting ? "Загрузка..." : "Сохранить"}</button>
            </div>
        </Form>
    )
}

export default ChangePhotoForm
