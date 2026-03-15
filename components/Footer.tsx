"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { GraduationCap, Github, Twitter, Linkedin, Mail } from "lucide-react";

const platformLinks = [
  { label: "Features", href: "/features" },
  { label: "Security", href: "/security" },
  { label: "Request a Demo", href: "/demo" },
];

const resourceLinks = [
  { label: "Documentation", href: "/documentation" },
  { label: "Blog", href: "/blog" },
  { label: "Study Guides", href: "/guides" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

import { usePathname } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname?.startsWith("/faculty") || pathname?.startsWith("/students")) {
    return null;
  }

  return (
    <footer className="w-full bg-background border-t border-border pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer mb-6 inline-flex">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                <GraduationCap size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Smart<span className="text-primary">Exam</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Secure Portal
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
              Empowering education through secure, reliable, and intelligent online examination solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <Link key={idx} href={social.href} className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icon size={16} />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Platform</h3>
            <ul className="space-y-4">
              {platformLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-6">Resources</h3>
            <ul className="space-y-4">
              {resourceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-6">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} SmartExam. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-red-500 inline-block"
            >
              ♥
            </motion.span>
            <span>for secure education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;