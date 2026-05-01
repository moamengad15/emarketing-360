import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const defaultNavLinks = [
  {
    heading: 'الشركة',
    links: [
      { label: 'الرئيسية', href: '/' },
      { label: 'من نحن', href: '#about' },
      { label: 'الخدمات', href: '#services' },
      { label: 'المدونة', href: '#blog' },
    ],
  },
  {
    heading: 'قانوني',
    links: [
      { label: 'سياسة الخصوصية', href: '/privacy' },
      { label: 'شروط الخدمة', href: '/terms' },
      { label: 'تواصل معنا', href: '#contact' },
      { label: 'وظائف', href: '#careers' },
    ],
  },
];

const defaultContactInfo = [
  { type: 'address', value: '245 بارك أفينيو، نيويورك، NY 10167', icon: 'MapPin' },
  { type: 'email', value: 'info@e-marketing360.com', icon: 'Mail' },
  { type: 'phone', value: '+1 (800) 123-4567', icon: 'Phone' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Footer({
  logo_src,
  tagline = 'نصنع تجارب رقمية تحوّل الزوار إلى عملاء.',
  nav_links = defaultNavLinks,
  contact_info = defaultContactInfo,
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0d0f22] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-orange-500/10 blur-[80px] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-screen-xl mx-auto px-8 pt-16 pb-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-6">
            <div>
              <span className="text-2xl font-bold tracking-tight font-inter">
                {''}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 font-inter max-w-xs">
              {tagline}
            </p>
          </motion.div>

          {nav_links.map((column) => (
            <motion.div key={column.heading} variants={itemVariants} className="flex flex-col gap-5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-orange-400 font-inter">
                {column.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 font-inter hover:text-white transition-colors duration-200 group flex items-center gap-1.5"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-orange-400 transition-all duration-300 rounded-full" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-orange-400 font-inter">
              تواصل معنا
            </h4>
            <ul className="flex flex-col gap-4">
              {contact_info.map((item) => {
                const IconComponent = Icons?.[item.icon] || Icons.HelpCircle;
                return (
                  <li key={item.type} className="flex items-start gap-3">
                    <div className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center bg-orange-500/10 border border-orange-500/20 shrink-0">
                      <IconComponent size={13} className="text-orange-400" />
                    </div>
                    <span className="text-xs leading-relaxed text-slate-400 font-inter">
                      {item.value}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-500 font-inter">
            &copy; {year} {''} جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-xs text-slate-500 font-inter hover:text-slate-300 transition-colors duration-200"
            >
              سياسة الخصوصية
            </a>
            <span className="w-px h-3 bg-slate-700" />
            <a
              href="/terms"
              className="text-xs text-slate-500 font-inter hover:text-slate-300 transition-colors duration-200"
            >
              شروط الخدمة
            </a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-500 font-inter">جميع الأنظمة تعمل بشكل طبيعي</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}