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
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (pathname?.startsWith("/faculty") || pathname?.startsWith("/students")) {
        return null;
    }

    const navItems = [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Contact", href: "/contact" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8 md:gap-12">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                                <GraduationCap size={24} strokeWidth={2.5} />
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-background"></span>
                                </span>
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

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            {navItems.map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={item.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="rounded-full text-muted-foreground hover:text-primary hover:bg-secondary"
                            >
                                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        )}
                        <Link href="/sign-in">
                        <Button variant="outline" className="border-border text-foreground hover:bg-secondary">Login</Button>
                        </Link>
                        <Link href="/sign-up">
                        <Button>Register</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-2">
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="rounded-full text-muted-foreground hover:text-primary hover:bg-secondary"
                            >
                                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-muted-foreground hover:text-primary hover:bg-secondary"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border bg-background px-4 py-4 shadow-lg overflow-hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary py-2 border-b border-border/50 transition-colors"
                                >
                                    {item.title}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 mt-2">
                                <Link href="/sign-in">
                                <Button variant="outline" className="w-full justify-center border-border">Login</Button>
                                </Link>
                                <Link href="/sign-up">
                                <Button className="w-full justify-center">Register</Button>
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