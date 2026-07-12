'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit2, Trash2, GripVertical } from 'lucide-react'
import { mockDb, type ServiceItem } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const data = mockDb.services.findMany().sort((a, b) => a.sortOrder - b.sortOrder)
    setServices(data)
  }, [])

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个服务吗？')) {
      mockDb.services.delete(id)
      setServices(mockDb.services.findMany().sort((a, b) => a.sortOrder - b.sortOrder))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark-900">服务管理</h2>
          <p className="text-dark-500 mt-1">管理网站展示的服务项目</p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          新建服务
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-dark-200 overflow-hidden">
        <div className="p-4 border-b border-dark-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              placeholder="搜索服务..."
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600 w-12">排序</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600">服务</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600">价格</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-600">创建时间</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-dark-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              {filteredServices.map((item) => (
                <tr key={item.id} className="hover:bg-dark-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-dark-300 cursor-grab">
                      <GripVertical className="w-5 h-5" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                        <span className="text-xl font-bold">{item.title.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-dark-900">{item.title}</p>
                        <p className="text-sm text-dark-500 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-orange-600">{item.price || '-'}</span>
                  </td>
                  <td className="px-6 py-4 text-dark-500 text-sm">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/services/${item.id}`}
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

        {filteredServices.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-dark-500">暂无服务数据</p>
          </div>
        )}
      </div>
    </div>
  )
}
