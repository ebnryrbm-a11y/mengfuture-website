"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, Printer, Database, Video, BookOpen, PawPrint, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(
      '.services-title',
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
      '.service-card',
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const services = [
    {
      icon: Palette,
      title: 'AI 建模与渲染',
      description: '输入文字或图片即可快速生成高质量三维模型',
      color: 'purple',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    },
    {
      icon: Printer,
      title: '3D 打印服务',
      description: '从数字模型到实体产品的完整解决方案',
      color: 'orange',
      image: 'https://images.unsplash.com/photo-1561250056-32d80e5a4b76?q=80&w=1000&auto=format&fit=crop',
    },
    {
      icon: Database,
      title: '企业 LoRA 微调',
      description: '定制专属 AI 生成能力，提升品牌一致性',
      color: 'purple',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop',
    },
    {
      icon: Video,
      title: '3D 交互动画',
      description: '产品展示、虚拟展厅、线上发布会',
      color: 'orange',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
    },
    {
      icon: BookOpen,
      title: '文博 3D 数字化',
      description: '文物高精度三维数字化，永久保存文化遗产',
      color: 'purple',
      image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3cc5?q=80&w=1000&auto=format&fit=crop',
    },
    {
      icon: PawPrint,
      title: '宠物 IP 定制',
      description: '基于照片生成专属 3D 虚拟形象',
      color: 'orange',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1000&auto=format&fit=crop',
    },
  ]

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-purple-600 text-sm font-medium tracking-wider uppercase">服务体系</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-4 mb-6 services-title">
            一站式<span className="text-gradient">AI 设计</span>全流程服务
          </h2>
          <p className="text-dark-500 text-lg leading-relaxed services-title">
            从 AI 建模到 3D 打印，从数字内容到实体产品，提供完整解决方案。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={index}
                href={`/services/${index + 1}`}
                className="group relative rounded-2xl overflow-hidden border border-dark-200 hover:border-purple-400 hover:shadow-lg transition-all service-card"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                  width={1000}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all ${
                    service.color === 'purple'
                      ? 'bg-purple-500/30 text-purple-600'
                      : 'bg-orange-500/30 text-orange-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-dark-900 font-semibold text-lg mb-2 group-hover:text-gradient">{service.title}</h3>
                  <p className="text-dark-400 text-sm leading-relaxed mb-3">{service.description}</p>
                  <div className="flex items-center gap-2 text-purple-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    了解更多 <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="#services" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors">
            查看全部服务 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
