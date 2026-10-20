import CardFlip from "@/components/kokonutui/card-flip";
import { WHATSAPP_URL } from "@/lib/links";
import { syne } from './fonts';
import cardsData from './cardsData.json';

export default function Clases() {
    return (
        <section id="clases" className="scroll-mt-24 overflow-x-clip bg-yellow-400 px-4 pb-12 md:scroll-mt-28 md:pb-16">
            <div className="mx-auto max-w-6xl">
                <h2
                    className={`${syne.className} pt-12 text-center font-bold leading-none tracking-tight text-stone-950 text-3xl md:pt-16 md:text-4xl`}
                >
                    CLASES DISPONIBLES
                </h2>
                <div className="mt-8 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
                    {cardsData.map((card) => (
                        <CardFlip
                            key={card.id}
                            title={card.title}
                            subtitle={card.subtitle}
                            description={card.description}
                            features={card.features}
                            imageSrc={card.imageSrc}
                            imageAlt={card.imageAlt}
                            ctaLabel={card.ctaLabel}
                            ctaHref={WHATSAPP_URL}
                        />
                    ))}

                </div>
            </div>
        </section>
    )
}
