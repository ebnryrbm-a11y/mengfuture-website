'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import {
  Target,
  Eye as EyeIcon,
  Heart,
  Users,
  Lightbulb,
  Rocket,
  ArrowRight,
} from 'lucide-react'
import { mockDb } from '@/lib/mock-data'

export default function AboutPage() {
  const teamMembers = mockDb.teamMembers
    .findMany()
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const stats = [
    { value: '50+', label: '服务客户' },
    { value: '100+', label: '成功案例' },
    { value: '20+', label: '技术专利' },
    { value: '99%', label: '客户满意度' },
  ]

  const values = [
    {
      icon: Lightbulb,
      title: '创新驱动',
      desc: '以技术创新为核心驱动力，不断探索 AI 与 3D 领域的前沿技术',
    },
    {
      icon: Heart,
      title: '客户至上',
      desc: '始终将客户需求放在首位，提供超越预期的产品和服务体验',
    },
    {
      icon: Users,
      title: '团队协作',
      desc: '相信团队的力量，跨学科协作创造更大价值',
    },
    {
      icon: Rocket,
      title: '追求卓越',
      desc: '对品质精益求精，追求技术和设计的极致表达',
    },
  ]

  const milestones = [
    { year: '2023', title: '公司成立', desc: '萌未来在湖北工业大学成立' },
    { year: '2023', title: '首笔融资', desc: '获得种子轮投资' },
    { year: '2024', title: '产品上线', desc: 'AI 3D 生成平台正式发布' },
    { year: '2024', title: '客户突破', desc: '服务客户突破 50 家' },
    { year: '2025', title: '技术突破', desc: '自研算法获得多项专利' },
    { year: '2025', title: '快速增长', desc: '团队规模扩大三倍' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-purple-light relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-orange-600 text-sm font-medium tracking-wider uppercase">
                关于我们
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-dark-900 mt-4 mb-6">
                用 <span className="text-gradient">AI 生成 3D</span>
                <br />
                重新定义设计
              </h1>
              <p className="text-dark-500 text-xl max-w-2xl mx-auto leading-relaxed">
                我们是湖北工业大学首家 AI + 工业设计科创企业，
                致力于成为空间智能赛道的先行者。
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-purple-600 text-sm font-medium tracking-wider uppercase">
                  公司简介
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-dark-900 mt-4 mb-6">
                  让 AI 成为
                  <span className="text-gradient"> 设计师的最佳拍档</span>
                </h2>
                <div className="space-y-4 text-dark-600 leading-relaxed">
                  <p>
                    萌未来成立于 2023 年，是一家专注于 AI 生成 3D 技术的科创公司。
                    我们由湖北工业大学的教授、博士和优秀本科生共同创立，
                    拥有深厚的技术积累和行业资源。
                  </p>
                  <p>
                    我们的使命是用 AI 技术赋能设计行业，让 3D 创作变得更加简单、高效、有趣。
                    通过自研的 AI 生成算法，我们能够将设计效率提升 10 倍以上，
                    同时大幅降低创作门槛。
                  </p>
                  <p>
                    目前，我们已为超过 50 家企业和机构提供了 AI 3D 解决方案，
                    涵盖产品设计、文博数字化、电商营销、游戏娱乐等多个领域。
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-brand text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    联系我们 <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/cases"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-dark-200 text-dark-700 font-medium hover:bg-dark-50 transition-all"
                  >
                    查看案例
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-brand rounded-3xl blur-3xl opacity-20" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden aspect-square">
                      <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
                        alt="团队协作"
                        className="w-full h-full object-cover"
                        width={400}
                        height={400}
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden aspect-video">
                      <Image
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop"
                        alt="办公环境"
                        className="w-full h-full object-cover"
                        width={400}
                        height={225}
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden aspect-video">
                      <Image
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop"
                        alt="头脑风暴"
                        className="w-full h-full object-cover"
                        width={400}
                        height={225}
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden aspect-square">
                      <Image
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop"
                        alt="团队"
                        className="w-full h-full object-cover"
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-orange-600 text-sm font-medium tracking-wider uppercase">
                使命愿景
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-900 mt-4">
                我们相信 <span className="text-gradient">技术的力量</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-purple-50 rounded-3xl p-8 lg:p-10">
                <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark-900 mb-4">我们的使命</h3>
                <p className="text-dark-600 text-lg leading-relaxed">
                  用 AI 生成 3D 技术，让每一个创意都能快速变成现实。
                  我们致力于降低 3D 创作的门槛，让更多人能够享受创造的乐趣。
                </p>
              </div>
              <div className="bg-orange-50 rounded-3xl p-8 lg:p-10">
                <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center mb-6">
                  <EyeIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark-900 mb-4">我们的愿景</h3>
                <p className="text-dark-600 text-lg leading-relaxed">
                  成为全球领先的空间智能公司，
                  用 AI 重新定义人类与三维世界的交互方式。
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 border border-dark-200 hover:border-purple-400 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-dark-900 mb-2">
                      {value.title}
                    </h4>
                    <p className="text-dark-500 text-sm leading-relaxed">{value.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-dark-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-purple-600 text-sm font-medium tracking-wider uppercase">
                发展历程
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-900 mt-4">
                我们的 <span className="text-gradient">成长足迹</span>
              </h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-orange-400 to-purple-400 -translate-x-1/2 hidden md:block" />
              <div className="space-y-12">
                {milestones.map((item, i) => (
                  <div
                    key={i}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${
                      i % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="md:w-1/2 md:px-8">
                      <div
                        className={`bg-white rounded-2xl p-6 shadow-lg border border-dark-100 ${
                          i % 2 === 0 ? 'md:text-left' : 'md:text-right'
                        } text-center`}
                      >
                        <span className="inline-block px-4 py-1 rounded-full bg-gradient-brand text-white text-sm font-bold mb-3">
                          {item.year}
                        </span>
                        <h4 className="text-xl font-bold text-dark-900 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-dark-500">{item.desc}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-brand border-4 border-white shadow-lg hidden md:block z-10" />
                    <div className="md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-orange-600 text-sm font-medium tracking-wider uppercase">
                核心团队
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-900 mt-4">
                认识我们的 <span className="text-gradient">优秀团队</span>
              </h2>
              <p className="text-dark-500 mt-4 max-w-2xl mx-auto">
                我们拥有一支跨学科、多元化的团队，
                成员来自计算机、设计、艺术等不同背景。
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group text-center"
                >
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-gradient-brand rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                  <p className="text-dark-500 text-sm leading-relaxed max-w-xs mx-auto">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="#join"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-dark-200 text-dark-700 font-medium hover:bg-dark-50 transition-all"
              >
                加入我们 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-purple-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-900 mb-6">
                准备好开始 <span className="text-gradient">合作</span> 了吗？
              </h2>
              <p className="text-dark-500 text-lg mb-8">
                无论您有什么想法，我们都期待与您一起探索无限可能。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-brand text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
                >
                  立即咨询 <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-dark-700 font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  了解服务
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
