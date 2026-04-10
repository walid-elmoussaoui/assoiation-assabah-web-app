import { ExternalLink, Images, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type GlobImgModule = { default: string };

const FACEBOOK_URL = "https://www.facebook.com/assabahautisme";

function getActivityImages(): string[] {
  // Put your activity images in: `src/components/img/`
  // Example: `src/components/img/activity-1.jpg`
  const modules = import.meta.glob<GlobImgModule>("../components/img/**/*.{png,jpg,jpeg,webp,svg,gif}", {
    eager: true,
  });

  return Object.keys(modules)
    .sort((a, b) => a.localeCompare(b))
    .map((k) => modules[k]?.default)
    .filter(Boolean);
}

export default function Activities() {
  const images = getActivityImages();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeSrc = useMemo(() => {
    if (activeIndex === null) return null;
    return images[activeIndex] ?? null;
  }, [activeIndex, images]);

  const close = () => setActiveIndex(null);
  const prev = () => {
    if (!images.length || activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };
  const next = () => {
    if (!images.length || activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") next(); // RTL-friendly: left goes forward visually
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, images.length]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Activités</h1>
          <div className="w-12 sm:w-16 h-1 bg-yellow-400 rounded-full" />
          <p className="text-slate-600 mt-3 sm:mt-4 text-sm sm:text-base">
            Photos des activités de l'association. Pour plus d'images et de détails, visitez notre page Facebook.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-10 text-center">
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
              <Images className="w-6 h-6 sm:w-7 sm:h-7 text-slate-600" />
            </div>
            <p className="text-slate-700 font-medium text-sm sm:text-base">
              Aucune image trouvée pour le moment.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Ajoutez des images dans <span className="font-mono">src/components/img</span> puis redémarrez.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {images.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="group block overflow-hidden rounded-3xl border border-white/50 bg-white shadow-sm hover:shadow-md transition-shadow"
                aria-label="Open image"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={src}
                    alt={`Activity ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* Subtle “professional” look: soft vignette + highlight */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-900/10 via-transparent to-white/10" />
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 sm:mt-12 text-center">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 sm:px-8 py-2.5 sm:py-3 text-white font-semibold hover:bg-primary-700 transition-colors shadow-sm text-sm sm:text-base"
          >
            Pour en voir plus, visitez notre page Facebook
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {activeSrc && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={close}
              className="absolute -top-3 -left-3 z-10 rounded-full bg-white/90 p-2 shadow hover:bg-white transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-slate-800" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute top-1/2 -right-3 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronRight className="h-6 w-6 text-slate-800" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute top-1/2 -left-3 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronLeft className="h-6 w-6 text-slate-800" />
                </button>
              </>
            )}

            <div className="overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
              <img
                src={activeSrc}
                alt="Activity"
                className="max-h-[80vh] w-full object-contain bg-black"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

