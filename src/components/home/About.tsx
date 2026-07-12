"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Rocket, Users, Award, TrendingUp, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(
      '.about-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )

    gsap.fromTo(
      '.about-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const cards = [
    {
      icon: Rocket,
      title: '科技驱动',
      description: '以 AI 生成 3D 为核心技术',
      color: 'from-purple-500/20 to-purple-500/5',
      iconColor: 'text-purple-600',
    },
    {
      icon: Users,
      title: '年轻团队',
      description: '00 后硕士创始团队',
      color: 'from-orange-500/20 to-orange-500/5',
      iconColor: 'text-orange-400',
    },
    {
      icon: Award,
      title: '荣誉认证',
      description: '湖工大首家 AI+工业设计科创企业',
      color: 'from-purple-500/20 to-purple-500/5',
      iconColor: 'text-purple-600',
    },
    {
      icon: TrendingUp,
      title: '高速成长',
      description: '从校园创业到商业落地',
      color: 'from-orange-500/20 to-orange-500/5',
      iconColor: 'text-orange-400',
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-purple-600 text-sm font-medium tracking-wider uppercase">关于我们</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-4 mb-6 about-title">
            萌未来——空间智能赛道的<span className="text-gradient">先行者</span>
          </h2>
          <p className="text-dark-500 text-lg leading-relaxed about-title">
            湖北工业大学首家 AI + 工业设计科创企业，用 AI 重新定义设计流程。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-dark-50 border border-dark-200 hover:border-purple-300 transition-all hover:transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 about-card`}
            >
              <div className={`w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 ${card.iconColor}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="text-dark-900 font-semibold text-lg mb-2">{card.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => {}}>
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop"
            alt="萌未来团队"
            className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            width={1470}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <h3 className="text-dark-900 font-semibold text-xl mb-1">00 后硕士团队，用 AI 搞点不一样的事</h3>
              <p className="text-dark-500 text-sm">从湖北工业大学实验室走出的创新力量</p>
            </div>
            <Link href="#join" className="px-4 py-2 rounded-full bg-gradient-brand text-white text-sm font-medium flex items-center gap-2 hover:shadow-lg transition-all">
              了解团队 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="#about" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors">
            了解更多关于我们 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
