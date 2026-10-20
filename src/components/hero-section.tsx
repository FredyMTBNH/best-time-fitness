import Image from "next/image"
import { WHATSAPP_URL } from "@/lib/links"
import { syne, jakarta } from "./fonts"
import Button from "./button"

export default function Hero() {
    return (
        <section id="inicio" aria-label="Hero" className="relative h-svh w-screen overflow-hidden">
            <Image
                src={"/hero-image.jpg"}
                alt={"Hero Section"}
                priority
                width={2400}
                height={1080}
                quality={100}
                sizes="100vw"
                className="absolute inset-0 z-0 h-full w-full object-cover object-center"
            />
            <div
                aria-hidden
                className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/30 to-black/60"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
                <h1
                    className={`${syne.className} w-full max-w-full text-balance font-bold text-white leading-[1.05] tracking-tight text-[clamp(1.75rem,6.5vw,5.5rem)]`}
                >
                    MUCHO MAS QUE UN GIMNASIO
                </h1>
                <p
                    className={`${jakarta.className} mt-4 md:mt-6 max-w-4xl font-semibold text-white/85 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-[4px]`}
                >
                    Ponemos a tu alcance un estilo de vida que
                    <br />
                    va mucho más allá del estado físico.
                </p>
                <div className="mt-6 flex w-full max-w-3xl flex-col items-center gap-3 px-4 sm:grid sm:grid-cols-2 sm:gap-16 sm:px-0">
                    <div className="flex w-full justify-center sm:justify-end">
                        <Button relleno="amarillo" textoBoton="Conoce los planes" icon="calendar" href={WHATSAPP_URL} />
                    </div>
                    <div className="flex w-full justify-center sm:justify-start">
                        <Button relleno="glass" textoBoton="Visitanos" icon="location" href="#sucursales" />
                    </div>
                </div>
            </div>
        </section>
    )
}