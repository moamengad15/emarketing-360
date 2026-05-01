import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import logoImage from '../assets/images/logo.jpeg';

const DEFAULT_NAV_LINKS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '#about' },
  { label: 'الخدمات', href: '#services' },
  { label: 'المدونة', href: '#blog' },
  { label: 'تواصل معنا', href: '#contact' },
];

function Header({
  logo_src,
  nav_links = DEFAULT_NAV_LINKS,
  cta_label = 'ابدأ الآن',
  cta_href = '#contact',
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('الرئيسية');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const MenuIcon = Icons.Menu;
  const XIcon = Icons.X;
  const ArrowRightIcon = Icons.ArrowRight;
  const ZapIcon = Icons.Zap;

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'shadow-[0_8px_32px_rgba(0,0,0,0.38)] backdrop-blur-xl'
          : 'backdrop-blur-md',
      ].join(' ')}
      style={undefined}
    >
      <div
        className="w-full border-b border-white/[0.08]"
        style={undefined}
      >
        <div
          className="bg-[#12142A]/[0.96] w-full"
        >
          <div className="max-w-screen-xl mx-auto px-8 py-4 flex items-center justify-between gap-8">

            <motion.a
              href="/"
              className="flex items-center gap-2.5 select-none flex-shrink-0"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF7752] to-[#FF4E17] shadow-[0_0_18px_rgba(255,119,82,0.45)]">
                <img
                  src={logoImage}
                  alt="الشعار"
                  className="w-[18px] h-[18px] object-contain"
                />
              </span>
              <span className="font-inter text-xl font-bold tracking-tight text-white" aria-hidden="true">
                {''}
              </span>
            </motion.a>

            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              {nav_links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={[
                    'relative px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-colors duration-200 rounded-xl font-inter',
                    activeLink === link.label
                      ? 'text-[#FF7752]'
                      : 'text-white/60 hover:text-white',
                  ].join(' ')}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i, ease: 'easeOut' }}
                  aria-current={activeLink === link.label ? 'page' : undefined}
                >
                  {link.label}
                  {activeLink === link.label && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-[#FF7752] to-[#FF4E17]"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="hidden md:flex items-center"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <a
                href={cta_href}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl font-inter font-semibold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#FF7752] to-[#FF4E17] shadow-[0_4px_20px_rgba(255,119,82,0.38)] hover:shadow-[0_6px_28px_rgba(255,119,82,0.58)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300"
              >
                {cta_label}
                <ArrowRightIcon
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </a>
            </motion.div>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden overflow-hidden bg-[#12142A]/[0.98] backdrop-blur-xl border-b border-white/[0.08]"
          >
            <nav className="max-w-screen-xl mx-auto px-8 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
              {nav_links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => { setActiveLink(link.label); setMobileOpen(false); }}
                  className={[
                    'px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-widest font-inter transition-colors duration-200',
                    activeLink === link.label
                      ? 'text-[#FF7752] bg-[#FF7752]/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5',
                  ].join(' ')}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 * i, ease: 'easeOut' }}
                  aria-current={activeLink === link.label ? 'page' : undefined}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4">
                <a
                  href={cta_href}
                  onClick={() => setMobileOpen(false)}
                  className="group inline-flex items-center gap-2 w-full justify-center px-6 py-3 rounded-2xl font-inter font-semibold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#FF7752] to-[#FF4E17] shadow-[0_4px_20px_rgba(255,119,82,0.32)] hover:shadow-[0_6px_28px_rgba(255,119,82,0.52)] transition-all duration-300"
                >
                  {cta_label}
                  <ArrowRightIcon
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
