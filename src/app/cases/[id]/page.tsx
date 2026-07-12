'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, ArrowRight, Calendar, Tag, Share2 } from 'lucide-react'
import { mockDb, type CaseStudy } from '@/lib/mock-data'

export default function CaseDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [caseItem, setCaseItem] = useState<CaseStudy | null>(null)
  const [relatedCases, setRelatedCases] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const item = mockDb.caseStudies.findUnique(parseInt(id))
    setCaseItem(item || null)

    if (item) {
      const related = mockDb
        .caseStudies
        .findMany()
        .filter((c) => c.id !== item.id && c.category === item.category)
        .slice(0, 3)
      setRelatedCases(related)
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

  if (!caseItem) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-dark-900 mb-4">案例不存在</h1>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-purple-600 font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> 返回案例列表
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const tags = JSON.parse(caseItem.tags || '[]')

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-dark-600 hover:text-purple-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> 返回案例列表
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                  {caseItem.category}
                </span>
                {caseItem.featured && (
                  <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                    精选案例
                  </span>
                )}
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
                {caseItem.title}
              </h1>
              <p className="text-xl text-dark-500 leading-relaxed mb-6">
                {caseItem.description}
              </p>
              <div className="flex items-center gap-6 text-dark-400 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(caseItem.createdAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {tags.length} 个标签
                </span>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <Image
                src={caseItem.imageUrl}
                alt={caseItem.title}
                className="w-full h-auto"
                width={1200}
                height={675}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 to-transparent" />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-dark-700 leading-relaxed space-y-6 text-lg">
                {caseItem.content.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-dark-200">
                {tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-dark-100 text-dark-600 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mb-12">
              <h3 className="text-lg font-semibold text-dark-900">分享这个案例</h3>
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-full bg-dark-100 text-dark-600 hover:bg-purple-100 hover:text-purple-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </article>
        </div>

        {relatedCases.length > 0 && (
          <section className="py-20 bg-purple-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <span className="text-orange-600 text-sm font-medium tracking-wider uppercase">
                  相关案例
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-dark-900 mt-4">
                  探索更多 <span className="text-gradient">精彩案例</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedCases.map((item) => (
                  <Link
                    key={item.id}
                    href={`/cases/${item.id}`}
                    className="group rounded-2xl overflow-hidden bg-white border border-dark-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        width={600}
                        height={340}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-purple-500/80 text-white text-xs">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-dark-900 font-semibold mb-2 group-hover:text-gradient transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-dark-500 text-sm line-clamp-2 mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center text-purple-600 font-medium text-sm">
                        查看详情 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-900 mb-4">
              也想拥有这样的 <span className="text-gradient">AI 解决方案</span>？
            </h2>
            <p className="text-dark-500 max-w-xl mx-auto mb-8">
              联系我们，让我们一起探讨如何用 AI 为您的业务创造价值。
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-brand text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              立即咨询 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
