'use client'

import { useEffect, useState } from 'react'
import {
  Briefcase,
  Settings,
  Users,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'
import { mockDb } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  trend?: string
  color: 'purple' | 'orange' | 'blue' | 'green'
}

function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-dark-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-dark-900 mt-2">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    cases: 0,
    services: 0,
    team: 0,
    consultations: 0,
  })

  useEffect(() => {
    setStats({
      cases: mockDb.caseStudies.findMany().length,
      services: mockDb.services.findMany().length,
      team: mockDb.teamMembers.findMany().length,
      consultations: mockDb.consultations.findMany().length,
    })
  }, [])

  const recentConsultations = mockDb.consultations.findMany().slice(0, 5)
  const recentCases = mockDb.caseStudies.findMany().slice(0, 5)

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: '待处理', className: 'bg-yellow-100 text-yellow-700' },
      contacted: { label: '已联系', className: 'bg-blue-100 text-blue-700' },
      completed: { label: '已完成', className: 'bg-green-100 text-green-700' },
    }
    const s = statusMap[status] || statusMap.pending
    return (
      <span className={cn('px-2 py-1 rounded-full text-xs font-medium', s.className)}>
        {s.label}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="案例总数"
          value={stats.cases}
          icon={Briefcase}
          trend="+12% 本月"
          color="purple"
        />
        <StatCard
          title="服务项目"
          value={stats.services}
          icon={Settings}
          trend="+5% 本月"
          color="orange"
        />
        <StatCard
          title="团队成员"
          value={stats.team}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="咨询留言"
          value={stats.consultations}
          icon={MessageSquare}
          trend="+23% 本月"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-dark-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-dark-900">最新咨询</h2>
            <span className="text-purple-600 text-sm font-medium cursor-pointer hover:underline">
              查看全部
            </span>
          </div>
          <div className="space-y-4">
            {recentConsultations.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-4 rounded-xl bg-dark-50 hover:bg-dark-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-dark-900">{item.name}</p>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-dark-500 text-sm mt-1 truncate">{item.message}</p>
                  <p className="text-dark-400 text-xs mt-2">{item.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-dark-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-dark-900">精选案例</h2>
            <span className="text-purple-600 text-sm font-medium cursor-pointer hover:underline">
              查看全部
            </span>
          </div>
          <div className="space-y-4">
            {recentCases.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-dark-50 hover:bg-dark-100 transition-colors"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-dark-900 truncate">{item.title}</p>
                  <p className="text-dark-500 text-sm truncate">{item.category}</p>
                  {item.featured && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-medium">
                      精选
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-dark-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-dark-900">快速操作</h2>
            <p className="text-dark-500 text-sm">常用功能快捷入口</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '新建案例', href: '/admin/cases', color: 'from-purple-500 to-purple-600' },
            { label: '添加服务', href: '/admin/services', color: 'from-orange-500 to-orange-600' },
            { label: '添加成员', href: '/admin/team', color: 'from-blue-500 to-blue-600' },
            { label: '查看咨询', href: '/admin/consultations', color: 'from-green-500 to-green-600' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'p-6 rounded-xl bg-gradient-to-br text-white text-center font-medium hover:scale-105 transition-transform',
                item.color
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
