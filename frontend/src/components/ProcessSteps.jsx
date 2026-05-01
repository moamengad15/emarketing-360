import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const defaultSteps = [
  {
    icon: 'Search',
    label: 'استكشاف وتدقيق',
    description: 'نحلل علامتك ومنافسيك وجمهورك لاكتشاف فرص النمو.',
  },
  {
    icon: 'BarChart2',
    label: 'مخطط الاستراتيجية',
    description: 'خطة طريق مدعومة بالبيانات لمواءمة كل قناة تسويقية مع أهداف الإيرادات.',
  },
  {
    icon: 'Layers',
    label: 'تنفيذ إبداعي',
    description: 'نبني أصولًا قوية: نصوصًا ومرئيات ومسارات تحويل مصممة لرفع الأداء.',
  },
  {
    icon: 'Rocket',
    label: 'إطلاق وتوسّع',
    description: 'نطلق الحملات عبر القنوات باستهداف دقيق وتحسين فوري.',
  },
  {
    icon: 'TrendingUp',
    label: 'قياس ونمو',
    description: 'تحليلات مستمرة تكشف رؤى تُضاعف النتائج شهرًا بعد شهر.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.4,
    },
  },
};

export default function ProcessSteps({ steps = defaultSteps }) {
  const resolvedSteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="relative px-6 py-20 overflow-hidden bg-[#12142A]">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-orange-500 blur-[120px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-rose-500 blur-[100px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
            كيف نعمل
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-inter leading-tight">
            منهجيتنا
            <span className="ml-3 bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
              المثبتة
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-base leading-relaxed font-inter">
            منهجية منظمة وقابلة للتكرار تحوّل الغموض إلى نمو تسويقي قابل للقياس.
          </p>
        </motion.div>

        <div
          className="overflow-x-auto pb-6 md:overflow-visible md:pb-0"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-row gap-0 min-w-max md:min-w-0 md:grid md:gap-6"
            style={{
              gridTemplateColumns: `repeat(${resolvedSteps.length}, minmax(0, 1fr))`,
            }}
          >
            {resolvedSteps.map((step, index) => {
              const IconComponent = Icons[step.icon] || Icons.HelpCircle;
              const isLast = index === resolvedSteps.length - 1;

              return (
                <div key={index} className="relative flex flex-col items-center w-56 md:w-auto">
                  {!isLast && (
                    <div
                      className="hidden md:block absolute top-[52px] left-[calc(50%+44px)] right-[calc(-50%+44px)] h-px z-0"
                      aria-hidden="true"
                    >
                      <div className="relative w-full h-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700" />
                        <motion.div
                          variants={lineVariants}
                          className="absolute inset-0 origin-left bg-gradient-to-r from-orange-500 to-rose-500"
                        />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-rose-500" />
                      </div>
                    </div>
                  )}

                  {!isLast && (
                    <div
                      className="md:hidden absolute top-[52px] right-[-1px] w-8 h-px z-0"
                      aria-hidden="true"
                    >
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-rose-500" />
                      </div>
                    </div>
                  )}

                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group relative z-10 w-full flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm cursor-default"
                    style={{
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
                    }}
                    aria-label={`Step ${index + 1}: ${step.label}`}
                  >
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-white text-xs font-bold font-inter shadow-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div
                      className="relative mb-6 mt-4 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-500/20 to-rose-500/20 border border-orange-500/25 group-hover:from-orange-500/30 group-hover:to-rose-500/30 group-hover:border-orange-500/40 transition-all duration-300"
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      <IconComponent
                        className="w-7 h-7 text-orange-400 group-hover:text-orange-300 transition-colors duration-300"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="text-base font-bold text-white font-inter leading-snug mb-2 group-hover:text-orange-100 transition-colors duration-300">
                      {step.label}
                    </h3>

                    <p className="text-sm text-slate-400 font-inter leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      {step.description}
                    </p>

                    <div
                      className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl bg-gradient-to-r from-orange-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
