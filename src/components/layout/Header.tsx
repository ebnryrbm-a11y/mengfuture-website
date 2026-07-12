"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: '公司介绍', href: '#about' },
    { label: '技术介绍', href: '#tech' },
    { label: '服务体系', href: '#services' },
    { label: '应用案例', href: '#cases' },
    { label: '未来愿景', href: '#vision' },
    { label: '加入我们', href: '#join' },
    { label: '联系我们', href: '#contact' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="萌未来 Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-dark-700 hover:text-purple-600 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-brand transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button className="flex items-center gap-2 text-dark-700 hover:text-purple-600 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm">中/EN</span>
            </button>
            <Link
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-gradient-brand text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
            >
              立即咨询
            </Link>
          </div>

          <button
            className="lg:hidden text-dark-700 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-dark-200">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-dark-700 hover:text-purple-600 py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="block w-full text-center px-6 py-3 rounded-full bg-gradient-brand text-white font-medium mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              立即咨询
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
