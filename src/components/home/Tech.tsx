"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Code, Layers, Zap, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Tech() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(
      '.tech-title',
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
      '.tech-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )

    gsap.fromTo(
      '.tech-flow',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.tech-flow-container',
          start: 'top 70%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const techStack = [
    { icon: Brain, label: 'AI 大模型', desc: '多模态生成' },
    { icon: Code, label: 'Python', desc: '核心引擎' },
    { icon: Layers, label: 'Three.js', desc: '3D 渲染' },
    { icon: Zap, label: 'GSAP', desc: '动效引擎' },
  ]

  const flowSteps = [
    { step: '01', title: '创意输入', desc: '文本/图片' },
    { step: '02', title: 'AI 生成', desc: '智能建模' },
    { step: '03', title: '预览优化', desc: '实时调整' },
    { step: '04', title: '导出交付', desc: '多格式输出' },
  ]

  return (
    <section ref={sectionRef} id="tech" className="py-20 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-orange-600 text-sm font-medium tracking-wider uppercase">技术优势</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-4 mb-6 tech-title">
            从文字到实物，<span className="text-gradient">全链路 AI 设计</span>
          </h2>
          <p className="text-dark-500 text-lg leading-relaxed tech-title">
            整合最先进的人工智能技术与三维图形学，构建完整的 AI 生成 3D 工作流。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {techStack.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white border border-dark-200 text-center hover:border-purple-400 hover:shadow-md transition-all tech-item"
            >
              <item.icon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-dark-900 font-medium text-sm">{item.label}</div>
              <div className="text-dark-400 text-xs mt-1">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden mb-12">
          <Image
            src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1470&auto=format&fit=crop"
            alt="AI 3D 技术"
            className="w-full h-80 object-cover"
            width={1470}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="tech-flow-container relative max-w-4xl">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/50 via-orange-500/50 to-purple-500/50" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 tech-flow">
                  {flowSteps.map((step, index) => (
                    <div key={index} className="relative text-center">
                      <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-gradient-brand flex items-center justify-center mb-3 shadow-lg shadow-purple-500/30">
                        <span className="text-white font-bold text-lg">{step.step}</span>
                      </div>
                      <h3 className="text-dark-900 font-semibold text-sm mb-1">{step.title}</h3>
                      <p className="text-dark-400 text-xs">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="#tech" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors">
            了解更多技术细节 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
