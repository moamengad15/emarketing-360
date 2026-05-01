import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

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
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function StatCard({ icon, title, value }) {
  const IconComponent = Icons?.[icon] || Icons.HelpCircle;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.04,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      className="group relative flex flex-col items-center text-center p-8 rounded-[20px] bg-[#171A32]/90 backdrop-blur-2xl shadow-lg border border-white/5 cursor-default overflow-hidden"
    >
      <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={undefined}>
        <div className="absolute inset-0 rounded-[20px] ring-1 ring-[#FF7752]/40" />
        <div className="absolute inset-0 rounded-[20px] shadow-[0_0_32px_0_rgba(255,119,82,0.18)]" />
      </div>

      <div className="mb-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF7752]/10">
        <IconComponent
          size={28}
          className="text-[#FF7752] opacity-80"
          strokeWidth={1.75}
        />
      </div>

      <span className="text-4xl font-bold text-white tracking-tight leading-none mb-3 font-inter">
        {value}
      </span>

      <span className="text-sm font-medium text-gray-300 leading-snug font-inter max-w-[160px]">
        {title}
      </span>
    </motion.div>
  );
}

function StatsSection({ stats = [] }) {
  return (
    <section className="relative z-15 w-full py-20 px-6 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSection;
