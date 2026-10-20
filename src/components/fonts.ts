import { Plus_Jakarta_Sans } from "next/font/google";
import { Syne } from "next/font/google";
import { Inter } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "600"],
})

export const syne = Syne({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
})

export const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
})