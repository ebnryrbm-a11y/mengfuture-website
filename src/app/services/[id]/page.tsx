'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, ArrowRight, Check, Star, Zap } from 'lucide-react'
import { mockDb, type ServiceItem } from '@/lib/mock-data'

export default function ServiceDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [service, setService] = useState<ServiceItem | null>(null)
  const [relatedServices, setRelatedServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const item = mockDb.services.findUnique(parseInt(id))
    setService(item || null)

    if (item) {
      const related = mockDb
        .services
        .findMany()
        .filter((s) => s.id !== item.id)
        .slice(0, 2)
      setRelatedServices(related)
    }

    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-dark-500">加载中...</p>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-dark-900 mb-4">服务不存在</h1>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-purple-600 font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> 返回服务列表
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const features = JSON.parse(service.features || '[]')

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-dark-600 hover:text-purple-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> 返回服务列表
          </Link>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    {service.title}
                  </span>
                  {service.price && (
                    <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                      {service.price}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
                  {service.title}
                  <br />
                  <span className="text-gradient">专业解决方案</span>
                </h1>
                <p className="text-xl text-dark-500 leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-brand text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    立即咨询 <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/cases"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-dark-200 text-dark-700 font-medium hover:bg-dark-50 transition-all"
                  >
                    查看案例
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-brand rounded-3xl blur-3xl opacity-20" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-auto"
                    width={800}
                    height={600}
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl border border-dark-200 p-8">
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">服务详情</h2>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-dark-700 leading-relaxed space-y-4">
                      {service.content.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-900">服务亮点</h3>
                      <p className="text-sm text-dark-500">核心优势</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                          <Check className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-dark-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-dark-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-900">快速启动</h3>
                      <p className="text-sm text-dark-500">立即开始</p>
                    </div>
                  </div>
                  <p className="text-dark-500 text-sm mb-6">
                    填写简单的咨询表单，我们的专家将在 24 小时内与您联系。
                  </p>
                  <Link
                    href="#contact"
                    className="block w-full text-center py-3 rounded-xl bg-gradient-brand text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    免费咨询
                  </Link>
                </div>
              </div>
            </div>

            {relatedServices.length > 0 && (
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-dark-900">
                    更多 <span className="text-gradient">服务推荐</span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {relatedServices.map((item) => (
                    <Link
                      key={item.id}
                      href={`/services/${item.id}`}
                      className="group rounded-3xl overflow-hidden bg-white border border-dark-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          width={600}
                          height={340}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-6">
                          <h3 className="text-white font-bold text-xl">{item.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-dark-500 mb-4 line-clamp-2">{item.description}</p>
                        <div className="flex items-center text-purple-600 font-medium">
                          了解详情 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
