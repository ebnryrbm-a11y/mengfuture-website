"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      '.contact-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )

    gsap.fromTo(
      '.contact-info',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: '邮箱',
      content: 'contact@mengfuture.com',
      description: '商务合作咨询',
    },
    {
      icon: Phone,
      title: '电话',
      content: '400-xxx-xxxx',
      description: '工作日 9:00-18:00',
    },
    {
      icon: MapPin,
      title: '地址',
      content: '湖北省武汉市湖北工业大学',
      description: '欢迎来访交流',
    },
  ]

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-purple-600 text-sm font-medium tracking-wider uppercase">联系我们</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-4 mb-6 contact-title">
            开启<span className="text-gradient">AI 设计</span>之旅
          </h2>
          <p className="text-dark-500 text-lg leading-relaxed contact-title">
            无论您是想了解我们的服务，还是探讨合作机会，我们都期待与您取得联系。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="grid sm:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white border border-dark-200 hover:border-purple-400 transition-all contact-info"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-dark-900 font-semibold text-sm mb-1">{info.title}</h3>
                  <p className="text-dark-600 text-sm">{info.content}</p>
                  <p className="text-dark-400 text-xs mt-1">{info.description}</p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 border border-dark-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-dark-100 flex items-center justify-center flex-shrink-0 text-orange-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-dark-900 font-semibold text-lg mb-2">在线咨询</h3>
                  <p className="text-dark-500 text-sm mb-4">
                    有任何疑问？我们的客服团队随时为您解答。
                  </p>
                  <button className="px-5 py-2.5 rounded-full bg-gradient-brand text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                    立即咨询
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-dark-200">
              <h3 className="text-dark-900 font-semibold mb-4">关注我们</h3>
              <div className="flex items-center gap-4">
                {['微信', '抖音', '小红书', 'B站'].map((platform) => (
                  <button
                    key={platform}
                    className="px-4 py-2 rounded-full bg-dark-100 text-dark-600 text-sm hover:bg-purple-500 hover:text-white transition-all"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-dark-200">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-dark-900 font-semibold text-xl mb-2">提交成功！</h3>
                <p className="text-dark-500">我们会在 24 小时内与您联系。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-dark-900 font-semibold text-xl mb-6">发送咨询</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark-600 text-sm mb-2">姓名</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-dark-200 text-dark-900 placeholder-dark-300 focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="请输入姓名"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-dark-600 text-sm mb-2">电话</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-dark-200 text-dark-900 placeholder-dark-300 focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="请输入电话"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark-600 text-sm mb-2">邮箱</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-dark-200 text-dark-900 placeholder-dark-300 focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="请输入邮箱"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-dark-600 text-sm mb-2">公司</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-dark-200 text-dark-900 placeholder-dark-300 focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="请输入公司名称"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-dark-600 text-sm mb-2">留言内容</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-dark-200 text-dark-900 placeholder-dark-300 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                    placeholder="请描述您的需求..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-brand text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  发送咨询
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
