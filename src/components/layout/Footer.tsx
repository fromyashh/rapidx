import { Link } from "wouter";
import RapidXLogo from "@/components/brand/RapidXLogo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/">
              <RapidXLogo size={30} />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The creative and digital engine behind category-dominant brands. No warehousing. Pure growth.
            </p>
          </div>
          <div className="flex gap-12 md:gap-16">
            <div className="flex flex-col gap-3">
              <h4 className="font-display font-bold uppercase tracking-wider text-xs text-muted-foreground">Agency</h4>
              <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-display font-bold uppercase tracking-wider text-xs text-muted-foreground">Connect</h4>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} RapidX. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
