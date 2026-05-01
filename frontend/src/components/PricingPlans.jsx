import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const assetUrl = (name) => new URL(`../assets/images/${name}`, import.meta.url).href;

const SECTION_IMAGES = [
  'about-us-20x7.png',
  'about-us-450x169.png',
  'about-us.png.webp',
  'agreement-2548138_1920.jpg.webp',
  'digitalmarketing-1.jpg.webp',
  'eMarketingate-analytics-1.png.webp',
  'Emarketingate-Background-1.jpg',
  'eMarketingate-Icons-1.png',
  'eMarketingate-Icons-2.png',
  'eMarketingate-Icons-3.png',
  'eMarketingate-Icons-4.png',
  'eMarketingate-Icons-5.png',
  'eMarketingate-Icons-6.png',
  'EMG-eMarketingate.jpg',
  'header_img.png.webp',
  'right_security_image.png',
  'Slide1.jpg.webp',
  'Slide2.jpg.webp',
  'Slide3.jpg.webp',
  'Slide5.jpg.webp',
  'Slide7.jpg.webp',
  'Slide8.jpg.webp',
  'Slide9.jpg.webp',
  'Slide10.jpg.webp',
  'Slide11.jpg.webp',
  'Slide12.jpg.webp',
  'Slide13.jpg.webp',
];

const defaultPlans = [
  {
    title: 'الأساسي',
    price: '$499',
    features: [
      'تدقيق واستراتيجية تحسين محركات البحث',
      'إدارة إعلانات Google',
      '5 منشورات شهريًا على المنصات',
      'تقرير تحليلي شهري',
      'دعم عبر البريد الإلكتروني',
    ],
    cta_label: 'ابدأ الآن',
    cta_url: '#contact',
    popular: false,
  },
  {
    title: 'النمو',
    price: '$1,199',
    features: [
      'كل ما في الخطة الأساسية',
      'تسويق محتوى (8 مقالات/منشورات)',
      'تحسين معدل التحويل',
      'إدارة حملات PPC',
      'مكالمات استراتيجية كل أسبوعين',
      'دعم أولوية',
    ],
    cta_label: 'ابدأ النمو',
    cta_url: '#contact',
    popular: true,
  },
  {
    title: 'الشركات',
    price: '$2,999',
    features: [
      'كل ما في خطة النمو',
      'مدير حساب مخصص',
      'استراتيجية علامة مخصصة',
      'شراكات مؤثرين',
      'مراجعات أداء أسبوعية',
      'تهيئة متميزة',
      'دعم أولوية 24/7',
    ],
    cta_label: 'تواصل مع المبيعات',
    cta_url: '#contact',
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function PricingPlans({ plans = defaultPlans }) {
  const CheckIcon = Icons?.Check || Icons.HelpCircle;
  const SparklesIcon = Icons?.Sparkles || Icons.Star;

  return (
    <section
      id="pricing"
      className="relative w-full bg-[#12142A] overflow-hidden px-4 py-24 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#FF7752]/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-400/6 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: SECTION_IMAGES.map((n) => `url(${assetUrl(n)})`).join(', '),
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
            backgroundPosition: '0 0, 64px 64px, 32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF7752]/30 bg-[#FF7752]/10 text-[#FF7752] text-sm font-semibold font-inter tracking-wider uppercase mb-5">
            <SparklesIcon size={14} />
            تسعير واضح
          </span>
          <h2 className="font-inter font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
            خطط مصممة من أجل{' '}
            <span className="bg-gradient-to-r from-[#FF7752] to-orange-300 bg-clip-text text-transparent">
              نمو حقيقي
            </span>
          </h2>
          <p className="font-inter text-white/50 text-lg max-w-xl mx-auto">
            بدون رسوم خفية. بدون عقود مُلزمة. وسّع استثمارك التسويقي مع نمو أعمالك.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch justify-center"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.title}
              variants={cardVariants}
              whileHover={{
                scale: 1.025,
                boxShadow: plan.popular
                  ? '0 0 48px 8px rgba(255,119,82,0.28)'
                  : '0 0 36px 6px rgba(255,119,82,0.14)',
              }}
              className={[
                'relative flex flex-col flex-1 rounded-2xl p-8 md:p-10 border transition-all duration-300 cursor-default',
                plan.popular
                  ? 'border-[#FF7752]/60 bg-gradient-to-b from-[#202244] to-[#1a1c3a] shadow-[0_0_32px_4px_rgba(255,119,82,0.18)]'
                  : 'border-white/10 bg-[#202244]/60 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
              ].join(' ')}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF7752] to-orange-400 text-white text-xs font-bold font-inter tracking-widest uppercase shadow-lg shadow-orange-500/30">
                    <Icons.Star size={11} fill="white" />
                    الأكثر شيوعًا
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-inter font-bold text-2xl text-white mb-1 tracking-tight">
                  {plan.title}
                </h3>
                {plan.popular && (
                  <p className="font-inter text-[#FF7752] text-xs font-semibold uppercase tracking-wider">
                    أفضل قيمة
                  </p>
                )}
              </div>

              <div className="mb-8 pb-8 border-b border-white/8">
                <div className="flex items-end gap-1">
                  <span className="font-inter font-extrabold text-5xl bg-gradient-to-br from-[#FF7752] to-orange-300 bg-clip-text text-transparent leading-none">
                    {plan.price}
                  </span>
                  <span className="font-inter text-white/40 text-base mb-1.5">/شهريًا</span>
                </div>
              </div>

              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className={[
                        'mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center',
                        plan.popular
                          ? 'bg-gradient-to-br from-[#FF7752] to-orange-400'
                          : 'bg-[#FF7752]/15 border border-[#FF7752]/30',
                      ].join(' ')}
                    >
                      <CheckIcon
                        size={11}
                        className={plan.popular ? 'text-white' : 'text-[#FF7752]'}
                        strokeWidth={3}
                      />
                    </span>
                    <span className="font-inter text-white/75 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.cta_url || '#contact'}
                className={[
                  'group w-full flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-inter font-bold text-base tracking-wide transition-all duration-300',
                  plan.popular
                    ? 'bg-gradient-to-r from-[#FF7752] to-orange-400 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:brightness-110 active:scale-95'
                    : 'border border-[#FF7752]/40 text-[#FF7752] bg-[#FF7752]/5 hover:bg-[#FF7752]/15 hover:border-[#FF7752]/70 active:scale-95',
                ].join(' ')}
              >
                {plan.cta_label || 'ابدأ الآن'}
                <Icons.ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center font-inter text-white/30 text-sm mt-10"
        >
          جميع الخطط تتضمن تجربة مجانية لمدة 14 يومًا. يمكنك الإلغاء في أي وقت. لا حاجة لبطاقة ائتمان.
        </motion.p>
      </div>
    </section>
  );
}

export default PricingPlans;
