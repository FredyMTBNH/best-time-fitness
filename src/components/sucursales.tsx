import Button from "./button";
import { jakarta, syne } from "./fonts";

interface Sucursal {
    id: number;
    titulo: string;
    subtitulo: string;
    mapTitle: string;
    mapSrc: string;
    mapLink: string;
    reverse: boolean;
}

const SUCURSALES: Sucursal[] = [
    {
        id: 1,
        titulo: "BestTime Fitness",
        subtitulo: "Sucursal Cumbres",
        mapTitle: "Mapa de Best Time Fitness Sucursal Cumbres",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28744.483309590618!2d-100.424531!3d25.768568!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866290b11712863f%3A0x2648fad4158a4fa3!2sBest%20Time%20Fitness%20Suc.%20Cumbres.!5e0!3m2!1ses!2sus!4v1792458837816!5m2!1ses!2sus",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Best+Time+Fitness+Suc.+Cumbres",
        reverse: false,
    },
    {
        id: 2,
        titulo: "BestTime Fitness",
        subtitulo: "Sucursal Sur de Monterrey",
        mapTitle: "Mapa de Best Time Fitness Sucursal Sur de Monterrey",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.252459550096!2d-100.2527393!3d25.596525900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662c1155b13296d%3A0xc5e0c932f6b8f78a!2sBest%20Time%20Fitness%20Suc.%20Via%20la%20Luz!5e0!3m2!1ses!2smx!4v1792459411380!5m2!1ses!2smx",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Best+Time+Fitness+Suc.+Via+la+Luz",
        reverse: true,
    },
];

export default function Sucursales() {
    return (
        <section id="sucursales" aria-labelledby="sucursales-heading" className="scroll-mt-24 bg-mist-300 px-4 py-12 md:scroll-mt-28 md:py-16">
            <div className="mx-auto max-w-6xl">
                <h2
                    id="sucursales-heading"
                    className={`${syne.className} text-center font-bold leading-none tracking-tight text-stone-950 text-3xl md:text-4xl`}
                >
                    SUCURSALES
                </h2>
                <div className="mt-8 space-y-12 md:mt-12 md:space-y-16">
                    {SUCURSALES.map((sucursal) => (
                        <div
                            key={sucursal.id}
                            className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
                        >
                            <div className={sucursal.reverse ? "md:order-2 md:text-right" : ""}>
                                <h3
                                    className={`${syne.className} text-2xl font-bold tracking-tight text-stone-950 md:text-3xl`}
                                >
                                    {sucursal.titulo}
                                </h3>
                                <p
                                    className={`${jakarta.className} mt-2 text-lg font-semibold text-stone-950/70 md:text-xl`}
                                >
                                    {sucursal.subtitulo}
                                </p>
                                <div
                                    className={`mt-6 flex justify-start ${sucursal.reverse ? "md:justify-end" : ""
                                        }`}
                                >
                                    <Button
                                        relleno="negro"
                                        textoBoton="Horarios"
                                        icon="clock"
                                        href={sucursal.mapLink}
                                    />
                                </div>
                            </div>
                            <div
                                className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-stone-950/10 bg-stone-950/5 ${sucursal.reverse ? "md:order-1" : ""
                                    }`}
                            >
                                <iframe
                                    src={sucursal.mapSrc}
                                    title={sucursal.mapTitle}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    className="absolute inset-0 h-full w-full"
                                    style={{ border: 0 }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
