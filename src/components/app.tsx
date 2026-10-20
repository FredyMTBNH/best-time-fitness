import Image from "next/image";
import Button from "./button";
import { jakarta, syne } from "./fonts";

export default function SectionApp() {
    return (
        <section id="app" aria-labelledby="app-heading" className="scroll-mt-24 bg-mist-300 px-4 py-12 md:scroll-mt-28 md:py-16">
            <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12">
                <div className="flex justify-center md:justify-start">
                    <Image
                        src="/mockup-app.png"
                        alt="Aplicación Best Time Fitness"
                        width={444}
                        height={562}
                        sizes="(max-width: 768px) 70vw, 320px"
                        className="h-auto w-full max-w-[240px] object-contain sm:max-w-[280px] md:max-w-[340px]"
                    />
                </div>
                <div className="text-center md:text-left">
                    <h2
                        id="app-heading"
                        className={`${syne.className} text-3xl font-bold leading-tight tracking-tight text-stone-950 md:text-4xl`}
                    >
                        BEST TIME FITNESS APP
                    </h2>
                    <p className={`${jakarta.className} mt-3 text-lg font-semibold text-stone-950 md:text-xl`}>
                        Una experiencia de entrenamiento completa, dentro y fuera del gimnasio.
                    </p>
                    <p className={`${jakarta.className} mt-4 text-sm leading-relaxed text-stone-950/80 md:text-base`}>
                        No importa si ya tienes experiencia o si recién estás comenzando a practicar actividad física, una cosa es segura: en nuestra aplicación, obtienes el mejor aliado para tu rutina de entrenamiento. Solicita tu código para visitar nuestra aplicación. (Exclusivo para socios)
                    </p>
                    <div className="mt-6 flex justify-center md:justify-start">
                        <Button
                            relleno="amarillo"
                            textoBoton="Visita nuestra app"
                            icon="none"
                            link="https://www.ideasintegrales.com.ar/home"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
