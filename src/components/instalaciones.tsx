import Image from "next/image";
import { syne } from "./fonts";

interface Instalacion {
    id: number;
    src: string;
    alt: string;
    sizes: string;
    className: string;
}

const INSTALACIONES: Instalacion[] = [
    {
        id: 1,
        src: "/instalaciones1.jpg",
        alt: "Fachada de Best Time Fitness",
        sizes: "(max-width: 768px) 50vw, 25vw",
        className: "md:col-start-1 md:row-start-1",
    },
    {
        id: 2,
        src: "/instalaciones2.jpg",
        alt: "Área de máquinas de cardio",
        sizes: "(max-width: 768px) 50vw, 50vw",
        className: "row-span-2 md:col-span-2 md:col-start-2 md:row-start-1",
    },
    {
        id: 3,
        src: "/instalaciones3.jpg",
        alt: "Zona de pesas y entrenamiento funcional",
        sizes: "(max-width: 768px) 50vw, 25vw",
        className: "row-span-2 md:col-start-4 md:row-start-1",
    },
    {
        id: 4,
        src: "/instalaciones4.jpg",
        alt: "Entrenamiento con battle ropes",
        sizes: "(max-width: 768px) 50vw, 25vw",
        className: "row-span-2 md:col-start-1 md:row-start-2",
    },
    {
        id: 5,
        src: "/instalaciones5.jpg",
        alt: "Máquinas de fuerza",
        sizes: "(max-width: 768px) 50vw, 25vw",
        className: "md:col-start-2 md:row-start-3",
    },
    {
        id: 6,
        src: "/instalaciones6.jpg",
        alt: "Clase grupal en el gimnasio",
        sizes: "(max-width: 768px) 50vw, 25vw",
        className: "md:col-start-3 md:row-start-3",
    },
    {
        id: 7,
        src: "/instalaciones7.jpg",
        alt: "Vestidores y área de descanso",
        sizes: "(max-width: 768px) 50vw, 25vw",
        className: "md:col-start-4 md:row-start-3",
    },
];

export default function Instalaciones() {
    return (
        <section id="instalaciones" aria-labelledby="instalaciones-heading" className="scroll-mt-24 bg-stone-950 px-4 pb-12 md:scroll-mt-28 md:pb-16">
            <div className="mx-auto max-w-6xl">
                <h2
                    id="instalaciones-heading"
                    className={`${syne.className} pt-12 text-center font-bold leading-none tracking-tight text-white text-3xl md:pt-16 md:text-4xl`}
                >
                    NUESTRAS INSTALACIONES
                </h2>
                <div className="mt-8 grid grid-cols-2 auto-rows-[120px] gap-3 sm:auto-rows-[160px] md:mt-12 md:grid-cols-4 md:auto-rows-[200px] md:gap-4">
                    {INSTALACIONES.map((instalacion) => (
                        <div
                            key={instalacion.id}
                            className={`group relative overflow-hidden rounded-2xl ${instalacion.className}`}
                        >
                            <Image
                                src={instalacion.src}
                                alt={instalacion.alt}
                                fill
                                sizes={instalacion.sizes}
                                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
