'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit2, Trash2, Star, StarOff } from 'lucide-react'
import { mockDb, type CaseStudy } from '@/lib/mock-data'
import { formatDate, cn } from '@/lib/utils'

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseStudy[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setCases(mockDb.caseStudies.findMany())
  }, [])

  const filteredCases = cases.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个案例吗？')) {
      mockDb.caseStudies.delete(id)
      setCases(mockDb.caseStudies.findMany())
    }
  }

  const handleToggleFeatured = (id: number) => {
    const caseItem = mockDb.caseStudies.findUnique(id)
    if (caseItem) {
      mockDb.caseStudies.update(id, { featured: !caseItem.featured })
      setCases(mockDb.caseStudies.findMany())
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark-900">案例管理</h2>
          <p className="text-dark-500 mt-1">管理网站展示的案例内容</p>
        </div>
        <Link
          href="/admin/cases/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          新建案例
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-dark-200 overflow-hidden">
        <div className="p-4 border-b border-dark-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              placeholder="搜索案例..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600">案例</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600">分类</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600">精选</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600">创建时间</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-dark-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              {filteredCases.map((item) => (
                <tr key={item.id} className="hover:bg-dark-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-dark-900">{item.title}</p>
                        <p className="text-sm text-dark-500 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      className={cn(
                        'p-2 rounded-lg transition-colors',
                        item.featured
                          ? 'text-orange-500 hover:bg-orange-50'
                          : 'text-dark-300 hover:bg-dark-100'
                      )}
                    >
                      {item.featured ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-dark-500 text-sm">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/cases/${item.id}`}
                        className="p-2 rounded-lg text-dark-500 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-dark-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCases.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-dark-500">暂无案例数据</p>
          </div>
        )}
      </div>
    </div>
  )
}
