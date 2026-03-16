"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, GraduationCap, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"

const Navbar = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (pathname?.startsWith("/faculty") || pathname?.startsWith("/admin") || pathname?.startsWith("/students")) {
        return null;
    }

    const navItems = [
        { title: "Home", href: "/" },
        { title: "Features", href: "/#features" },
        { title: "About", href: "/about" },
        { title: "Contact", href: "/contact" },
    ]

    return (
        <header 
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                scrolled 
                ? "py-3 bg-background/60 backdrop-blur-xl border-b border-primary/10 shadow-[0_2px_40px_-10px_rgba(0,0,0,0.1)]" 
                : "py-5 bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <motion.div 
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
                            >
                                <GraduationCap size={26} strokeWidth={2.5} />
                                <div className="absolute -top-1 -right-1 flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-background"></span>
                                </div>
                            </motion.div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter text-foreground leading-none">
                                    SMART<span className="text-primary italic">EXAM</span>
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80 mt-1">
                                    Institutional Portal
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link 
                                        key={index} 
                                        href={item.href}
                                        className={`relative px-4 py-2 text-sm font-semibold transition-all hover:text-primary ${
                                            isActive ? "text-primary" : "text-muted-foreground"
                                        }`}
                                    >
                                        {item.title}
                                        {isActive && (
                                            <motion.div 
                                                layoutId="nav-underline"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full mx-4"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="w-10 h-10 flex items-center justify-center">
                            {mounted && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="rounded-full h-10 w-10 bg-secondary/30 border border-border/40 text-muted-foreground hover:text-primary transition-all active:scale-90"
                                >
                                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                </Button>
                            )}
                        </div>
                        <Link href="/sign-in">
                            <Button 
                                variant="outline" 
                                className="h-10 px-6 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-all font-bold"
                            >
                                Sign In
                            </Button>
                        </Link>
                         <Link href="/sign-in/admin">
                              <Button className="h-11 px-8 rounded-full bg-primary shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all group font-bold tracking-tight">
                                  Admin Portal
                              </Button>
                         </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-3">
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="rounded-xl bg-secondary/40"
                            >
                                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-foreground hover:bg-secondary/40 rounded-xl"
                        >
                            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden fixed inset-x-4 top-20 z-50 rounded-3xl border border-border/40 bg-background/95 backdrop-blur-xl p-6 shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                {navItems.map((item, index) => (
                                    <Link 
                                        key={index} 
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-bold text-muted-foreground hover:text-primary px-4 py-3 rounded-2xl hover:bg-primary/5 transition-all"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                            <div className="flex flex-col gap-3 pt-6 border-t border-border/40">
                                <Link href="/sign-in" className="w-full">
                                    <Button variant="outline" className="w-full h-12 rounded-2xl text-lg font-bold border-primary/20">Student Sign In</Button>
                                </Link>
                                <Link href="/sign-in/admin" className="w-full">
                                    <Button className="w-full h-12 rounded-2xl text-lg font-bold bg-primary shadow-lg shadow-primary/20">Admin Portal</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Navbar