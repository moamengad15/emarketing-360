import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const assetUrl = (name) => new URL(`../assets/images/${name}`, import.meta.url).href;

const SECTION_IMAGES = [
  '001-ruler.png',
  '002-vector.png',
  '004-stamp.png',
  '008-video-player.png',
  '009-website.png',
  '014-social-media.png',
  '014-social-media (1).png',
  '016-design.png',
  '019-palette.png',
  '021-laptop.png',
  '022-analytics.png',
  '022-analytics (1).png',
  '026-ecommerce.png',
  '026-ecommerce (1).png',
  '027-search.png',
  '027-search (1).png',
  '028-website.png',
  '030-website.png',
  '033-font.png',
  '038-funnel.png',
  '043-maintenance.png',
  '043-maintenance (1).png',
  '046-megaphone.png',
  '046-megaphone (1).png',
];

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

const iconVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.15,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
};

function ServicesGrid({ services = [] }) {
  return (
    <section
      id="services"
      className="relative w-full py-24 px-8 overflow-hidden bg-[#12142A]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-orange-400/8 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: SECTION_IMAGES.map((n) => `url(${assetUrl(n)})`).join(', '),
            backgroundRepeat: 'repeat',
            backgroundSize: '96px 96px',
            backgroundPosition: '0 0, 48px 48px, 24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-orange-400 mb-4 font-inter">
            ماذا نقدم
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight font-inter">
            خدمات مصممة من أجل
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> النمو</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-gray-400 text-lg font-inter leading-relaxed">
            من الاستراتيجية إلى التنفيذ، نقدم حلول تسويق رقمي متكاملة
            تحقق نتائج قابلة للقياس وأثرًا مستدامًا لعلامتك.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon] || Icons.HelpCircle;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl cursor-default
                  bg-white/[0.05] backdrop-blur-md
                  border border-white/[0.08]
                  shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.04)]
                  transition-all duration-500 ease-out
                  hover:bg-white/[0.09]
                  hover:border-orange-500/30
                  hover:shadow-[0_8px_48px_rgba(255,119,82,0.18),0_0_0_1px_rgba(255,119,82,0.15),0_20px_60px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-gradient-to-b from-orange-500/[0.04] to-transparent pointer-events-none" />

                <motion.div
                  variants={iconVariants}
                  className="relative z-10 mb-6 flex items-center justify-center w-14 h-14 rounded-2xl
                    bg-gradient-to-br from-orange-400 to-red-500
                    shadow-[0_6px_24px_rgba(255,119,82,0.45)]"
                >
                  <IconComponent
                    size={26}
                    strokeWidth={1.8}
                    className="text-white"
                    aria-hidden="true"
                  />
                </motion.div>

                <h3 className="relative z-10 text-xl font-bold text-white mb-3 font-inter leading-snug">
                  {service.title}
                </h3>

                <p className="relative z-10 text-gray-300 text-sm font-inter leading-relaxed font-normal">
                  {service.description}
                </p>

                <div className="relative z-10 mt-6 flex items-center gap-1.5 text-orange-400 text-sm font-semibold font-inter
                  opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                  <span>اعرف المزيد</span>
                  <Icons.ArrowRight size={14} strokeWidth={2.5} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesGrid;
