'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: '仪表盘', href: '/admin', icon: LayoutDashboard },
  { label: '案例管理', href: '/admin/cases', icon: Briefcase },
  { label: '服务管理', href: '/admin/services', icon: Settings },
  { label: '团队管理', href: '/admin/team', icon: Users },
  { label: '咨询管理', href: '/admin/consultations', icon: MessageSquare },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-dark-50">
      <div
        className={cn(
          'fixed top-0 left-0 h-full bg-white border-r border-dark-200 z-40 transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-dark-200">
          {sidebarOpen && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <span className="text-white font-bold text-sm">萌</span>
              </div>
              <span className="font-bold text-dark-900">萌未来 CMS</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-dark-100 text-dark-500 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                  isActive
                    ? 'bg-gradient-brand text-white shadow-lg shadow-purple-500/30'
                    : 'text-dark-600 hover:bg-dark-100'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-dark-900 text-sm truncate">管理员</p>
                  <p className="text-xs text-dark-500 truncate">admin@mengfuture.com</p>
                </div>
              </div>
              <button className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-dark-200 text-dark-600 text-sm hover:bg-dark-50 transition-colors">
                <LogOut className="w-4 h-4" />
                退出登录
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={cn(
          'transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        <header className="sticky top-0 z-30 bg-white border-b border-dark-200 h-16 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-dark-900">
              {navItems.find(
                (item) =>
                  pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href))
              )?.label || '仪表盘'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center cursor-pointer">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
