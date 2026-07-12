'use client'

import { useEffect, useState } from 'react'
import { Search, Eye, Mail, Phone, Building } from 'lucide-react'
import { mockDb, type Consultation } from '@/lib/mock-data'
import { formatDate, cn } from '@/lib/utils'

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)

  useEffect(() => {
    const data = mockDb.consultations.findMany().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    setConsultations(data)
  }, [])

  const filteredConsultations = consultations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateStatus = (id: number, newStatus: string) => {
    mockDb.consultations.update(id, { status: newStatus })
    const updated = mockDb.consultations.findMany().sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    setConsultations(updated)
    if (selectedConsultation && selectedConsultation.id === id) {
      setSelectedConsultation({ ...selectedConsultation, status: newStatus })
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: '待处理', className: 'bg-yellow-100 text-yellow-700' },
      contacted: { label: '已联系', className: 'bg-blue-100 text-blue-700' },
      completed: { label: '已完成', className: 'bg-green-100 text-green-700' },
    }
    const s = statusMap[status] || statusMap.pending
    return (
      <span className={cn('px-3 py-1 rounded-full text-xs font-medium', s.className)}>
        {s.label}
      </span>
    )
  }

  const statusCounts = {
    all: consultations.length,
    pending: consultations.filter((c) => c.status === 'pending').length,
    contacted: consultations.filter((c) => c.status === 'contacted').length,
    completed: consultations.filter((c) => c.status === 'completed').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark-900">咨询管理</h2>
          <p className="text-dark-500 mt-1">管理用户提交的咨询留言</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: 'all', label: '全部', count: statusCounts.all, color: 'text-dark-600 bg-dark-100' },
          { key: 'pending', label: '待处理', count: statusCounts.pending, color: 'text-yellow-600 bg-yellow-100' },
          { key: 'contacted', label: '已联系', count: statusCounts.contacted, color: 'text-blue-600 bg-blue-100' },
          { key: 'completed', label: '已完成', count: statusCounts.completed, color: 'text-green-600 bg-green-100' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setStatusFilter(item.key)}
            className={cn(
              'p-4 rounded-xl border transition-all text-left',
              statusFilter === item.key
                ? 'border-purple-400 bg-purple-50'
                : 'border-dark-200 bg-white hover:border-dark-300'
            )}
          >
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', item.color)}>
              <span className="font-bold">{item.count}</span>
            </div>
            <p className="font-medium text-dark-900">{item.label}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-dark-200 overflow-hidden">
          <div className="p-4 border-b border-dark-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="搜索咨询..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          <div className="divide-y divide-dark-100 max-h-[600px] overflow-y-auto">
            {filteredConsultations.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedConsultation(item)}
                className={cn(
                  'p-4 cursor-pointer transition-colors',
                  selectedConsultation?.id === item.id
                    ? 'bg-purple-50'
                    : 'hover:bg-dark-50'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-medium text-dark-900">{item.name}</p>
                      {getStatusBadge(item.status)}
                    </div>
                    <p className="text-dark-500 text-sm line-clamp-2">{item.message}</p>
                    <p className="text-dark-400 text-xs mt-2">{formatDate(item.createdAt)}</p>
                  </div>
                  <Eye className="w-4 h-4 text-dark-400 flex-shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>

          {filteredConsultations.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-dark-500">暂无咨询记录</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-dark-200 p-6 h-fit sticky top-6">
          {selectedConsultation ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-dark-900">咨询详情</h3>
                {getStatusBadge(selectedConsultation.status)}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-dark-500 mb-1">咨询人</p>
                  <p className="font-medium text-dark-900">{selectedConsultation.name}</p>
                </div>
                <div>
                  <p className="text-sm text-dark-500 mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> 邮箱
                  </p>
                  <a
                    href={`mailto:${selectedConsultation.email}`}
                    className="text-purple-600 hover:underline"
                  >
                    {selectedConsultation.email}
                  </a>
                </div>
                {selectedConsultation.phone && (
                  <div>
                    <p className="text-sm text-dark-500 mb-1 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> 电话
                    </p>
                    <a
                      href={`tel:${selectedConsultation.phone}`}
                      className="text-purple-600 hover:underline"
                    >
                      {selectedConsultation.phone}
                    </a>
                  </div>
                )}
                {selectedConsultation.company && (
                  <div>
                    <p className="text-sm text-dark-500 mb-1 flex items-center gap-2">
                      <Building className="w-4 h-4" /> 公司
                    </p>
                    <p className="text-dark-900">{selectedConsultation.company}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-dark-500 mb-1">咨询服务</p>
                  <p className="text-dark-900">{selectedConsultation.service}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-dark-200">
                <p className="text-sm text-dark-500 mb-2">留言内容</p>
                <p className="text-dark-700 text-sm leading-relaxed">
                  {selectedConsultation.message}
                </p>
              </div>

              <div className="pt-4 border-t border-dark-200">
                <p className="text-sm text-dark-500 mb-3">更新状态</p>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'contacted', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedConsultation.id, status)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        selectedConsultation.status === status
                          ? 'bg-gradient-brand text-white'
                          : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
                      )}
                    >
                      {status === 'pending' ? '待处理' : status === 'contacted' ? '已联系' : '已完成'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-dark-500">请选择一条咨询查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
