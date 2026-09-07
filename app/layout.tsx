import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "Test Flow: система тестирования",
    description: "Система тестирования обучающихся Test Flow",
    keywords: ["нелинейное оценивание", "степень сходства", "рейтинг", "достоверность", "вырождения"],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="ru">
        <body className="bg-slate-900">{children}</body>
        </html>
    )
}
