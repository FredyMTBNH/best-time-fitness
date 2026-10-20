import { syne, inter, jakarta } from "./fonts"
import { Rating } from "@/components/reui/rating"

export default function Metricas() {
    return (
        <section className="bg-stone-950 px-4 pb-12 text-white md:pb-16">
            <div className="mx-auto max-w-6xl">
                <h1
                    className={`${syne.className} pt-12 text-center font-bold leading-none tracking-tight text-white text-3xl md:pt-16 md:text-4xl`}
                >
                    NUESTROS NUMEROS
                </h1>
                <div className="mt-8 grid grid-cols-2 gap-8 md:mt-12 md:gap-12 lg:grid-cols-4">
                    <div className="flex flex-col items-center gap-2 text-center transition-transform duration-200 hover:scale-105">
                        <span className={`${inter.className} text-3xl font-bold leading-none text-yellow-400 md:text-4xl`}>
                            +800
                        </span>
                        <span className={`${jakarta.className} text-sm font-semibold uppercase tracking-wider text-white/70`}>
                            socios
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center transition-transform duration-200 hover:scale-105">
                        <span className={`${inter.className} text-3xl font-bold leading-none text-yellow-400 md:text-4xl`}>
                            2
                        </span>
                        <span className={`${jakarta.className} text-sm font-semibold uppercase tracking-wider text-white/70`}>
                            sucursales
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center transition-transform duration-200 hover:scale-105">
                        <span className={`${inter.className} text-3xl font-bold leading-none text-yellow-400 md:text-4xl`}>
                            +450 m<sup className="align-super text-[0.6em]">2</sup>
                        </span>
                        <span className={`${jakarta.className} text-sm font-semibold uppercase tracking-wider text-white/70`}>
                            de instalaciones
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center transition-transform duration-200 hover:scale-105">
                        <span className={`${inter.className} text-3xl font-bold leading-none text-yellow-400 md:text-4xl`}>
                            4.8
                        </span>
                        <Rating rating={4.8} showValue={false} size="sm" aria-label="4.8 de 5 estrellas" />
                        <span className={`${jakarta.className} text-sm font-semibold uppercase tracking-wider text-white/70`}>
                            estrellas en google
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}