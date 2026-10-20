"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { jakarta } from "./fonts"

interface NavItem {
    label: string
    href: string
}

const NAV_ITEMS: NavItem[] = [
    { label: "INICIO", href: "#inicio" },
    { label: "UBICACIONES", href: "#sucursales" },
    { label: "CLASES", href: "#clases" },
    { label: "MEMBRESIAS", href: "#beneficios" },
    { label: "CONOCENOS", href: "#instalaciones" },
]

export default function NavBar() {
    const [selected, setSelected] = useState<string>("INICIO")
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 md:px-12 py-4 md:py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo a la izquierda */}
                <Link href="/" className="flex items-center shrink-0">
                    <Image
                        src="/logo-btf.png"
                        alt="Best Time Fitness"
                        width={120}
                        height={56}
                        priority
                        className="h-10 sm:h-11 w-auto object-contain drop-shadow"
                    />
                </Link>

                {/* Cápsula de navegación central (Desktop & Tablet) */}
                <nav
                    aria-label="Navegación principal"
                    className={`${jakarta.className} hidden md:flex items-center gap-6 lg:gap-8 px-6 lg:px-8 py-2.5 rounded-full bg-amber-200/15 backdrop-blur-md border border-white/5 shadow-lg shadow-black/5`}
                >
                    {NAV_ITEMS.map((item) => {
                        const isSelected = selected === item.label
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setSelected(item.label)}
                                className={`cursor-pointer text-xs lg:text-sm font-semibold tracking-wider transition-colors duration-200 uppercase ${isSelected
                                    ? "text-yellow-400"
                                    : "text-white/80 hover:text-yellow-400"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Cápsula de redes sociales (FB e IG) */}
                <div className="hidden sm:flex items-center gap-3.5 px-4 py-2 rounded-full bg-amber-200/15 backdrop-blur-md border border-white/5 shadow-lg shadow-black/5 shrink-0">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="transition-transform duration-200 hover:scale-110 opacity-90 hover:opacity-100 flex items-center justify-center"
                    >
                        <Image
                            src="/facebook-icon.png"
                            alt="Facebook"
                            width={22}
                            height={22}
                            className="w-5 h-5 object-contain"
                        />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="transition-transform duration-200 hover:scale-110 opacity-90 hover:opacity-100 flex items-center justify-center"
                    >
                        <Image
                            src="/instagram-icon.png"
                            alt="Instagram"
                            width={22}
                            height={22}
                            className="w-5 h-5 object-contain"
                        />
                    </a>
                </div>

                {/* Botón de menú móvil */}
                <div className="flex md:hidden items-center gap-2">
                    <div className="flex sm:hidden items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-200/15 backdrop-blur-md border border-white/5">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="flex items-center justify-center"
                        >
                            <Image
                                src="/facebook-icon.png"
                                alt="Facebook"
                                width={18}
                                height={18}
                                className="w-4 h-4 object-contain"
                            />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="flex items-center justify-center"
                        >
                            <Image
                                src="/instagram-icon.png"
                                alt="Instagram"
                                width={18}
                                height={18}
                                className="w-4 h-4 object-contain"
                            />
                        </a>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Alternar menú"
                        className="p-2 rounded-full bg-amber-200/15 backdrop-blur-md border border-white/5 text-white/80 hover:text-yellow-400 transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Menú desplegable móvil */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-3 max-w-sm mx-auto">
                    <div
                        className={`${jakarta.className} flex flex-col items-center gap-4 py-5 px-6 rounded-2xl bg-amber-200/15 backdrop-blur-xl border border-white/10 shadow-xl`}
                    >
                        {NAV_ITEMS.map((item) => {
                            const isSelected = selected === item.label
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => {
                                        setSelected(item.label)
                                        setMobileMenuOpen(false)
                                    }}
                                    className={`cursor-pointer text-sm font-semibold tracking-wider transition-colors duration-200 uppercase ${isSelected
                                        ? "text-yellow-400"
                                        : "text-white/80 hover:text-yellow-400"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </header>
    )
}
