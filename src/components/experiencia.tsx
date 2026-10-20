import ScaleSlider from "@/app/scale-slider";
import { INSTAGRAM_URL } from "@/lib/links";
import Button from "./button";
import { syne } from "./fonts";

const IMAGES: string[] = [
    "/beneficios/benef-1.jpg",
    "/beneficios/benef-2.jpg",
    "/beneficios/benef-3.jpg",
    "/beneficios/benef-4.jpg",
    "/beneficios/benef-5.jpg",
    "/beneficios/benef-6.jpg",
    "/beneficios/benef-7.jpg",
];

const ALTS: string[] = [
    "Socios entrenando en Best Time Fitness",
    "Clase grupal de entrenamiento",
    "Entrenador asistiendo en press de banca",
    "Entrenador guiando una rutina",
    "Resultados del entrenamiento",
    "Espacio para los más pequeños",
    "Vestidores del gimnasio",
];

export default function Experiencia() {
    return (
        <section id="beneficios" aria-labelledby="experiencia-heading" className="relative scroll-mt-24 md:scroll-mt-28">
            <ScaleSlider
                images={IMAGES}
                imageAlts={ALTS}
                ariaLabel="Galería de beneficios de Best Time Fitness"
                radius={16}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-56 bg-gradient-to-b from-stone-950 via-stone-950/70 to-transparent md:h-72"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pt-24 md:pt-28">
                <div className="mx-auto max-w-6xl">
                    <h2
                        id="experiencia-heading"
                        className={`${syne.className} text-center font-bold leading-tight tracking-tight text-white text-3xl md:text-left md:text-5xl`}
                    >
                        CONOCE NUESTROS BENEFICIOS
                    </h2>
                    <div className="pointer-events-auto mt-6 flex justify-center md:justify-start">
                        <Button href={INSTAGRAM_URL} relleno="amarillo" textoBoton="Conoce Mas" icon="none" />
                    </div>
                </div>
            </div>
        </section>
    )
}
