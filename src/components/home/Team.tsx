"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail, User, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(
      '.team-title',
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
      '.team-member',
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

  const teamMembers = [
    {
      name: '唐萌',
      role: 'CEO / 创始人',
      description: '湖北工业大学硕士，专注 AI 生成 3D 技术',
      avatar: 'T',
      social: { github: '#', linkedin: '#', mail: '#' },
    },
    {
      name: '李明',
      role: 'CTO / 创始人',
      description: '湖北工业大学硕士，深度学习与计算机视觉专家',
      avatar: 'L',
      social: { github: '#', linkedin: '#', mail: '#' },
    },
    {
      name: '张芳',
      role: 'COO / 创始人',
      description: '湖北工业大学硕士，企业服务与运营管理',
      avatar: 'Z',
      social: { github: '#', linkedin: '#', mail: '#' },
    },
    {
      name: '王强',
      role: '产品总监',
      description: '湖北工业大学硕士，工业设计专业背景',
      avatar: 'W',
      social: { github: '#', linkedin: '#', mail: '#' },
    },
  ]

  return (
    <section ref={sectionRef} id="join" className="py-20 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-orange-400 text-sm font-medium tracking-wider uppercase">团队介绍</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-4 mb-6 team-title">
            一群 00 后，<span className="text-gradient">用 AI 搞点不一样的事</span>
          </h2>
          <p className="text-dark-500 text-lg leading-relaxed team-title">
            来自湖北工业大学的 00 后硕士研究生，充满梦想与激情。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-white border border-dark-200 hover:border-purple-400 hover:shadow-lg transition-all team-member"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-brand flex items-center justify-center text-white text-3xl font-bold">
                  <User className="w-12 h-12" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-purple-50" />
              </div>

              <div className="text-center">
                <h3 className="text-dark-900 font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-purple-600 text-sm mb-3">{member.role}</p>
                <p className="text-dark-400 text-sm leading-relaxed mb-5">{member.description}</p>

                <div className="flex justify-center gap-3">
                  <a
                    href={member.social.github}
                    className="w-9 h-9 rounded-full bg-dark-100 flex items-center justify-center text-dark-500 hover:text-white hover:bg-purple-500 transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="w-9 h-9 rounded-full bg-dark-100 flex items-center justify-center text-dark-500 hover:text-white hover:bg-purple-500 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.mail}
                    className="w-9 h-9 rounded-full bg-dark-100 flex items-center justify-center text-dark-500 hover:text-white hover:bg-purple-500 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="#join" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors">
            查看更多团队成员 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-16 relative rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop"
            alt="加入我们"
            className="w-full h-64 object-cover"
            width={1470}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/90 via-purple-50/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-dark-900 font-semibold text-xl mb-2">寻找同路人</h3>
                  <p className="text-dark-500 text-sm">我们正在寻找充满热情的小伙伴加入团队</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">AI 算法工程师</span>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">前端开发工程师</span>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">产品经理</span>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">市场营销</span>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end gap-2">
                  <p className="text-dark-400 text-sm">投递至：hr@mengfuture.com</p>
                  <Link href="#contact" className="px-6 py-3 rounded-full bg-gradient-brand text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                    投递简历 <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
