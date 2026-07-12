"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Eye } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(
      '.cases-title',
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
      '.case-card',
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

  const cases = [
    {
      id: 1,
      title: '企业产品 3D 建模',
      category: 'AI 建模',
      description: '为家电品牌提供全系列产品的 AI 3D 建模服务',
      tags: ['家电', '产品设计'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 2,
      title: '文物数字化保护',
      category: '文博数字化',
      description: '与湖北省博物馆合作，对馆藏文物进行高精度三维数字化',
      tags: ['文物', '博物馆'],
      image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 3,
      title: '宠物 IP 形象定制',
      category: 'IP 定制',
      description: '基于宠物照片生成专属的 3D 虚拟形象',
      tags: ['宠物', 'IP'],
      image: 'https://images.unsplash.com/photo-1591946614720-90a587da4f36?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 4,
      title: '虚拟展厅开发',
      category: '3D 互动',
      description: '打造线上虚拟展厅，支持 VR 沉浸式体验',
      tags: ['展厅', 'VR'],
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 5,
      title: 'LoRA 模型微调',
      category: '企业服务',
      description: '为制造业企业定制 LoRA 模型',
      tags: ['企业', 'LoRA'],
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 6,
      title: '3D 打印手办',
      category: '3D 打印',
      description: '运用 3D 打印技术制作高精度手办模型',
      tags: ['手办', '3D 打印'],
      image: 'https://images.unsplash.com/photo-1578575437130-527eed1015b1?q=80&w=1000&auto=format&fit=crop',
    },
  ]

  return (
    <section ref={sectionRef} id="cases" className="py-20 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-orange-600 text-sm font-medium tracking-wider uppercase">应用案例</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-4 mb-6 cases-title">
            全场景落地，<span className="text-gradient">AI 设计已照进现实</span>
          </h2>
          <p className="text-dark-500 text-lg leading-relaxed cases-title">
            为多家企业和机构提供 AI 生成 3D 解决方案，覆盖多个行业领域。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['全部', 'AI 建模', '文博数字化', 'IP 定制', '3D 互动', '企业服务', '3D 打印'].map((tag) => (
            <button
              key={tag}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                tag === '全部'
                  ? 'bg-gradient-brand text-white'
                  : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden mb-8">
          <Image
            src="https://images.unsplash.com/photo-1505739998589-00fc191ce01d?q=80&w=1470&auto=format&fit=crop"
            alt="AI 生成 3D 赋能各行业"
            className="w-full h-56 object-cover"
            width={1470}
            height={300}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h3 className="text-dark-900 font-semibold text-2xl">AI 生成 3D 赋能各行业</h3>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <Link
              key={caseItem.id}
              href={`/cases/${caseItem.id}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-dark-200 hover:border-purple-400 hover:shadow-lg transition-all case-card"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  width={1000}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-purple-500/80 text-white text-xs">
                    {caseItem.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-dark-900 font-semibold text-lg mb-2 group-hover:text-gradient transition-colors">
                  {caseItem.title}
                </h3>
                <p className="text-dark-400 text-sm mb-3 line-clamp-2">{caseItem.description}</p>
                <div className="flex flex-wrap gap-2">
                  {caseItem.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-dark-100 text-dark-500 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="#cases" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-brand text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105">
            查看更多案例 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
