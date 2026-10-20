'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { CustomEase } from 'gsap/CustomEase';
import './scale-slider.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin, CustomEase);
    CustomEase.create('annnimate', 'M0,0 C0.3,0.9 0.1,1 1,1');
    CustomEase.create('annnimateInOut', 'M0,0 C0.7,0 0.16,1 1,1');
}

const DEFAULT_IMAGES: string[] = [
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_profile_06.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_profile_01.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_cap-profile_02.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_cap-profile_01.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_profile_09.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_profile_07.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/silhouette_eyewear-silhouette_01.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_profile_02.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_profile_10.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_eyewear-profile_01.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_silhouette_01.jpg?width=1600',
    'https://annnimate.b-cdn.net/preview-assets/vanta/roster_cap-silhouette_01.jpg?width=1600',
];

const EASE_KEY = 'annnimateInOut';
const OVERLAP = 1.5;
const SCROLL_DAMP = 0.9;

export interface ScaleSliderHandle {
    next: () => void;
    prev: () => void;
    goTo: (j: number) => void;
}

export interface ScaleSliderProps {
    /** Clases CSS adicionales para el contenedor */
    className?: string;
    /** URLs de las imágenes, una por tarjeta (mínimo 3) */
    images?: string[];
    /** Textos alternativos de las imágenes, en el mismo orden que `images` */
    imageAlts?: string[];
    /** Etiqueta accesible del carrusel */
    ariaLabel?: string;
    /** Borde al que se ancla la tarjeta principal ('rtl' | 'ltr') */
    direction?: 'rtl' | 'ltr';
    /** Cantidad de tarjetas que componen el viewport ('auto' | number) */
    count?: 'auto' | number;
    /** Tamaño relativo de la tarjeta más pequeña (0.05 a 0.8) */
    minScale?: number;
    /** Velocidad de deslizamiento automático continuo (0 = inactivo) */
    autoplay?: number;
    /** Sensibilidad del arrastre táctil/ratón */
    drag?: number;
    /** Intensidad con la que el scroll de la página acelera el carrusel */
    scroll?: number;
    /** Sesgo vertical del recorte de imagen (0 a 1) */
    focusY?: number;
    /** Radio de borde de las tarjetas en píxeles */
    radius?: number;
    /** Nivel de profundidad del efecto parallax de escala */
    parallax?: number;
}

interface CardItem {
    el: HTMLDivElement;
    img: HTMLImageElement;
}

const ScaleSlider = forwardRef<ScaleSliderHandle, ScaleSliderProps>(function ScaleSlider({
    className = '',
    images = DEFAULT_IMAGES,
    imageAlts,
    ariaLabel = 'Galería de imágenes',
    direction = 'rtl',
    count = 'auto',
    minScale = 0.3,
    autoplay = 0.0016,
    drag = 0.0012,
    scroll = 0.0002,
    focusY = 0.22,
    radius = 0,
    parallax = 0,
}, ref) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const sceneRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const prevBtnRef = useRef<HTMLButtonElement | null>(null);
    const nextBtnRef = useRef<HTMLButtonElement | null>(null);
    const apiRef = useRef<ScaleSliderHandle>({
        next: () => { },
        prev: () => { },
        goTo: () => { },
    });

    cardRefs.current = [];

    function setCardRef(el: HTMLDivElement | null) {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    }

    useImperativeHandle(ref, () => ({
        next: () => apiRef.current.next(),
        prev: () => apiRef.current.prev(),
        goTo: (j: number) => apiRef.current.goTo(j),
    }), []);

    useGSAP(() => {
        const scene = sceneRef.current;
        const wrap = wrapRef.current;
        if (!scene || !wrap) return;

        const cards: CardItem[] = cardRefs.current
            .map((el) => ({ el, img: el.querySelector('img') as HTMLImageElement }))
            .filter((c): c is CardItem => c.img !== null);

        const M = cards.length;
        if (M < 3) return;
        const prevBtn = prevBtnRef.current;
        const nextBtn = nextBtnRef.current;

        // --- Config ---
        const DIRECTION = direction === 'ltr' ? 'ltr' : 'rtl';
        const COUNT_ATTR = count || 'auto';
        const MIN_SCALE = Math.min(0.8, Math.max(0.05, Number(minScale)));
        const AUTOPLAY = Number(autoplay);
        const DRAG = Number(drag);
        const SCROLL = Number(scroll);
        const FOCUS_Y = Number(focusY);
        const RADIUS = Number(radius);
        const PARALLAX = Math.max(0, Number(parallax));

        const DRAG_SIGN = DIRECTION === 'ltr' ? -1 : 1;
        const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // --- State ---
        let viewW = 1;
        let viewH = 1;
        let base = 100;
        let visCount = 5;
        let rampR = 1.35;
        let rampK = 1;
        let rampXv = 0;
        let travel = 0;
        let dragX = 0;
        let scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
        let scrollBoost = 0;
        let running = true;
        let dragInstance: globalThis.Draggable | null = null;
        let navTween: gsap.core.Tween | null = null;
        let resizeTimer: ReturnType<typeof setTimeout> | null = null;

        // --- Helpers ---
        function phaseNow() {
            return travel - Math.floor(travel);
        }

        function computeCount(): number {
            if (COUNT_ATTR !== 'auto') {
                return Math.max(3, Math.min(M - 1, parseInt(String(COUNT_ATTR), 10) || 5));
            }
            const aspect = viewW / viewH;
            return aspect >= 2.2 ? 6 : aspect >= 1.5 ? 5 : aspect >= 1.0 ? 4 : 3;
        }

        function computeRamp() {
            rampR = Math.pow(1 / MIN_SCALE, 1 / (visCount - 1));
            rampK = viewW / (1 - MIN_SCALE);
            rampXv = -MIN_SCALE * rampK;
        }

        function boundary(k: number): number {
            return rampXv + rampK * Math.pow(rampR, phaseNow() - k);
        }

        function landedForImage(j: number): number {
            const n = ((j % M) + M) % M;
            return n + M * Math.round((travel - n) / M);
        }

        // --- Animation routines ---
        function positionCards() {
            const shift = Math.floor(travel);
            for (let i = 0; i < M; i++) {
                const card = cards[i];
                if (!card) continue;
                const el = card.el;
                const k = (((i - shift) % M) + M) % M;
                const outer = boundary(k);
                const inner = boundary(k + 1);
                const size = Math.max(outer - inner, 1);
                const w = size + OVERLAP;
                const left = DIRECTION === 'ltr' ? (viewW - outer) : (inner - OVERLAP);
                const fscale = w / base;

                el.style.zIndex = String(visCount - k);
                el.style.transform = 'translate3d(' + left.toFixed(1) + 'px,0,0) scale(' + fscale.toFixed(5) + ')';

                if (PARALLAX > 0 && k < visCount) {
                    const cx = left + w / 2;
                    let tailDist = DIRECTION === 'ltr' ? (viewW - cx) / viewW : cx / viewW;
                    tailDist = tailDist < 0 ? 0 : tailDist > 1 ? 1 : tailDist;
                    const zoom = 1 + PARALLAX * tailDist;
                    card.img.style.transform = 'scale(' + zoom.toFixed(4) + ')';
                }
            }
        }

        function animateTo(target: number) {
            if (navTween) navTween.kill();
            const proxy = { t: travel };
            const dur = Math.min(1.1, 0.45 + 0.12 * Math.abs(target - travel));
            navTween = gsap.to(proxy, {
                t: target,
                duration: dur,
                ease: typeof CustomEase !== 'undefined' ? EASE_KEY : 'power3.inOut',
                onUpdate: () => {
                    travel = proxy.t;
                    positionCards();
                },
                onComplete: () => {
                    navTween = null;
                },
            });
        }

        function goForward() { animateTo(Math.round(travel) - 1); }
        function goBackward() { animateTo(Math.round(travel) + 1); }
        function goToImage(j: number) { animateTo(landedForImage(j)); }

        function frame() {
            if (!running) return;
            const sy = window.scrollY || 0;
            const scrollDelta = sy - scrollY;
            scrollY = sy;
            if (navTween) {
                dragX = 0;
                return;
            }

            scrollBoost = scrollBoost * SCROLL_DAMP + Math.abs(scrollDelta) * SCROLL;
            travel += dragX * DRAG * DRAG_SIGN - (reducedMotion ? 0 : AUTOPLAY) - scrollBoost;
            dragX = 0;
            positionCards();
        }

        function resize() {
            if (!scene) return;
            const w = scene.clientWidth;
            const h = scene.clientHeight;
            if (!w || !h) return;
            viewW = w;
            viewH = h;
            visCount = computeCount();
            computeRamp();

            const maxHero = rampK * (rampR - 1);
            base = (maxHero + OVERLAP) * (1 + PARALLAX);
            const px = base.toFixed(1) + 'px';
            for (let i = 0; i < M; i++) {
                const card = cards[i];
                if (card) {
                    card.el.style.width = px;
                    card.el.style.height = px;
                }
            }
            positionCards();
        }

        function initDrag() {
            if (typeof Draggable === 'undefined') return;
            const proxy = document.createElement('div');
            const instances = Draggable.create(proxy, {
                type: 'x',
                trigger: scene,
                inertia: typeof InertiaPlugin !== 'undefined',
                allowContextMenu: true,
                dragClickables: true,
                onDragStart: function () {
                    if (navTween) {
                        navTween.kill();
                        navTween = null;
                    }
                },
                onDrag: function () {
                    dragX += this.deltaX;
                },
                onThrowUpdate: function () {
                    dragX += this.deltaX;
                },
            });
            dragInstance = instances[0] || null;
        }

        function onKeydown(e: KeyboardEvent) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                (DIRECTION === 'ltr' ? goBackward : goForward)();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                (DIRECTION === 'ltr' ? goForward : goBackward)();
            }
        }
        wrap.addEventListener('keydown', onKeydown);

        function onPrev() { goBackward(); }
        function onNext() { goForward(); }
        if (prevBtn) prevBtn.addEventListener('click', onPrev);
        if (nextBtn) nextBtn.addEventListener('click', onNext);

        const ro = new ResizeObserver(() => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 150);
        });
        ro.observe(scene);

        function onVis() {
            running = !document.hidden;
        }
        document.addEventListener('visibilitychange', onVis);

        // --- Initial DOM state ---
        const objPos = '50% ' + (FOCUS_Y * 100).toFixed(1) + '%';
        for (let i = 0; i < M; i++) {
            const card = cards[i];
            if (card) {
                card.img.style.objectPosition = objPos;
                if (RADIUS > 0) card.el.style.borderRadius = RADIUS + 'px';
            }
        }
        resize();
        for (let i = 0; i < M; i++) {
            const card = cards[i];
            if (card) card.el.style.display = 'block';
        }
        initDrag();

        gsap.ticker.add(frame);
        gsap.ticker.lagSmoothing(0);

        // --- Public API ---
        apiRef.current = {
            next: () => goForward(),
            prev: () => goBackward(),
            goTo: (j: number) => goToImage(j),
        };

        return () => {
            running = false;
            gsap.ticker.remove(frame);
            if (resizeTimer) clearTimeout(resizeTimer);
            if (navTween) navTween.kill();
            if (dragInstance) dragInstance.kill();
            ro.disconnect();
            document.removeEventListener('visibilitychange', onVis);
            wrap.removeEventListener('keydown', onKeydown);
            if (prevBtn) prevBtn.removeEventListener('click', onPrev);
            if (nextBtn) nextBtn.removeEventListener('click', onNext);
        };
    }, {
        scope: wrapRef,
        dependencies: [images, direction, count, minScale, autoplay, drag, scroll, focusY, radius, parallax],
    });

    return (
        <div
            ref={wrapRef}
            className={'scs_wrap' + (className ? ' ' + className : '')}
            data-anm-scale-slider
            role="group"
            aria-label={ariaLabel}
            aria-roledescription="carousel"
            tabIndex={0}
        >
            <div className="scs_scene" ref={sceneRef} data-anm-scale-slider-scene>
                {images.map((src, i) => (
                    <div className="scs_card" key={i} ref={setCardRef} data-anm-scale-slider-card>
                        <img className="scs_img" src={src} alt={imageAlts?.[i] ?? ''} draggable={false} />
                    </div>
                ))}
            </div>

            <div className="scs_pill" role="group" aria-label="Controles del carrusel">
                <button className="scs_arrow" ref={prevBtnRef} data-anm-scale-slider-prev type="button" aria-label="Anterior">
                    <svg className="scs_arrow_icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className="scs_arrow" ref={nextBtnRef} data-anm-scale-slider-next type="button" aria-label="Siguiente">
                    <svg className="scs_arrow_icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
});

export default ScaleSlider;