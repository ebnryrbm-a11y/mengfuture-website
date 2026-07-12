'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { mockDb } from '@/lib/mock-data'

export default function AdminCaseEditPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const isNew = id === 'new'

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    content: '',
    imageUrl: '',
    tags: '',
    featured: false,
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      setLoading(true)
      const caseItem = mockDb.caseStudies.findUnique(parseInt(id))
      if (caseItem) {
        setFormData({
          title: caseItem.title,
          category: caseItem.category,
          description: caseItem.description,
          content: caseItem.content,
          imageUrl: caseItem.imageUrl,
          tags: caseItem.tags,
          featured: caseItem.featured,
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
        mockDb.caseStudies.create({
          ...formData,
          tags: formData.tags || '[]',
        })
      } else {
        mockDb.caseStudies.update(parseInt(id), {
          ...formData,
          tags: formData.tags || '[]',
        })
      }
      router.push('/admin/cases')
    } catch (error) {
      alert('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-dark-500">加载中...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/cases"
          className="p-2 rounded-lg border border-dark-200 text-dark-600 hover:bg-dark-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-dark-900">
            {isNew ? '新建案例' : '编辑案例'}
          </h2>
          <p className="text-dark-500 mt-1">
            {isNew ? '创建一个新的案例' : '修改案例信息'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-dark-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                案例标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="请输入案例标题"
                className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              分类 <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            >
              <option value="">请选择分类</option>
              <option value="AI 建模">AI 建模</option>
              <option value="文博数字化">文博数字化</option>
              <option value="IP 定制">IP 定制</option>
              <option value="3D 互动">3D 互动</option>
              <option value="企业服务">企业服务</option>
              <option value="3D 打印">3D 打印</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              封面图片 URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-dark-700 mb-2">
              简短描述
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              placeholder="案例的简短描述，用于列表展示"
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-dark-700 mb-2">
              详细内容
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              placeholder="案例的详细内容介绍"
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              标签（JSON 数组格式）
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder='["标签1", "标签2"]'
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-dark-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-dark-700">设为精选案例</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-dark-200">
          <Link
            href="/admin/cases"
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
