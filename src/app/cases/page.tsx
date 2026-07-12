'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Search, Filter, ArrowRight, Eye } from 'lucide-react'
import { mockDb, type CaseStudy } from '@/lib/mock-data'

export default function CasesPage() {
  const [cases, setCases] = useState<CaseStudy[]>([])
  const [activeCategory, setActiveCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setCases(mockDb.caseStudies.findMany())
  }, [])

  const categories = ['全部', ...new Set(cases.map((c) => c.category))]

  const filteredCases = cases.filter((c) => {
    const matchesCategory = activeCategory === '全部' || c.category === activeCategory
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-gradient-purple-light">
          <div className="container mx-auto px-4 text-center">
            <span className="text-orange-600 text-sm font-medium tracking-wider uppercase">
              应用案例
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-4 mb-6">
              <span className="text-gradient">全场景落地</span>，AI 设计已照进现实
            </h1>
            <p className="text-dark-500 text-lg max-w-2xl mx-auto">
              为多家企业和机构提供 AI 生成 3D 解决方案，覆盖多个行业领域。
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category
                        ? 'bg-gradient-brand text-white shadow-lg shadow-purple-500/30'
                        : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="relative max-w-sm w-full md:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  placeholder="搜索案例..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                />
              </div>
            </div>

            {filteredCases.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCases.map((caseItem, index) => {
                  const tags = JSON.parse(caseItem.tags || '[]')
                  return (
                    <Link
                      key={caseItem.id}
                      href={`/cases/${caseItem.id}`}
                      className="group relative rounded-2xl overflow-hidden bg-white border border-dark-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={caseItem.imageUrl}
                          alt={caseItem.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          width={800}
                          height={450}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1 rounded-full bg-purple-500/80 text-white text-xs backdrop-blur">
                            {caseItem.category}
                          </span>
                          {caseItem.featured && (
                            <span className="px-3 py-1 rounded-full bg-orange-500/80 text-white text-xs backdrop-blur">
                              精选
                            </span>
                          )}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark-900/30">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <Eye className="w-7 h-7 text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-dark-900 font-semibold text-xl mb-3 group-hover:text-gradient transition-colors">
                          {caseItem.title}
                        </h3>
                        <p className="text-dark-500 text-sm mb-4 line-clamp-2">
                          {caseItem.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tags.slice(0, 3).map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded-full bg-dark-100 text-dark-500 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-purple-600 font-medium text-sm group-hover:gap-2 transition-all">
                          查看详情 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-dark-100 flex items-center justify-center">
                  <Filter className="w-10 h-10 text-dark-400" />
                </div>
                <p className="text-dark-500 text-lg">暂无匹配的案例</p>
                <button
                  onClick={() => {
                    setActiveCategory('全部')
                    setSearchQuery('')
                  }}
                  className="mt-4 text-purple-600 font-medium hover:underline"
                >
                  清除筛选条件
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-purple-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-900 mb-4">
              想了解更多 <span className="text-gradient">定制化方案</span>？
            </h2>
            <p className="text-dark-500 max-w-xl mx-auto mb-8">
              我们的专家团队将为您提供一对一的咨询服务，找到最适合您的解决方案。
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
