import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { faker } from '@faker-js/faker';
import Header from '../components/Header';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import ServicesGrid from '../components/ServicesGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import PortfolioShowcase from '../components/PortfolioShowcase';
import PricingPlans from '../components/PricingPlans';
import BlogPreview from '../components/BlogPreview';
import Footer from '../components/Footer';

const NAV_LINKS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '#about' },
  { label: 'الخدمات', href: '#services' },
  { label: 'المدونة', href: '#blog' },
  { label: 'تواصل معنا', href: '#contact' },
];

const STATS = [
  { icon: 'TrendingUp', title: 'متوسط زيادة العائد على الاستثمار لعملائنا', value: '+248%' },
  { icon: 'Users', title: 'عدد العملاء المحتملين الناتجين عن الحملات', value: '12,400+' },
  { icon: 'Globe', title: 'دول تم الوصول إليها عالميًا', value: '38' },
  { icon: 'Star', title: 'تقييم رضا العملاء', value: '4.9/5' },
  { icon: 'Zap', title: 'حملات تم إطلاقها بنجاح', value: '1,200+' },
  { icon: 'Shield', title: 'علامات تجارية توسعت لتصبح ضمن روّاد السوق', value: '200+' },
];

const SERVICES = [
  { icon: 'Search', title: 'تحسين محركات البحث والنمو العضوي', description: 'ارتقِ في النتائج وتصدر أسرع. نبني زيارات عضوية مستدامة عبر تميز تقني واستراتيجية محتوى.' },
  { icon: 'BarChart2', title: 'الإعلانات المدفوعة و(PPC)', description: 'حملات إعلانية قائمة على الأداء عبر Google وMeta والقنوات البرمجية—مُحسّنة لتعظيم العائد.' },
  { icon: 'Mail', title: 'التسويق عبر البريد الإلكتروني', description: 'سلاسل رسائل وحملات مُحكمة تُنمّي العملاء المحتملين وتزيد الإيرادات المتكررة.' },
  { icon: 'Share2', title: 'استراتيجية وسائل التواصل', description: 'محتوى مناسب لكل منصة يبني مجتمعًا متفاعلًا ويحوّل المتابعين إلى عملاء.' },
  { icon: 'Edit3', title: 'تسويق المحتوى', description: 'مقالات ومواد ومرئيات تبني الثقة وتجذب جمهورك وتحوّله إلى عملاء.' },
  { icon: 'Activity', title: 'التحليلات وتحسين معدل التحويل (CRO)', description: 'تحسين قائم على البيانات يحوّل زياراتك الحالية إلى نمو إيرادات قابل للقياس.' },
];

const WHY_FEATURES = [
  { icon: 'Zap', title: 'تنفيذ سريع للغاية', description: 'نطلق الحملات والأصول الإبداعية بسرعة غير مسبوقة دون التفريط بالجودة أو العمق الاستراتيجي.' },
  { icon: 'TrendingUp', title: 'نمو قائم على البيانات', description: 'كل قرار مدعوم بتحليلات حقيقية. نُحسّن باستمرار لتعظيم العائد ومعدلات التحويل.' },
  { icon: 'Shield', title: 'تنفيذ يحافظ على العلامة', description: 'سلامة علامتك غير قابلة للتنازل. نطبق معايير جودة صارمة عبر كل قناة ومخرجات إبداعية.' },
  { icon: 'Users', title: 'فريق خبراء مخصص', description: 'استراتيجيون ومصممون ومهندسون بخبرة عالية يعملون كفريق واحد متوافق مع أهداف عملك.' },
  { icon: 'Globe', title: 'انتشار عالمي', description: 'خبرات متعددة الأسواق وحملات محلية تُخاطب الثقافات والمناطق الزمنية بفعالية.' },
  { icon: 'Star', title: 'سجل نتائج مثبت', description: 'أكثر من 200 علامة توسعت معنا. نتائجنا ثابتة وقابلة للقياس وقابلة للتكرار.' },
];

const PROCESS_STEPS = [
  { icon: 'Search', label: 'استكشاف وتدقيق', description: 'نحلل علامتك ومنافسيك وجمهورك لاكتشاف فرص النمو.' },
  { icon: 'BarChart2', label: 'مخطط الاستراتيجية', description: 'خطة طريق مدعومة بالبيانات لمواءمة كل قناة مع أهداف الإيرادات.' },
  { icon: 'Layers', label: 'تنفيذ إبداعي', description: 'نبني أصولًا قوية: نصوصًا ومرئيات ومسارات تحويل مصممة لرفع الأداء.' },
  { icon: 'Rocket', label: 'إطلاق وتوسّع', description: 'نطلق الحملات باستهداف دقيق وتحسين فوري.' },
  { icon: 'TrendingUp', label: 'قياس ونمو', description: 'تحليلات مستمرة تكشف رؤى تُضاعف النتائج شهرًا بعد شهر.' },
];

const PRICING_PLANS = [
  {
    title: 'الأساسي',
    price: '$499',
    features: ['تدقيق واستراتيجية تحسين محركات البحث', 'إدارة إعلانات Google', '5 منشورات شهريًا على المنصات', 'تقرير تحليلي شهري', 'دعم عبر البريد الإلكتروني'],
    cta_label: 'ابدأ الآن',
    cta_url: '#contact',
    popular: false,
  },
  {
    title: 'النمو',
    price: '$1,199',
    features: ['كل ما في الخطة الأساسية', 'تسويق محتوى (8 مقالات/منشورات)', 'تحسين معدل التحويل', 'إدارة حملات PPC', 'مكالمات استراتيجية كل أسبوعين', 'دعم أولوية'],
    cta_label: 'ابدأ النمو',
    cta_url: '#contact',
    popular: true,
  },
  {
    title: 'الشركات',
    price: '$2,999',
    features: ['كل ما في خطة النمو', 'مدير حساب مخصص', 'استراتيجية علامة مخصصة', 'شراكات مؤثرين', 'مراجعات أداء أسبوعية', 'تهيئة متميزة', 'دعم أولوية 24/7'],
    cta_label: 'تواصل مع المبيعات',
    cta_url: '#contact',
    popular: false,
  },
];

function generateTestimonials() {
  const companies = ['Acme Corp', 'Nova Digital', 'Peak Labs', 'Surge Brands', 'Horizon Media', 'Apex Growth', 'Velo Studio', 'Orbit Agency', 'Pulse Co'];
const quotes = [
  `العمل معنا غيّر حضورنا الرقمي بالكامل. تضاعف عدد العملاء المحتملين خلال أقل من 90 يومًا.`,
  `فريقهم يركز على العائد بشكل دقيق. كل دولار استثمرناه عاد بقيمة قابلة للقياس وتتزايد مع الوقت.`,
  `العمق الاستراتيجي لديهم لا يُضاهى. أصبحوا امتدادًا حقيقيًا لفريق التسويق لدينا.`,
  `ارتفع عائد إعلانات Google من 2x إلى 7x خلال أول دورة حملة. عمل استثنائي.`,
  `من المحتوى إلى الإعلانات المدفوعة، يغطي الفريق كل شيء بدقة. توسعنا سريعًا بفضلهم.`,
  `وضوح التقارير وحده يستحق. نعرف دائمًا ما يعمل وما الذي يجب تحسينه بعد ذلك.`,
  `أفضل استثمار تسويقي قمنا به. الفريق سريع الاستجابة، مبدع، ومهووس بالنتائج.`,
  `أعادوا بناء مسار التحويل بالكامل وارتفع معدل التحويل من 1.2% إلى 4.8% خلال ستة أسابيع.`,
  `إن كنت جادًا بشأن النمو الرقمي، فهذه هي الوكالة التي تريدها إلى جانبك.`,
];
  const photos = [
    '/src/assets/images/logo.jpeg',
    '/src/assets/images/Slide2.jpg.webp',
    '/src/assets/images/Slide3.jpg.webp',
    '/src/assets/images/header_img.png.webp',
    '/src/assets/images/Emarketingate-Background-1.jpg',
    '/src/assets/images/EMG-eMarketingate.jpg',
    '/src/assets/images/about-us.png.webp',
    '/src/assets/images/agreement-2548138_1920.jpg.webp',
    '/src/assets/images/digitalmarketing-1.jpg.webp',
  ];
  return companies.map((company, i) => ({
    name: faker?.name?.fullName?.() ?? `Client ${i + 1}`,
    company,
    quote: quotes[i % quotes.length],
    stars: 5,
    photo_url: photos[i % photos.length],
  }));
}

function generatePortfolio() {
  const projects = [
    { title: 'نمو متجر Nova الإلكتروني', category: 'إعلانات مدفوعة', desc: 'وسعنا علامة مباشرة للمستهلك من 50 ألف إلى 400 ألف دولار شهريًا عبر استراتيجيات إعلانية قوية.' },
    { title: 'محرك عملاء Apex (SaaS)', category: 'SEO ومحتوى', desc: 'بنينا استراتيجية محتوى رفعت الزيارات العضوية 340% وولّدت 1,200 فرصة مؤهلة ربع سنويًا.' },
    { title: 'إعادة إطلاق علامة Horizon', category: 'استراتيجية علامة', desc: 'إعادة تموضع كاملة مع حملات رقمية متكاملة حققت زيادة 68% في تذكّر العلامة.' },
    { title: 'خط مبيعات Surge (B2B)', category: 'بريد وCRM', desc: 'نظام رعاية آلي خفّض مدة دورة البيع 42% وزاد خط الفرص 3 أضعاف.' },
    { title: 'اكتساب مستخدمي تطبيق Peak', category: 'نمو سريع', desc: 'استراتيجية متعددة القنوات حققت 80,000 تثبيت بتكلفة 1.20$ لكل تثبيت.' },
    { title: 'توسّع Orbit للتجزئة', category: 'تحليلات وCRO', desc: 'اختبارات A/B وإعادة تصميم المسار رفعت التحويل من 1.8% إلى 5.4% عبر الأسواق.' },
  ];
  return projects.map((p) => ({ ...p, case_link: '#portfolio' }));
}

function generateBlogPosts() {
  return [
    {
      slug: 'seo-trends-2025',
      title: '7 اتجاهات SEO ستحدد البحث في 2025',
      summary: 'من نتائج بحث مدعومة بالذكاء الاصطناعي إلى البحث القائم على الكيانات—هذه أبرز الاتجاهات التي يجب متابعتها هذا العام.',
      date: 'Jan 12, 2025',
      img: '/src/assets/images/Slide7.jpg.webp',
    },
    {
      slug: 'paid-media-roas',
      title: 'كيف تضاعف عائدك 5 مرات دون زيادة الإنفاق الإعلاني',
      summary: 'الإطار الذي نستخدمه لاستخراج إيرادات أكبر من كل دولار إعلان—دون إنفاق المزيد.',
      date: 'Feb 3, 2025',
      img: '/src/assets/images/Slide8.jpg.webp',
    },
    {
      slug: 'content-strategy-2025',
      title: 'استراتيجية المحتوى في عصر الذكاء الاصطناعي: ما الذي ما زال ينجح؟',
      summary: `امتلأ الإنترنت بالضجيج. إليك كيف تبني استراتيجية محتوى تخترق الزحام وتحقق تحويلًا فعليًا.`,
      date: 'Feb 28, 2025',
      img: '/src/assets/images/Slide9.jpg.webp',
    },
  ];
}

function CTABanner() {
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
          لنبنِ شيئًا{' '}
          <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-orange-300 bg-clip-text text-transparent">
            استثنائيًا
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="font-inter text-gray-400 text-lg leading-relaxed max-w-xl"
        >
          انضم إلى أكثر من 200 علامة تجارية نامية تثق بنا لتحقيق نتائج تسويق قابلة للقياس. ابدأ بجلسة استراتيجية مجانية.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-3"
          noValidate
          aria-label="نموذج طلب جلسة استراتيجية"
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
                  <p className="text-white font-inter font-semibold text-sm">You're on the list!</p>
                  <p className="text-emerald-400 font-inter text-xs">سنتواصل معك خلال 24 ساعة.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
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
                    className="relative flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-inter font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-rose-500 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden"
                    aria-label="إرسال البريد لطلب جلسة استراتيجية مجانية"
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
                          احصل على تدقيق مجاني
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

function SectionDivider() {
  return (
    <div className="relative w-full h-px">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </div>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center justify-center transition-shadow duration-300 hover:scale-110 active:scale-95"
        >
          <Icons.ArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Home() {
  const [testimonials] = useState(() => generateTestimonials());
  const [portfolio] = useState(() => generatePortfolio());
  const [blogPosts] = useState(() => generateBlogPosts());

  return (
    <div className="relative min-h-screen bg-[#12142A] font-inter overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[140px] translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-orange-400/4 rounded-full blur-[120px] translate-y-1/3" />
      </div>

      <Header
        nav_links={NAV_LINKS}
        cta_label="احصل على تدقيق مجاني"
        cta_href="#contact"
      />

      <main className="relative z-10 flex flex-col">
        <div className="pt-[72px]">
          <section id="home">
            <Hero
              headline="نمِّ أعمالك عبر تسويق رقمي قائم على البيانات"
              subheadline="نصمم استراتيجيات أداء تَحوِّل الزوار إلى عملاء أوفياء. من تحسين محركات البحث إلى الإعلانات المدفوعة، نبني علاماتٍ تتصدر القنوات الرقمية."
              primary_cta="ابدأ اليوم"
              secondary_cta="شاهد أعمالنا"
            />
          </section>

          <SectionDivider />

          <section id="stats" className="bg-[#0f1126]">
            <StatsSection stats={STATS} />
          </section>

          <SectionDivider />

          <section id="services">
            <ServicesGrid services={SERVICES} />
          </section>

          <SectionDivider />

          <section id="about" className="bg-[#0f1126]">
            <WhyChooseUs features={WHY_FEATURES} />
          </section>

          <SectionDivider />

          <section id="process">
            <ProcessSteps steps={PROCESS_STEPS} />
          </section>

          <SectionDivider />

          <section id="testimonials" className="bg-[#0f1126]">
            <Testimonials testimonials={testimonials} />
          </section>

          <SectionDivider />

          <section id="portfolio">
            <PortfolioShowcase projects={portfolio} />
          </section>

          <SectionDivider />

          <section id="pricing" className="bg-[#0f1126]">
            <PricingPlans plans={PRICING_PLANS} />
          </section>

          <SectionDivider />

          <section id="blog">
            <BlogPreview posts={blogPosts} />
          </section>

          <CTABanner />
        </div>
      </main>

      <Footer
        tagline="نصنع تجارب رقمية تحوّل الزوار إلى عملاء أوفياء. مبنية للطموح ومدعومة بالبيانات."
      />

      <ScrollToTopButton />
    </div>
  );
}

export default Home;
