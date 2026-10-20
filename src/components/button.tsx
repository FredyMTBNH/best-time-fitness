import Link from "next/link";
import { jakarta } from "./fonts";
import { CalendarCheck, MapPin, Clock } from "lucide-react";

type Relleno = "amarillo" | "glass" | "negro";

interface ButtonProps {
    relleno: Relleno;
    textoBoton: string;
    icon: "calendar" | "location" | "clock" | "none";
    href?: string;
    link?: string;
}

const RELLENO_STYLES: Record<Relleno, { container: string; icon: string }> = {
    amarillo: {
        container: "bg-yellow-400 text-stone-950 hover:bg-yellow-300",
        icon: "text-stone-950",
    },
    glass: {
        container:
            "bg-amber-200/15 text-white backdrop-blur-md border border-white/10 hover:bg-amber-200/25",
        icon: "text-yellow-400",
    },
    negro: {
        container: "bg-stone-950 text-white hover:bg-stone-900",
        icon: "text-yellow-400",
    },
};

export default function Button({ relleno, textoBoton, icon, href, link }: ButtonProps) {
    const styles = RELLENO_STYLES[relleno];
    const target = href ?? link;
    const isExternal = !!target && (/^https?:\/\//.test(target) || target.startsWith("//"));
    const className = `${jakarta.className} inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${styles.container}`;

    const content = (
        <>
            <span>{textoBoton}</span>
            {icon === "calendar" && <CalendarCheck size={24} className={`shrink-0 ${styles.icon}`} />}
            {icon === "location" && <MapPin size={24} className={`shrink-0 ${styles.icon}`} />}
            {icon === "clock" && <Clock size={24} className={`shrink-0 ${styles.icon}`} />}
        </>
    );

    if (!target) {
        return (
            <button type="button" className={className}>
                {content}
            </button>
        );
    }

    if (isExternal) {
        return (
            <a href={target} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
            </a>
        );
    }

    return (
        <Link href={target} className={className}>
            {content}
        </Link>
    );
}
