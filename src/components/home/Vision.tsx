"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Target, Rocket, Globe, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(
      '.vision-title',
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
      '.vision-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
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

  const visions = [
    {
      icon: Target,
      title: '近期目标',
      year: '2024',
      desc: '完成 50+ 企业客户交付，建立完整产品线',
      gradient: 'from-purple-50 to-purple-100/50',
    },
    {
      icon: Rocket,
      title: '中期目标',
      year: '2025',
      desc: '打造行业领先的 AI 3D 平台，拓展海外市场',
      gradient: 'from-orange-50 to-orange-100/50',
    },
    {
      icon: Globe,
      title: '长期愿景',
      year: '2026+',
      desc: '成为空间智能领域独角兽，构建开放生态',
      gradient: 'from-purple-50 to-purple-100/50',
    },
  ]

  return (
    <section ref={sectionRef} id="vision" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-purple-600 text-sm font-medium tracking-wider uppercase">未来愿景</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-4 mb-6 vision-title">
            成为<span className="text-gradient">空间智能</span>赛道的领导者
          </h2>
          <p className="text-dark-500 text-lg leading-relaxed vision-title">
            空间智能将是继语言智能之后，AI 下一个千亿级赛道。
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {visions.map((vision, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl bg-gradient-to-b ${vision.gradient} border border-dark-200 hover:border-purple-500/30 transition-all vision-card`}
            >
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1.5 rounded-full bg-gradient-brand text-white text-xs font-medium">
                  {vision.year}
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
                <vision.icon className="w-6 h-6" />
              </div>

              <h3 className="text-dark-900 font-semibold text-xl mb-3">{vision.title}</h3>
              <p className="text-dark-400 text-sm">{vision.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 relative rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1470&auto=format&fit=crop"
            alt="未来愿景"
            className="w-full h-72 object-cover"
            width={1470}
            height={450}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-dark-900 font-semibold text-2xl mb-3">加入我们，一起创造未来</h3>
              <p className="text-dark-500 text-sm mb-6 max-w-xl mx-auto">
                如果你对 AI 生成 3D、空间智能、创业充满热情，欢迎加入！
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link href="#join" className="px-6 py-3 rounded-full bg-gradient-brand text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2">
                  查看招聘 <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#contact" className="px-6 py-3 rounded-full bg-white/60 backdrop-blur-xl border border-purple-200 text-dark-900 font-medium hover:bg-white/20 transition-all">
                  商务合作
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
