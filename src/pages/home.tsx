import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, ArrowLeft, FileImage, Globe, TrendingUp, BarChart3,
  Zap, Target, Search, ShieldCheck, CheckCircle2, Star, ChevronDown, ChevronUp
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Animated counter
───────────────────────────────────────────── */
function AnimatedCounter({ end, suffix = "", prefix = "", decimals = 0 }: {
  end: number; suffix?: string; prefix?: string; decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800, step = end / (dur / 16);
        let v = 0;
        const t = setInterval(() => {
          v += step;
          if (v >= end) { setCount(end); clearInterval(t); }
          else setCount(parseFloat(v.toFixed(decimals)));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, decimals]);
  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Hero area chart — full-width SVG (paths only, no SVG text)
   Badges are rendered as HTML overlays in the hero section
───────────────────────────────────────────── */
function GrowthChart({ onReady }: { onReady?: () => void }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setRevealed(true);
      const t2 = setTimeout(() => onReady?.(), 2200);
      return () => clearTimeout(t2);
    }, 300);
    return () => clearTimeout(t);
  }, [onReady]);

  // viewBox 1440×520, preserveAspectRatio="none" stretches to fill container
  // Curves start at y≈435 → maps to ~67% from top at 800px → safely below text
  // Regular growth: gentle upward slope (end y≈365)
  const regularLine = "M 0,435 C 360,432 720,418 1080,398 S 1320,378 1440,368";
  const regularFill = `${regularLine} L 1440,520 L 0,520 Z`;
  // RapidX growth: exponential rise to upper-right (end y≈28)
  const rapidLine   = "M 0,435 C 280,425 560,385 860,300 S 1200,100 1440,28";
  const rapidFill   = `${rapidLine} L 1440,520 L 0,520 Z`;

  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rxGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(24 100% 52%)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="hsl(24 100% 52%)" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(220 14% 55%)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="hsl(220 14% 55%)" stopOpacity="0.02" />
        </linearGradient>
        <clipPath id="heroReveal">
          <motion.rect
            x="0" y="0" height="520"
            initial={{ width: 0 }}
            animate={{ width: revealed ? 1440 : 0 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </clipPath>
      </defs>

      {/* Subtle vertical grid lines */}
      {[288, 576, 864, 1152].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="520"
          stroke="hsl(220 14% 14%)" strokeWidth="1" strokeDasharray="5 8" />
      ))}

      {/* Animated areas and stroke lines */}
      <g clipPath="url(#heroReveal)">
        <path d={regularFill} fill="url(#regGrad)" />
        <path d={rapidFill}   fill="url(#rxGrad)" />
        <path d={regularLine} fill="none" stroke="hsl(220 14% 48%)" strokeWidth="2" strokeLinecap="round" />
        <path d={rapidLine}   fill="none" stroke="hsl(24 100% 52%)"  strokeWidth="3" strokeLinecap="round" />
        {/* End dots */}
        <circle cx="1435" cy="28"  r="6"  fill="hsl(24 100% 52%)" />
        <circle cx="1435" cy="28"  r="12" fill="hsl(24 100% 52%)" opacity="0.2" />
        <circle cx="1435" cy="368" r="5"  fill="hsl(220 14% 58%)" />
        <circle cx="1435" cy="368" r="9"  fill="hsl(220 14% 58%)" opacity="0.18" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Brand slider
───────────────────────────────────────────── */
const BRANDS = [
  "MIRAGGIO", "RYNOX", "BOLDFIT", "CULTSPORT", "SPORTO",
  "BEWAKOOF", "PLUM", "SOULFLOWER", "DECATHLON", "PUMA",
];

function BrandSlider() {
  const [offset, setOffset] = useState(0);
  const perPage = 5;
  const maxOffset = BRANDS.length - perPage;

  return (
    <section className="py-8 border-b border-border bg-[#241c1a] opacity-[1]">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
        Powering the fastest growing digital-first brands
      </p>
      <div className="max-w-5xl mx-auto px-4 flex items-center gap-3">
        {/* Prev arrow */}
        <button
          onClick={() => setOffset(o => Math.max(0, o - 1))}
          disabled={offset === 0}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous brands"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Cards window */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex gap-3"
            animate={{ x: `calc(-${offset} * (100% / ${perPage} + 12px / ${perPage}))` }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            style={{ width: `${(BRANDS.length / perPage) * 100}%` }}
          >
            {BRANDS.map((brand, i) => (
              <div
                key={i}
                className="flex-1 min-w-0 border border-border rounded-xl bg-background flex items-center justify-center py-5 px-3"
                style={{ flexBasis: `${100 / BRANDS.length}%` }}
              >
                <span className="font-display font-black text-sm md:text-base tracking-widest text-foreground whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Next arrow */}
        <button
          onClick={() => setOffset(o => Math.min(maxOffset, o + 1))}
          disabled={offset >= maxOffset}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next brands"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Animated bar chart (CTA section)
───────────────────────────────────────────── */
const BAR_HEIGHTS = [28, 42, 58, 75, 100, 128, 158]; // px, max 158
const BAR_MONTHS  = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

function RevenueBars() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative bg-card border border-border rounded-2xl p-5 md:p-7 overflow-hidden">
      {/* Top meta */}
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold text-primary uppercase tracking-widest">
          Achieve the scale your brand deserves with RapidX
        </span>
      </div>
      <div className="flex items-end justify-between mb-4 text-sm">
        <div>
          <div className="text-xs text-muted-foreground">Before</div>
          <div className="font-display font-black text-muted-foreground line-through text-base">$6.5M</div>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Present</div>
          <div className="font-display font-black text-gradient text-xl">$20.3M</div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-2 md:gap-3 h-44">
        {BAR_HEIGHTS.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <motion.div
              className="w-full rounded-t-md"
              style={{
                background: i >= 4
                  ? "linear-gradient(180deg, hsl(24 100% 52%) 0%, hsl(38 100% 58%) 100%)"
                  : "hsl(220 14% 18%)",
              }}
              initial={{ height: 0 }}
              animate={visible ? { height: h } : { height: 0 }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="text-[9px] md:text-[10px] text-muted-foreground font-medium">{BAR_MONTHS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Fade-in wrapper
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode; delay?: number; className?: string; direction?: "up"|"down"|"left"|"right"|"none";
}) {
  const dirMap = { up: { y: 24 }, down: { y: -24 }, left: { x: 24 }, right: { x: -24 }, none: {} };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const SERVICES = [
  {
    icon: FileImage,
    title: "Content & Visual Design",
    desc: "Premium A+ content, product photography, motion graphics & listing copy that converts.",
    href: "/services",
  },
  {
    icon: Globe,
    title: "Marketplace Dominance",
    desc: "End-to-end account management on Amazon, Noon, Flipkart, and Shopify — domestic & global.",
    href: "/services",
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    desc: "Marketplace sponsored ads, Meta, and Google campaigns built on proven ROAS frameworks.",
    href: "/services",
  },
  {
    icon: BarChart3,
    title: "Data & Revenue Ops",
    desc: "Dynamic pricing, CAC/LTV tracking, predictive demand insights and competitor analysis.",
    href: "/services",
  },
];

const STATS = [
  { value: 10,  suffix: "+",  label: "Sports Brands Managed" },
  { value: 78,  suffix: "%",  label: "Client Retention Rate" },
  { value: 3.1, suffix: "x",  label: "Avg Revenue Lift",      decimals: 1 },
  { value: 312, suffix: "%+", label: "Avg First-Year Growth" },
];

const WHO_FOR = [
  {
    title: "Sports & Fitness Brands",
    desc: "Our strongest suit. We manage 10+ elite sports brands with deep category knowledge, audience insights, and proven creative playbooks.",
    tags: ["Supplements", "Apparel", "Equipment"],
  },
  {
    title: "Fashion & Apparel",
    desc: "Visual-first categories that live and die by creative quality. We build storefronts and content systems that drive seasonal momentum.",
    tags: ["DTC", "Ethnic Wear", "Activewear"],
  },
  {
    title: "FMCG & Nutrition",
    desc: "High-velocity SKU management, A+ content at scale, and performance marketing that turns repeat buyers into brand advocates.",
    tags: ["Health Foods", "Beverages", "Personal Care"],
  },
  {
    title: "Beauty & Wellness",
    desc: "Brands that compete on trust and aesthetics. We build the creative authority that makes your products the instinctive choice.",
    tags: ["Skincare", "Haircare", "Supplements"],
  },
];

const WHY_TABS = [
  {
    id: "content",
    icon: FileImage,
    label: "Content",
    heading: "Visuals that convert faster than words",
    subheading: "Premium creative production at scale",
    features: [
      { title: "A+ Content", desc: "Rich brand storytelling that dominates Amazon search results." },
      { title: "Studio & Lifestyle", desc: "High-end photography purpose-built for digital shelves." },
      { title: "Motion Graphics", desc: "Video assets that capture attention in the first 3 seconds." },
    ],
    quote: "RapidX completely transformed our product listings. Our conversion rate jumped 4.8% in the first month.",
    author: "Arjun Mehta, CEO",
    company: "Apex Athletics",
  },
  {
    id: "speed",
    icon: Zap,
    label: "Speed",
    heading: "Operate at launch velocity",
    subheading: "From brief to live in record time",
    features: [
      { title: "Rapid Listing Launch", desc: "New SKUs live and fully optimized within 48 hours." },
      { title: "Instant Campaign Go-live", desc: "Ads running with proven creative in under a week." },
      { title: "Real-Time Ops", desc: "Account issues resolved before they affect revenue." },
    ],
    quote: "We launched 120 SKUs across three marketplaces in under two weeks. Zero delays.",
    author: "Priya Sharma, Head of Growth",
    company: "SportsPulse India",
  },
  {
    id: "results",
    icon: Target,
    label: "Results",
    heading: "Numbers that justify every rupee",
    subheading: "Data-first, outcome-obsessed",
    features: [
      { title: "Revenue Tracking", desc: "Full-funnel visibility across every marketplace and campaign." },
      { title: "CAC Reduction", desc: "We've consistently cut acquisition costs by 42% across brands." },
      { title: "Predictive Insights", desc: "Know what's selling next season before your competitors do." },
    ],
    quote: "We went from ₹6.5Cr to ₹20Cr in 18 months. The RapidX team made it look easy.",
    author: "Karan Bhatia, Founder",
    company: "FitFusion Pro",
  },
];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState("content");
  const [badgesVisible, setBadgesVisible] = useState(false);
  const activeTabData = WHY_TABS.find(t => t.id === activeTab)!;

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative bg-background overflow-hidden md:min-h-screen">

        {/* ── Full-width chart background — DESKTOP ONLY (absolute, behind text) ── */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
          <GrowthChart onReady={() => setBadgesVisible(true)} />
        </div>

        {/* ── Text content ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 pt-20 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/25 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-5">
              <Zap className="w-3 h-3" />
              <span>Full-Service E-Commerce Partner</span>
            </div>

            <h1
              className="font-display font-black tracking-tighter leading-[1.08] mb-4 max-w-3xl"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}
            >
              Add <span className="text-gradient">RapidX</span> to your<br />
              eCommerce brand's growth
            </h1>

            <p className="text-sm md:text-lg text-foreground/75 leading-relaxed mb-7 max-w-lg">
              We power bold, digital-first brands with cutting-edge content production,
              marketplace domination, high-ROI performance marketing, and deep data intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 font-display font-black uppercase tracking-widest text-sm rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] shadow-[0_0_30px_hsl(24_100%_52%/0.35)] w-full sm:w-auto justify-center"
                data-testid="link-hero-cta"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
              <motion.p
                className="text-xs sm:text-sm text-foreground/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-primary font-bold">12 spots</span> left this month.{" "}
                <span className="underline underline-offset-2 cursor-pointer hover:text-primary transition-colors">
                  Hurry up, join now!
                </span>
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* ── Compact chart — MOBILE ONLY, in normal flow below CTA ── */}
        <motion.div
          className="md:hidden w-full mt-6 overflow-hidden"
          style={{ height: 200 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <GrowthChart />
        </motion.div>

        {/* ── HTML badges — DESKTOP ONLY, no SVG distortion ── */}
        <AnimatePresence>
          {badgesVisible && (
            <>
              <motion.div
                className="absolute z-10 hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg"
                style={{ right: "8%", top: "26%" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Growth with RapidX
              </motion.div>
              <motion.div
                className="absolute z-10 hidden md:flex items-center gap-2 bg-card/90 backdrop-blur border border-border text-foreground/80 px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{ right: "26%", top: "70%" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                Regular Growth
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* ── BRAND SLIDER — pulled up on desktop to close gap at hero bottom ── */}
      <div className="relative z-10 md:-mt-20">
        <BrandSlider />
      </div>

      {/* ── MARQUEE ──────────────────────────── */}
      <div className="bg-primary/95 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_22s_linear_infinite]">
          {[...Array(14)].map((_, i) => (
            <span key={i} className="text-primary-foreground font-display font-black text-sm md:text-base uppercase tracking-widest mx-8 flex items-center gap-4">
              Sports & Fitness Dominance <Zap className="w-3.5 h-3.5" />
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES 2×2 ─────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="font-display font-black tracking-tighter mb-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
              Capabilities that accelerate<br />your brand's growth
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We've built high-performance growth systems for ambitious brands — so you can scale faster, operate smarter, and own your category.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {SERVICES.map((svc, i) => (
              <FadeIn key={i} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
                <div
                  className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-all card-glow flex flex-col h-full"
                  data-testid={`card-service-${i}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <svc.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-black text-xl md:text-2xl uppercase tracking-tight mb-2.5 group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 flex-1">
                    {svc.desc}
                  </p>
                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all"
                  >
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-card border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12 md:mb-16" direction="none">
            <h2 className="font-display font-black tracking-tighter mb-3"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>
              We partner with select,{" "}
              <span className="text-gradient">fast-growing,<br />
              performance-driven</span> businesses
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-card px-5 py-7 md:px-8 md:py-10 flex flex-col items-center text-center">
                  <span className="font-display font-black text-3xl md:text-5xl text-gradient mb-2">
                    <AnimatedCounter end={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    {s.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ─────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12 md:mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Partners</div>
            <h2 className="font-display font-black tracking-tighter mb-3"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
              Who is it for?
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              We support e-commerce brands with growth-ready digital operations and the creative engine to match.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {WHO_FOR.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div
                  className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/40 card-glow transition-all h-full"
                  data-testid={`card-who-${i}`}
                >
                  <h3 className="font-display font-black text-lg md:text-xl text-primary uppercase tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY RAPIDX ───────────────────────── */}
      <section className="py-20 md:py-28 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start mb-10 md:mb-14">
            <FadeIn direction="left">
              <h2 className="font-display font-black tracking-tighter"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}>
                Why choose RapidX?
              </h2>
            </FadeIn>
            <FadeIn direction="right">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                We obsess over how to help your business grow as much as you do. With RapidX, you get access to elite creative production, marketplace mastery, and an exclusive growth ecosystem built specifically{" "}
                <span className="text-primary font-bold">to support your brand's dominance.</span>
              </p>
            </FadeIn>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 md:gap-3 mb-8 flex-wrap">
            {WHY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(24_100%_52%/0.35)]"
                    : "bg-background border border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
                data-testid={`tab-why-${tab.id}`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <div className="bg-background border border-border rounded-2xl p-6 md:p-10">
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{activeTabData.subheading}</div>
                  <h3 className="font-display font-black text-xl md:text-2xl uppercase tracking-tight">
                    {activeTabData.heading}
                  </h3>
                </div>

                {/* Feature mini-cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {activeTabData.features.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-card border border-border rounded-xl p-4 md:p-5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                      <h4 className="font-display font-bold text-sm uppercase tracking-wide mb-1.5">{f.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4 border-t border-border pt-6"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed mb-2">
                      "{activeTabData.quote}"
                    </p>
                    <p className="text-sm font-bold">
                      {activeTabData.author}{" "}
                      <span className="font-normal text-muted-foreground">— {activeTabData.company}</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA + BAR CHART ──────────────────── */}
      <section className="py-20 md:py-28 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn direction="left">
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Grow With Us</div>
              <h2 className="font-display font-black tracking-tighter mb-6"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}>
                Partner with us and<br />
                <span className="text-gradient">accelerate your growth</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                Join the fastest-growing sports and e-commerce brands who've chosen RapidX as their digital growth engine.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 font-display font-black uppercase tracking-widest text-sm rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] shadow-[0_0_30px_hsl(24_100%_52%/0.3)]"
                data-testid="link-cta-grow"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <RevenueBars />
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}
