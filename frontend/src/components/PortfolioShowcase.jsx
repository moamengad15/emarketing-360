import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import img1 from '../assets/images/030-website.png';
import img2 from '../assets/images/028-website.png';
import img3 from '../assets/images/009-website.png';
import img4 from '../assets/images/019-palette.png';
import img5 from '../assets/images/002-vector.png';
import img6 from '../assets/images/digitalmarketing-1.jpg.webp';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

function PortfolioCard({ project, index }) {
  const ArrowIcon = Icons?.ArrowUpRight || Icons.HelpCircle;
  const portfolioImages = [img1, img2, img3, img4, img5, img6];
  const projectImage = portfolioImages[index % portfolioImages.length];

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(255,119,82,0.2)] cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={projectImage}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
          onError={(e) => {
            e.currentTarget.src = projectImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12142A] via-[#12142A]/60 to-transparent transition-opacity duration-500 group-hover:opacity-70" />

        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#FF7752]/20 border border-[#FF7752]/40 text-[#FF7752] backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <motion.a
          href={project.case_link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`عرض دراسة حالة لـ ${project.title}`}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:bg-[#FF7752] hover:border-[#FF7752] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowIcon size={16} strokeWidth={2} />
        </motion.a>
      </div>

      <div className="flex flex-col gap-2 px-6 py-6 transition-all duration-500 group-hover:-translate-y-1">
        <h3 className="text-white font-inter text-lg font-bold leading-snug tracking-tight group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-300 font-inter text-sm leading-relaxed line-clamp-2">
          {project.desc}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[#FF7752] text-sm font-semibold font-inter opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <span>عرض دراسة الحالة</span>
          <ArrowIcon size={14} strokeWidth={2.5} />
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-[#FF7752]/30 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}

function PortfolioShowcase({ projects = [] }) {
  const ExternalLinkIcon = Icons?.ExternalLink || Icons.HelpCircle;
  const GridIcon = Icons?.LayoutGrid || Icons.Layout;

  return (
    <section
      id="portfolio"
      className="relative w-full bg-[#12142A] px-6 py-24 md:px-10 lg:px-16 overflow-hidden"
      aria-label="معرض الأعمال"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,119,82,0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(32,34,68,0.8),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-16 gap-4"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF7752]/10 border border-[#FF7752]/25">
            <GridIcon size={14} className="text-[#FF7752]" strokeWidth={2} />
            <span className="text-[#FF7752] text-xs font-semibold tracking-widest uppercase font-inter">
              أعمالنا
            </span>
          </div>

          <h2 className="text-white font-inter text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl">
            حملات{' '}
            <span className="bg-gradient-to-r from-[#FF7752] to-[#FF9A72] bg-clip-text text-transparent">
              تحقق نتائج
            </span>
          </h2>

          <p className="text-gray-400 font-inter text-base md:text-lg max-w-xl leading-relaxed">
            استعرض أحدث دراسات الحالة: استراتيجيات حقيقية، نتائج قابلة للقياس، وعلامات تغيّرت عبر التميز الرقمي.
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <ExternalLinkIcon size={40} className="text-white/20" strokeWidth={1.5} />
            <p className="text-white/30 font-inter text-base">لا توجد مشاريع للعرض حاليًا.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <PortfolioCard key={project.title + index} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PortfolioShowcase;
