import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import avatarImage from '../assets/images/logo.jpeg';

const VISIBLE_COUNT = 3;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

function StarRow({ count }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => {
        const StarIcon = Icons.Star;
        return (
          <StarIcon
            key={i}
            size={16}
            className={i < count ? 'text-orange-400 fill-orange-400' : 'text-slate-600 fill-slate-600'}
          />
        );
      })}
    </div>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className="flex flex-col h-full rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/30 hover:border-orange-400/30 hover:bg-white/8 transition-all duration-300">
      <StarRow count={item.stars} />
      <p className="text-white/90 italic text-sm leading-relaxed flex-1 mb-6">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <img
          src={item.photo_url}
          alt={item.name}
          onError={(e) => {
            e.currentTarget.src = avatarImage;
          }}
          className="w-10 h-10 rounded-full object-cover border-2 border-orange-400/40 shrink-0"
        />
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold truncate">{item.name}</p>
          <p className="text-slate-400 text-xs truncate">{item.company}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonials({ testimonials = [] }) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  const total = testimonials.length;
  const maxPage = Math.max(0, total - VISIBLE_COUNT);

  const go = useCallback(
    (dir) => {
      setDirection(dir);
      setPage((prev) => {
        const next = prev + dir;
        if (next < 0) return maxPage;
        if (next > maxPage) return 0;
        return next;
      });
    },
    [maxPage]
  );

  useEffect(() => {
    if (!autoplay || total <= VISIBLE_COUNT) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [autoplay, go, total]);

  const visible = testimonials.slice(page, page + VISIBLE_COUNT);

  if (!total) return null;

  return (
    <section
      className="relative w-full py-20 px-8 overflow-hidden"
      style={{}}
      aria-label="آراء العملاء"
    >
      <div
        className="absolute inset-0 -z-10 bg-[#12142A]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-400/8 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">
            ماذا يقول عملاؤنا
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
            موثوق به من علامات تركز على النمو
          </h2>
          <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">
            نتائج حقيقية وعلاقات حقيقية. إليك ما يقوله عملاؤنا عن العمل معنا.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visible.map((item, idx) => (
                <TestimonialCard key={`${page}-${idx}`} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {total > VISIBLE_COUNT && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <motion.button
              onClick={() => go(-1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white hover:border-orange-400/60 hover:text-orange-400 transition-colors duration-200"
              aria-label="الآراء السابقة"
            >
              <Icons.ChevronLeft size={20} />
            </motion.button>

            <div className="flex items-center gap-2">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > page ? 1 : -1);
                    setPage(i);
                  }}
                  aria-label={`الانتقال إلى الشريحة ${i + 1}`}
                  className={[
                    'rounded-full transition-all duration-300',
                    i === page
                      ? 'w-6 h-2 bg-orange-400'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40',
                  ].join(' ')}
                />
              ))}
            </div>

            <motion.button
              onClick={() => go(1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white hover:border-orange-400/60 hover:text-orange-400 transition-colors duration-200"
              aria-label="الآراء التالية"
            >
              <Icons.ChevronRight size={20} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
