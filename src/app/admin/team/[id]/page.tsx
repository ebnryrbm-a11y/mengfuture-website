'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { mockDb } from '@/lib/mock-data'

export default function AdminTeamEditPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const isNew = id === 'new'

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    avatarUrl: '',
    socialLinks: '',
    sortOrder: 0,
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      setLoading(true)
      const member = mockDb.teamMembers.findUnique(parseInt(id))
      if (member) {
        setFormData({
          name: member.name,
          role: member.role,
          description: member.description,
          avatarUrl: member.avatarUrl,
          socialLinks: member.socialLinks,
          sortOrder: member.sortOrder,
        })
      }
      setLoading(false)
    }
  }, [id, isNew])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (isNew) {
        mockDb.teamMembers.create({
          ...formData,
          socialLinks: formData.socialLinks || '{}',
        })
      } else {
        mockDb.teamMembers.update(parseInt(id), {
          ...formData,
          socialLinks: formData.socialLinks || '{}',
        })
      }
      router.push('/admin/team')
    } catch (error) {
      alert('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sortOrder' ? parseInt(value) || 0 : value,
    }))
  }

  if (loading) {
    return <div className="text-center py-12 text-dark-500">加载中...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/team"
          className="p-2 rounded-lg border border-dark-200 text-dark-600 hover:bg-dark-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-dark-900">
            {isNew ? '添加成员' : '编辑成员'}
          </h2>
          <p className="text-dark-500 mt-1">
            {isNew ? '添加一个新的团队成员' : '修改成员信息'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-dark-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                姓名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="请输入姓名"
                className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              职位 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder="如：创始人 & CEO"
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              排序
            </label>
            <input
              type="number"
              name="sortOrder"
              value={formData.sortOrder}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-dark-700 mb-2">
              头像 URL
            </label>
            <input
              type="url"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-dark-700 mb-2">
              个人简介
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="成员的个人简介"
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-dark-700 mb-2">
              社交链接（JSON 格式）
            </label>
            <textarea
              name="socialLinks"
              value={formData.socialLinks}
              onChange={handleChange}
              rows={3}
              placeholder='{"linkedin": "https://linkedin.com", "github": "https://github.com"}'
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none font-mono text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-dark-200">
          <Link
            href="/admin/team"
            className="px-6 py-2.5 rounded-xl border border-dark-200 text-dark-600 font-medium hover:bg-dark-50 transition-colors"
          >
            取消
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-brand text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </form>
    </div>
  )
}
