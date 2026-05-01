import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function CTABanner({
  headline = 'هل أنت جاهز لتنمية أعمالك عبر الإنترنت؟',
  subtext = 'انضم إلى أكثر من 500 علامة تجارية تثق بنا لتحقيق نتائج حقيقية عبر تسويق رقمي قائم على البيانات.',
  cta_label = 'احصل على مكالمة استراتيجية مجانية',
  cta_link = '#contact',
}) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative bg-gradient-to-r from-orange-500 via-orange-400 to-rose-500 py-12 px-6 md:px-12">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-8 md:px-16">
          <Icons.Zap
            size={96}
            strokeWidth={1}
            className="text-white opacity-10 -rotate-12"
          />
          <Icons.TrendingUp
            size={96}
            strokeWidth={1}
            className="text-white opacity-10 rotate-12"
          />
        </div>

        <div className="pointer-events-none absolute top-4 left-1/4 text-white opacity-5">
          <Icons.BarChart2 size={64} strokeWidth={1} />
        </div>
        <div className="pointer-events-none absolute bottom-4 right-1/4 text-white opacity-5">
          <Icons.Target size={64} strokeWidth={1} />
        </div>

        <div className="relative z-10 mx-auto flex max-w-screen-xl flex-col items-center gap-5 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="font-inter text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="font-inter max-w-xl text-base font-normal text-white/85 md:text-lg"
          >
            {subtext}
          </motion.p>

          <motion.a
            href={cta_link}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: '#ffffff',
              color: '#f97316',
              boxShadow: '0 8px 32px 0 rgba(255,255,255,0.35)',
            }}
            whileTap={{ scale: 0.98 }}
            className="font-inter mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition-colors duration-300 md:text-lg"
          >
            {cta_label}
            <Icons.ArrowRight size={18} strokeWidth={2.5} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}