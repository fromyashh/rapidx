import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Image as ImageIcon, Store, TrendingUp, Network, CheckCircle2, Zap } from "lucide-react";

const SERVICES = [
  {
    icon: ImageIcon,
    title: "Content & Visual Design",
    tag: "Core Driver",
    desc: "We create premium assets that stop scrollers dead in their tracks — high-end photography, 3D renders, motion graphics, and A+ content that communicates supreme quality and drives conviction at the moment of purchase.",
    items: ["A+ Content Creation", "Premium Product Photography", "Motion Graphics & Video", "Listing Optimization & Copy"],
  },
  {
    icon: Store,
    title: "Marketplace Dominance",
    tag: "Domestic & Global",
    desc: "Owning the digital shelf on Amazon, Noon, Flipkart, and Shopify. We manage the entire ecosystem — ensuring your brand presence is flawless, indexed, and converting across every touchpoint.",
    items: ["End-to-End Account Management", "Global & Domestic Rollout", "Storefront Architecture", "Inventory Sync Strategy"],
  },
  {
    icon: TrendingUp,
    title: "High-Performance Marketing",
    tag: "Proven ROAS",
    desc: "Aggressive, data-backed media buying with proven return frameworks. We deploy capital precisely where it yields the highest return, scaling spend as soon as unit economics are validated.",
    items: ["Marketplace Sponsored Ads", "Meta & Google Ads", "Conversion Rate Optimization", "Retargeting Ecosystems"],
  },
  {
    icon: Network,
    title: "Data & Revenue Ops",
    tag: "The Nervous System",
    desc: "We track every click, cost, and conversion — delivering predictive demand insights, dynamic pricing, and category intelligence that helps you dominate margin and outmaneuver competition.",
    items: ["Dynamic Pricing Models", "CAC & LTV Tracking", "Predictive Demand Insights", "Competitor Share Analysis"],
  },
];

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* Header */}
      <section className="pt-24 pb-10 md:pt-32 md:pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">The Arsenal</div>
          <h1 className="font-display font-black uppercase tracking-tighter mb-5"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            Everything Your Brand<br />
            <span className="text-gradient">Needs to Win Online</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            We don't do isolated tactics. We deploy interconnected growth systems designed to overwhelm your category. No warehousing. No logistics. Just pure digital dominance.
          </p>
        </motion.div>
      </section>

      {/* Services */}
      <section className="pb-16 md:pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/50 card-glow transition-all"
              data-testid={`card-service-${i}`}
            >
              <div className="flex items-start justify-between mb-5 md:mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <svc.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                  {svc.tag}
                </span>
              </div>
              <h2 className="font-display font-black text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                {svc.title}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 md:mb-6">
                {svc.desc}
              </p>
              <ul className="space-y-2">
                {svc.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Logistics Distinction */}
      <section className="py-16 md:py-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Model, Clarified</div>
            <h2 className="font-display font-black uppercase tracking-tighter mb-4"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}>
              The Digital Brain. Not The Warehouse.
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are your creative and growth partner — not your logistics team. Your brand handles the physical supply chain; we own the entire digital and commercial engine that drives demand for it.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="flex-1 bg-background border border-primary/30 rounded-xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-400 rounded-t-xl" />
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-black text-lg uppercase mb-2">RapidX Does</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Content & Creative Production","Marketplace Account Management","Paid Performance Marketing","Data Analytics & Revenue Strategy","Storefront Architecture"].map((s, i) => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />{s}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center py-2 md:py-0">
              <ArrowRight className="w-7 h-7 text-primary rotate-90 md:rotate-0 opacity-60" />
            </div>

            <div className="flex-1 bg-background border border-border rounded-xl p-6 md:p-8">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                <Store className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-display font-black text-lg uppercase mb-2">Your Brand Does</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Warehousing & Inventory","Pick, Pack & Shipping","3PL & ERP Management","Last-Mile Delivery","Physical Supply Chain"].map((s, i) => (
                  <li key={i} className="flex items-center gap-2 opacity-70"><CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto">
            When orders drop through our optimized content engine, they trigger your fulfillment systems automatically — a seamless, high-velocity loop.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-background border-t border-border text-center px-4 sm:px-6">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Ready?</div>
        <h2 className="font-display font-black uppercase tracking-tighter mb-6"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
          Deploy the Full Arsenal
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 md:px-8 md:py-4 font-display font-black uppercase tracking-widest text-sm md:text-base rounded-md transition-all hover:opacity-90 hover:scale-[1.02] shadow-[0_0_32px_hsl(24_100%_52%/0.25)]"
          data-testid="link-services-cta"
        >
          Book Your Audit <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
