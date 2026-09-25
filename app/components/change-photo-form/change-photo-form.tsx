"use client"

import Form from "next/form"
import Image from "next/image"
import { useFormik } from "formik"
import * as Yup from "yup"
import { mixed } from "yup"
import { ChangeEvent, useState } from "react"
import axios from "axios"

interface ChangePhotoFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any,
    accessToken: string,
}

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

const ChangePhotoForm = ({ user, accessToken }: ChangePhotoFormProps) => {
    const [error, setError] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const formik = useFormik({
        initialValues: {
            photo: "",
        },
        validationSchema: changePhotoValidationSchema,
        onSubmit: async (fields, { setSubmitting }) => {
            setError("")

            try {
                const formData = new FormData()

                formData.append(
                    "photo",
                    (fields.photo as unknown as File),
                    (fields.photo as unknown as File).name
                )

                await axios.patch(`/api/v1/users/${user.id}/photo`, formData, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })

                setSubmitting(false)
                setMessage("Фотография успешно обновлена!")
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

    const [image, setImage] = useState<string>(user.photo ? `/storage/photo/${user.photo}` : "/user_stub.png")

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
            {error.length > 0 && (
                <div className="col-span-6">
                    <div className="rounded-md border border-red-700 bg-slate-900 py-3 px-5 text-red-400">{error}</div>
                </div>
            )}

            {message.length > 0 && (
                <div className="col-span-6">
                    <div className="mt-3 rounded-md border border-green-700 bg-slate-900 py-3 px-5 text-green-400">{message}</div>
                </div>
            )}

            <div className="xl:col-span-1 sm:col-span-2 col-span-6 sm:row-span-2">
                <div className="w-full max-w-32 h-32 mx-auto overflow-hidden">
                    <Image
                        src={image}
                        alt="Фотография"
                        width={128}
                        height={128}
                        className="rounded-full object-cover object-center w-full h-full"
                        loading="eager"
                        unoptimized={true}
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
