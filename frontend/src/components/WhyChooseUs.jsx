import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function IconCircle({ iconName }) {
  const IconComponent = Icons[iconName] || Icons.HelpCircle;
  return (
    <div className="relative flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/30 to-orange-600/20 backdrop-blur-sm border border-orange-400/25" />
      <IconComponent
        size={20}
        className="relative z-10 text-orange-400"
        strokeWidth={2}
      />
    </div>
  );
}

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      className="group relative flex flex-col gap-4 bg-[#151728]/95 border border-white/[0.07] rounded-2xl p-6 md:p-8 cursor-default overflow-hidden"
      style={undefined}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-orange-500/[0.06] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={undefined}
      />

      <IconCircle iconName={feature.icon} />

      <div className="flex flex-col gap-2">
        <h3 className="text-white font-inter font-semibold text-base leading-snug tracking-tight">
          {feature.title}
        </h3>
        <p className="text-gray-400 font-inter font-normal text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs({ features = [] }) {
  const defaultFeatures = [
    {
      icon: 'Zap',
      title: 'تنفيذ سريع للغاية',
      description: 'نطلق الحملات والأصول الإبداعية بسرعة غير مسبوقة دون التفريط بالجودة أو العمق الاستراتيجي.',
    },
    {
      icon: 'TrendingUp',
      title: 'نمو قائم على البيانات',
      description: 'كل قرار مدعوم بتحليلات حقيقية. نُحسّن باستمرار لتعظيم العائد ومعدلات التحويل.',
    },
    {
      icon: 'Shield',
      title: 'تنفيذ يحافظ على العلامة',
      description: 'سلامة علامتك غير قابلة للتنازل. نطبق معايير جودة صارمة عبر كل قناة ومخرجات إبداعية.',
    },
    {
      icon: 'Users',
      title: 'فريق خبراء مخصص',
      description: 'استراتيجيون ومصممون ومهندسون بخبرة عالية يعملون كفريق واحد متوافق مع أهداف عملك.',
    },
    {
      icon: 'Globe',
      title: 'انتشار عالمي',
      description: 'خبرات متعددة الأسواق وحملات محلية تُخاطب الثقافات والمناطق الزمنية بفعالية.',
    },
    {
      icon: 'Star',
      title: 'سجل نتائج مثبت',
      description: 'أكثر من 200 علامة توسعت معنا. نتائجنا تتحدث: ثابتة، قابلة للقياس، وقابلة للتكرار.',
    },
  ];

  const resolvedFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <section className="relative z-[12] w-full py-20 md:py-28 bg-[#12142A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-orange-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-orange-600/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/20 text-orange-400 text-xs font-inter font-medium tracking-widest uppercase mb-5">
            <Icons.CheckCircle size={12} strokeWidth={2.5} />
            لماذا تختارنا
          </span>
          <h2 className="text-white font-inter font-bold text-3xl md:text-4xl lg:text-[2.75rem] leading-tight tracking-tight max-w-2xl">
            ميزة الوكالة التي{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              لا يمكن تجاهلها
            </span>
          </h2>
          <p className="mt-4 text-gray-400 font-inter font-normal text-base md:text-lg leading-relaxed max-w-xl">
            نجمع بين دقة الاستراتيجية وجرأة الإبداع لنحقق نتائج تسويقية تتضاعف مع الوقت.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {resolvedFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
