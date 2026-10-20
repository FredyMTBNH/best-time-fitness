"use client";

/**
 * @author: @dorianbaffier
 * @description: Card Flip
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { ArrowRight, Repeat2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  imageSrc: string;
  imageAlt?: string;
  imageSizes?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CardFlip({
  title = "Design Systems",
  subtitle = "Explore the fundamentals",
  description = "Dive deep into the world of modern UI/UX design.",
  features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
  imageSrc,
  imageAlt,
  imageSizes = "(max-width: 768px) 100vw, 280px",
  ctaLabel = "Start today",
  ctaHref,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isCtaExternal = !!ctaHref && (/^https?:\/\//.test(ctaHref) || ctaHref.startsWith("//"));
  const ctaClassName = cn(
    "group/start relative w-full",
    "flex min-h-[44px] items-center justify-between",
    "-m-3 rounded-xl p-3",
    "transition-[transform,background] duration-300",
    "bg-yellow-400",
    "hover:scale-[1.02] active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
  );
  const ctaContent = (
    <>
      <span className="font-medium text-sm text-stone-950">
        {ctaLabel}
      </span>
      <div className="group/icon relative">
        <div
          className={cn(
            "absolute inset-[-6px] rounded-lg transition-[transform,opacity] duration-300",
            "bg-stone-950/10",
            "scale-90 opacity-0 group-hover/start:scale-100 group-hover/start:opacity-100"
          )}
        />
        <ArrowRight
          aria-hidden="true"
          className="relative z-10 h-4 w-4 text-stone-950 transition-transform duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110"
        />
      </div>
    </>
  );

  return (
    <div
      className="group relative h-[320px] w-full max-w-[280px] [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`${title} — ${subtitle}. Activar para voltear la tarjeta.`}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-[transform] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]",
          "motion-reduce:transition-none",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            "bg-stone-950",
            "border border-stone-950/40",
            "shadow-[0_10px_30px_-10px_rgba(12,10,9,0.45)]",
            "transition-shadow duration-500",
            "group-hover:shadow-[0_20px_45px_-12px_rgba(12,10,9,0.6)]"
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            sizes={imageSizes}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/10"
          />

          <div className="absolute right-0 bottom-0 left-0 z-10 p-5">
            <div className="flex min-h-[44px] items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="font-semibold text-lg text-white leading-snug tracking-tighter transition-transform duration-500 ease-out-expo group-hover:translate-y-[-4px]">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm text-white/90 tracking-tight transition-transform delay-[50ms] duration-500 ease-out-expo group-hover:translate-y-[-4px]">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative flex h-11 w-11 shrink-0 items-center justify-center">
                <div
                  className={cn(
                    "absolute inset-[-8px] rounded-lg transition-opacity duration-300",
                    "bg-gradient-to-br from-yellow-400/20 via-yellow-400/10 to-transparent"
                  )}
                />
                <Repeat2
                  aria-hidden="true"
                  className="relative z-10 h-4 w-4 text-yellow-400 transition-transform duration-300 group-hover/icon:-rotate-12 group-hover/icon:scale-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl p-6",
            "bg-stone-950",
            "border border-stone-950/40",
            "shadow-[0_10px_30px_-10px_rgba(12,10,9,0.45)]",
            "flex flex-col",
            "transition-shadow duration-500",
            "group-hover:shadow-[0_20px_45px_-12px_rgba(12,10,9,0.6)]"
          )}
        >
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-white leading-snug tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-y-[-2px]">
                {title}
              </h3>
              <p className="line-clamp-2 text-sm text-white/90 tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-y-[-2px]">
                {description}
              </p>
            </div>

            <div className="space-y-2">
              {features.map((feature, index) => (
                <div
                  className="flex items-center gap-2 text-sm text-white/90 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  key={feature}
                  style={{
                    transform: isFlipped
                      ? "translateX(0)"
                      : "translateX(-10px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 50 + 150}ms`,
                  }}
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3 w-3 shrink-0 text-yellow-400"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-yellow-400/20 border-t pt-6">
            {ctaHref ? (
              <a
                className={ctaClassName}
                href={ctaHref}
                target={isCtaExternal ? "_blank" : undefined}
                rel={isCtaExternal ? "noopener noreferrer" : undefined}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
              >
                {ctaContent}
              </a>
            ) : (
              <button className={ctaClassName} type="button">
                {ctaContent}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
