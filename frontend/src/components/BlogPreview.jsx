import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import articleImage from '../assets/images/digitalmarketing-1.jpg.webp';

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
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function BlogCard({ post }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(255,119,82,0.18)] hover:border-orange-400/30"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <motion.img
          src={post.img || articleImage}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = articleImage;
          }}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12142A]/90 via-[#12142A]/30 to-transparent" />
      </div>

      <div className="flex flex-col flex-1 px-6 py-6 gap-3">
        <div className="flex items-center gap-2">
          <Icons.CalendarDays className="w-3.5 h-3.5 text-orange-400" strokeWidth={2} />
          <time className="text-xs font-inter font-medium text-orange-400 tracking-wide uppercase">
            {post.date}
          </time>
        </div>

        <h3 className="font-inter font-semibold text-lg leading-snug text-white group-hover:text-orange-300 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="font-inter text-sm leading-relaxed text-gray-300 line-clamp-2 flex-1">
          {post.summary}
        </p>

        <div className="pt-2">
          <motion.a
            href={post.slug ? `#${post.slug}` : '#'}
            className="inline-flex items-center gap-1.5 text-sm font-inter font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200 group/btn"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            اقرأ المزيد
            <Icons.ChevronRight
              className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
              strokeWidth={2.5}
            />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

function BlogPreview({ posts = [] }) {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden bg-[#12142A]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-orange-400/5 blur-[100px]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14 gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/25 bg-orange-400/10 text-orange-400 text-xs font-inter font-semibold uppercase tracking-widest"
          >
            <Icons.BookOpen className="w-3.5 h-3.5" strokeWidth={2} />
            أحدث الرؤى
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="font-inter font-bold text-4xl md:text-5xl text-white leading-tight tracking-tight"
          >
            من{' '}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              المدونة
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
            className="font-inter text-gray-400 text-base md:text-lg max-w-xl leading-relaxed"
          >
            كن في الصدارة بآراء الخبراء حول التسويق الرقمي واستراتيجية النمو وأداء العلامة.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post, index) => (
            <BlogCard key={post.slug || index} post={post} />
          ))}
        </motion.div>

        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
            <Icons.BookOpen className="w-10 h-10 opacity-30" strokeWidth={1.5} />
            <p className="font-inter text-sm">لا توجد مقالات متاحة حاليًا.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="flex justify-center mt-14"
        >
          <motion.a
            href="#blog"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-inter font-semibold text-sm text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 shadow-[0_4px_24px_rgba(255,119,82,0.35)] hover:shadow-[0_6px_32px_rgba(255,119,82,0.5)] transition-shadow duration-300"
          >
            عرض جميع المقالات
            <Icons.ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogPreview;
