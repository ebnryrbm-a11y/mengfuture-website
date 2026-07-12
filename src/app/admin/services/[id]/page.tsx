'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { mockDb } from '@/lib/mock-data'

export default function AdminServiceEditPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const isNew = id === 'new'

  const [formData, setFormData] = useState({
    title: '',
    icon: '',
    description: '',
    content: '',
    imageUrl: '',
    features: '',
    price: '',
    sortOrder: 0,
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      setLoading(true)
      const service = mockDb.services.findUnique(parseInt(id))
      if (service) {
        setFormData({
          title: service.title,
          icon: service.icon,
          description: service.description,
          content: service.content,
          imageUrl: service.imageUrl,
          features: service.features,
          price: service.price || '',
          sortOrder: service.sortOrder,
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
        mockDb.services.create({
          ...formData,
          price: formData.price || null,
          features: formData.features || '[]',
        })
      } else {
        mockDb.services.update(parseInt(id), {
          ...formData,
          price: formData.price || null,
          features: formData.features || '[]',
        })
      }
      router.push('/admin/services')
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
          href="/admin/services"
          className="p-2 rounded-lg border border-dark-200 text-dark-600 hover:bg-dark-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-dark-900">
            {isNew ? '新建服务' : '编辑服务'}
          </h2>
          <p className="text-dark-500 mt-1">
            {isNew ? '创建一个新的服务项目' : '修改服务信息'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-dark-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                服务名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="请输入服务名称"
                className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              图标名称
            </label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Lucide 图标名称，如 Box"
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              价格
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="如：¥999起"
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          <div className="lg:col-span-2">
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
              placeholder="服务的简短描述，用于列表展示"
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
              placeholder="服务的详细内容介绍"
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-dark-700 mb-2">
              服务特性（JSON 数组格式）
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={3}
              placeholder='["特性1", "特性2", "特性3"]'
              className="w-full px-4 py-2.5 rounded-xl border border-dark-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none font-mono text-sm"
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
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-dark-200">
          <Link
            href="/admin/services"
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
