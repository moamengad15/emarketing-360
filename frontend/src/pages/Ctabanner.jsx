import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

function Ctabanner({
  headline = 'لنبنِ شيئًا استثنائيًا',
  subheadline = 'انضم إلى أكثر من 200 علامة تجارية نامية تثق بنا لتحقيق نتائج تسويق قابلة للقياس.',
  cta_label = 'احصل على تدقيق مجاني',
  cta_href = '#contact',
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [touched, setTouched] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && !isValid && email.length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1800);
  }

  return (
    <section
      id="contact"
      className="relative w-full py-28 px-6 overflow-hidden"
      aria-label="دعوة لاتخاذ إجراء"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#12142A] via-[#1a1020] to-[#12142A]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,119,82,0.13),transparent)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/25 text-orange-400 text-xs font-inter font-semibold uppercase tracking-widest"
        >
          <Icons.Rocket size={12} strokeWidth={2.5} />
          هل أنت جاهز للتوسع؟
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          className="font-inter font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight"
        >
          {headline.split(' ').map((word, i) => {
            const isAccent = ['Extraordinary', 'Results', 'Growth'].includes(word);
            return (
              <span key={i} className={isAccent ? 'bg-gradient-to-r from-orange-400 via-rose-400 to-orange-300 bg-clip-text text-transparent' : ''}>
                {word}{' '}
              </span>
            );
          })}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="font-inter text-gray-400 text-lg leading-relaxed max-w-xl"
        >
          {subheadline}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-3"
          noValidate
          aria-label="نموذج الحصول على تدقيق مجاني"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex items-center justify-center gap-3 py-5 px-6 rounded-2xl bg-emerald-500/15 border border-emerald-400/30"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Icons.CheckCircle size={18} className="text-emerald-400" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-white font-inter font-semibold text-sm">تم استلام طلبك!</p>
                  <p className="text-emerald-400 font-inter text-xs">سنتواصل معك خلال 24 ساعة.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      onBlur={() => setTouched(true)}
                      placeholder="أدخل بريد عملك الإلكتروني"
                      aria-label="عنوان البريد الإلكتروني للعمل"
                      aria-invalid={showError}
                      className={[
                        'w-full px-5 py-4 rounded-2xl font-inter text-sm text-white placeholder-gray-500 bg-white/5 border backdrop-blur-sm outline-none transition-all duration-300 focus:bg-white/8',
                        showError
                          ? 'border-rose-500/60 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-white/10 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20',
                      ].join(' ')}
                    />
                    {showError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-5 left-1 text-rose-400 text-xs font-inter"
                      >
                        يرجى إدخال بريد إلكتروني صالح.
                      </motion.p>
                    )}
                  </div>
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: status === 'loading' ? 1 : 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-inter font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-rose-500 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                    aria-label="إرسال النموذج"
                  >
                    <AnimatePresence mode="wait">
                      {status === 'loading' ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Icons.Loader2 size={16} className="animate-spin" />
                          جارٍ الإرسال...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          {cta_label}
                          <Icons.ArrowRight size={15} strokeWidth={2.5} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                <p className="text-gray-500 font-inter text-xs text-center mt-1">
                  دون رسائل مزعجة. دون التزام. يمكنك الإلغاء في أي وقت.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-2"
        >
          {[
            { icon: 'CheckCircle', text: 'مكالمة استراتيجية مجانية لمدة 30 دقيقة' },
            { icon: 'Shield', text: 'بدون عقود ملزمة' },
            { icon: 'Zap', text: 'نتائج خلال 30 يومًا' },
          ].map((item) => {
            const IconComp = Icons?.[item.icon] || Icons.HelpCircle;
            return (
              <div key={item.text} className="flex items-center gap-2">
                <IconComp size={14} className="text-orange-400" strokeWidth={2} />
                <span className="text-gray-400 font-inter text-xs">{item.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Ctabanner;
