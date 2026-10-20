import Image from "next/image";
import Link from "next/link";
import { jakarta } from "./fonts";

interface FooterLink {
    label: string;
    href: string;
}

const FOOTER_LINKS: FooterLink[] = [
    { label: "Inicio", href: "#inicio" },
    { label: "Clases", href: "#clases" },
    { label: "Instalaciones", href: "#instalaciones" },
    { label: "App", href: "#app" },
    { label: "Experiencia", href: "#beneficios" },
    { label: "Sucursales", href: "#sucursales" },
];

const SOCIAL_LINKS = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/besttimefitness/",
        icon: "/facebook-icon.png",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/besttimefitness.mx/",
        icon: "/instagram-icon.png",
    },
];

export default function Footer() {
    return (
        <footer className="bg-stone-950 px-4 py-12 text-white md:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
                    <Link href="#inicio" aria-label="Best Time Fitness — Inicio" className="shrink-0">
                        <Image
                            src="/logo-btf.png"
                            alt="Best Time Fitness"
                            width={243}
                            height={114}
                            className="h-12 w-auto md:h-14"
                        />
                    </Link>

                    <div className="grid gap-10 sm:grid-cols-2 md:gap-16 lg:gap-24">
                        <nav aria-label="Enlaces del sitio">
                            <h2
                                className={`${jakarta.className} text-sm font-semibold uppercase tracking-wider text-yellow-400`}
                            >
                                Secciones
                            </h2>
                            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-1">
                                {FOOTER_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`${jakarta.className} text-sm text-white/90 transition-colors duration-200 hover:text-yellow-400`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div>
                            <h2
                                className={`${jakarta.className} text-sm font-semibold uppercase tracking-wider text-yellow-400`}
                            >
                                Síguenos
                            </h2>
                            <div className="mt-4 flex items-center gap-3">
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-200/15 transition-colors duration-200 hover:bg-amber-200/25"
                                    >
                                        <Image
                                            src={social.icon}
                                            alt=""
                                            width={48}
                                            height={48}
                                            className="h-5 w-5 object-contain"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6 text-center md:mt-14">
                    <p className={`${jakarta.className} text-sm text-white/90`}>
                        Desarrollado por{" "}
                        <a
                            href="https://www.instagram.com/sagezmty/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-yellow-400 decoration-yellow-400/60 decoration-1 underline-offset-4 hover:underline"
                        >
                            SAGEZ
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
