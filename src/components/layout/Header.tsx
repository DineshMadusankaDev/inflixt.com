"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { mainNavItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full max-w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-[#05030D]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Brand Anchor */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90 shrink-0"
            aria-label="Inflixt Global"
          >
            <div className="relative flex items-center">
              <Image
                src="/brand/inflixt-logo.png"
                alt="Inflixt Global"
                width={776}
                height={311}
                className="h-8 md:h-9 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0B0717]/80 border border-white/10 rounded-full px-5 py-1.5 backdrop-blur-md shadow-inner">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200",
                    isActive
                      ? "text-white bg-white/10 [text-shadow:0_0_16px_rgba(0,245,255,0.4)] shadow-[0_0_15px_rgba(0,245,255,0.15)]"
                      : "text-[#9290A3] hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              href="/contact"
              size="sm"
              variant="primary"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#E7E5EE] hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF] shrink-0"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 transition-transform duration-200" /> : <Menu className="w-6 h-6 transition-transform duration-200" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#05030D]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-3">
          <nav className="flex flex-col gap-3">
            {mainNavItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${idx * 40}ms` }}
                  className={cn(
                    "text-lg font-medium py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-between",
                    isActive
                      ? "text-[#00F5FF] bg-[#00F5FF]/10 font-semibold shadow-[0_0_15px_rgba(0,245,255,0.1)]"
                      : "text-[#E7E5EE] hover:bg-white/5 hover:translate-x-1"
                  )}
                >
                  {item.label}
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-white/10">
              <Button
                href="/contact"
                size="md"
                variant="primary"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
