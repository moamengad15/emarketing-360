import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import heroImage from '../assets/images/Slide1.jpg.webp';

function Hero({ headline, subheadline, primary_cta, secondary_cta, hero_img_src }) {
  const resolvedHeadline = headline || 'نمِّ أعمالك عبر تسويق رقمي قائم على البيانات';
  const resolvedSubheadline = subheadline || 'نصمم استراتيجيات أداء تَحوِّل الزوار إلى عملاء أوفياء. من تحسين محركات البحث إلى الإعلانات المدفوعة، نبني علاماتٍ تتصدر القنوات الرقمية.';
  const resolvedPrimary = primary_cta || 'ابدأ اليوم';
  const resolvedSecondary = secondary_cta || 'شاهد أعمالنا';

  const brandLogos = [
    { name: 'HubSpot', icon: 'Layers' },
    { name: 'Salesforce', icon: 'Cloud' },
    { name: 'Shopify', icon: 'ShoppingBag' },
    { name: 'Stripe', icon: 'CreditCard' },
    { name: 'Notion', icon: 'FileText' },
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

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 48, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section className="relative min-h-[60vh] bg-[#12142A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-400/8 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.4) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.4) 40px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <motion.div
          className="flex-1 flex flex-col items-start space-y-6 max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-sm font-inter font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              موثوق به من أكثر من 200 علامة تجارية نامية
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-inter font-bold text-5xl md:text-6xl text-white leading-[1.1] tracking-tight"
          >
            {resolvedHeadline.split(' ').map((word, i) => {
              const isAccent = ['Digital', 'Marketing', 'Data-Driven', 'Grow'].includes(word);
              return (
                <span
                  key={i}
                  className={isAccent ? 'bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent' : ''}
                >
                  {word}{' '}
                </span>
              );
            })}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-inter text-base md:text-lg text-gray-400 leading-relaxed"
          >
            {resolvedSubheadline}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-inter font-semibold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:shadow-xl transition-shadow duration-300 cursor-pointer whitespace-nowrap"
            >
              <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {resolvedPrimary}
              <Icons.ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border-2 border-orange-500/60 text-white font-inter font-semibold text-base hover:bg-orange-500/10 hover:border-orange-400 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              {resolvedSecondary}
              <Icons.Play className="w-4 h-4 text-orange-400" />
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4 w-full">
            <p className="text-gray-500 text-xs font-inter uppercase tracking-widest mb-4">موثوق به من روّاد المجال</p>
            <div className="flex flex-wrap items-center gap-6">
              {brandLogos.map((brand, idx) => {
                const IconComponent = Icons?.[brand.icon] || Icons.HelpCircle;
                return (
                  <motion.div
                    key={brand.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 0.4, ease: 'easeOut' }}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors duration-200 cursor-default"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-inter font-medium text-sm">{brand.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 relative flex items-center justify-center w-full max-w-lg lg:max-w-none"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-rose-500/10 rounded-[32px] blur-2xl scale-90" />

          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="relative z-10 w-full"
          >
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[28px] p-2 shadow-2xl shadow-black/40">
              <img
                src={hero_img_src || heroImage}
                alt="لوحة تحكم التسويق الرقمي"
                className="w-full h-auto rounded-[20px] object-cover aspect-[4/3]"
                onError={(e) => {
                  e.currentTarget.src = heroImage;
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: 'easeOut' }}
                className="absolute -top-4 -left-4 bg-[#202244] border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg shadow-black/30"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                  <Icons.TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-inter font-bold text-sm leading-none">+248%</p>
                  <p className="text-gray-400 font-inter text-xs mt-0.5">متوسط زيادة العائد</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5, ease: 'easeOut' }}
                className="absolute -bottom-4 -right-4 bg-[#202244] border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg shadow-black/30"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <Icons.Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-inter font-bold text-sm leading-none">12,400+</p>
                  <p className="text-gray-400 font-inter text-xs mt-0.5">عملاء محتملون</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.4, ease: 'easeOut' }}
                className="absolute top-4 right-4 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <Icons.Zap className="w-3.5 h-3.5 text-orange-400" />
                <span className="font-inter text-orange-300 text-xs font-medium">تحليلات مباشرة</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
