'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { mockDb, type ServiceItem } from '@/lib/mock-data'

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    const data = mockDb.services.findMany().sort((a, b) => a.sortOrder - b.sortOrder)
    setServices(data)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-gradient-purple-light">
          <div className="container mx-auto px-4 text-center">
            <span className="text-orange-600 text-sm font-medium tracking-wider uppercase">
              服务体系
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-4 mb-6">
              <span className="text-gradient">全链路 AI 3D</span> 服务解决方案
            </h1>
            <p className="text-dark-500 text-lg max-w-2xl mx-auto">
              从 AI 建模到 3D 打印，从模型微调到虚拟展示，为您提供一站式 AI 生成 3D 服务。
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const features = JSON.parse(service.features || '[]')
                return (
                  <div
                    key={service.id}
                    className="group relative rounded-3xl overflow-hidden bg-white border border-dark-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={600}
                        height={340}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-white font-bold text-2xl mb-2">{service.title}</h3>
                        {service.price && (
                          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium">
                            {service.price}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-dark-500 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        {features.slice(0, 4).map((feature: string, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-purple-600" />
                            </div>
                            <span className="text-dark-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-xl bg-gradient-to-r from-purple-50 to-orange-50 text-purple-700 font-medium group-hover:bg-gradient-brand group-hover:text-white transition-all"
                      >
                        了解详情
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-dark-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-orange-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                企业定制方案
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                需要 <span className="text-gradient">定制化</span> 解决方案？
              </h2>
              <p className="text-dark-300 text-lg mb-8 leading-relaxed">
                我们提供企业级定制服务，根据您的具体需求和业务场景，
                量身打造专属的 AI 生成 3D 解决方案。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-brand text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
                >
                  联系我们 <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/cases"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all"
                >
                  查看案例
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-orange-600 text-sm font-medium tracking-wider uppercase">
                服务流程
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-900 mt-4">
                简单四步，开启 <span className="text-gradient">AI 3D 之旅</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: '需求沟通', desc: '深入了解您的业务需求和目标' },
                { step: '02', title: '方案设计', desc: '制定专属的技术方案和实施计划' },
                { step: '03', title: '开发交付', desc: '高效执行，按时交付高质量成果' },
                { step: '04', title: '持续支持', desc: '提供长期的技术支持和优化服务' },
              ].map((item, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-brand flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-purple-500/30">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-dark-900 mb-2">{item.title}</h3>
                  <p className="text-dark-500">{item.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-transparent -translate-x-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
