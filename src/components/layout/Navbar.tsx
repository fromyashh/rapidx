import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import RapidXLogo from "@/components/brand/RapidXLogo";

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)}>
            <RapidXLogo size={32} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-primary ${
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground rounded-md transition-all hover:opacity-90 hover:scale-[1.03]"
            >
              Get Free Audit
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col pt-16">
          <div className="flex flex-col px-6 py-10 gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-4 border-b border-border font-display font-bold text-2xl uppercase tracking-wider transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-foreground"
                }`}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-4 font-display font-black uppercase tracking-widest text-lg rounded-md"
              data-testid="link-mobile-cta"
            >
              Get Free Audit
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
