'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  src: string;
  alt: string;
};

export function WorkGallery({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative bg-[#f4f1ea]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.src} className="min-w-0 shrink-0 grow-0 basis-full">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full aspect-[16/10] object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-[12px] border border-border bg-bg/80 text-text flex items-center justify-center"
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-[12px] border border-border bg-bg/80 text-text flex items-center justify-center"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={slide.alt}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full ${i === index ? 'w-6 bg-accent' : 'w-1.5 bg-black/25'}`}
          />
        ))}
      </div>
    </div>
  );
}
