"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { View, Common } from '@/components/canvas/View'
import { HeroModel } from '@/components/three/HeroModel'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {

    gsap.to('.hero-title', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    })

    gsap.to('.hero-cta', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    })

    gsap.to('.hero-stats', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    })

    gsap.to('.hero-3d-container', {
      scale: 1,
      opacity: 1,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out',
    })

    gsap.to('.hero-particles', {
      opacity: 1,
      duration: 1.5,
      delay: 0.5,
      ease: 'power2.out',
    })

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    heroTimeline
      .to('.hero-text-content', { opacity: 0, y: -50, duration: 1 })
      .to('.hero-3d-container', { scale: 0.8, opacity: 0.5, y: 100, duration: 1 }, '<')

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-purple-50 via-white to-orange-50">
      <div className="absolute inset-0 bg-grid-pattern mask-radial-fade opacity-20" />

      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {isHydrated && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none hero-particles" style={{ opacity: 0 }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 hero-text-content" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-purple-200 text-dark-900 text-sm">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>🏆 湖工大首家 AI + 工业设计科创企业</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-900 leading-tight hero-title" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                用 AI 生成 3D，
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-900 leading-tight hero-title" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <span className="text-gradient">重新定义设计</span>
              </h1>
            </div>

            <p className="text-lg text-dark-600 max-w-lg leading-relaxed hero-title" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              空间智能是继语言智能之后，AI 下一个千亿级赛道。
              <br />
              萌未来将以 AI 生成 3D 为切入点，成为这一浪潮中的先行者。
            </p>

            <div className="flex flex-wrap gap-4 hero-cta" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <Link
                href="#cases"
                className="group px-8 py-4 rounded-full bg-gradient-brand text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                查看案例
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 rounded-full bg-white/60 backdrop-blur-xl border border-purple-200 text-dark-900 font-medium hover:bg-white/20 transition-all hover:scale-105"
              >
                商务合作
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-dark-200 hero-stats" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <div>
                <div className="text-3xl font-bold text-dark-900">100<span className="text-orange-400">%</span></div>
                <div className="text-sm text-dark-400 mt-1">AI 驱动工作流</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-dark-900">50<span className="text-purple-400">+</span></div>
                <div className="text-sm text-dark-400 mt-1">成功交付案例</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-dark-900">00<span className="text-orange-400">后</span></div>
                <div className="text-sm text-dark-400 mt-1">硕士创始团队</div>
              </div>
            </div>
          </div>

          <div className="hero-3d-container" style={{ opacity: 0, transform: 'scale(0.9)' }}>
            <div className="h-[500px] lg:h-[600px]">
              <View className="w-full h-full">
                <Common />
                <HeroModel />
              </View>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1000&auto=format&fit=crop"
              alt="AI 3D 渲染展示"
              className="w-full h-48 object-cover rounded-2xl mt-4"
              width={1000}
              height={200}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-dark-400 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs">向下滚动</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  )
}
