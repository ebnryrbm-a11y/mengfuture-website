export interface CaseStudy {
  id: number
  title: string
  category: string
  description: string
  content: string
  imageUrl: string
  tags: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface ServiceItem {
  id: number
  title: string
  icon: string
  description: string
  content: string
  imageUrl: string
  features: string
  price: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface TeamMemberCMS {
  id: number
  name: string
  role: string
  description: string
  avatarUrl: string
  socialLinks: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface Consultation {
  id: number
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

const now = new Date().toISOString()

let caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: '企业产品 3D 建模',
    category: 'AI 建模',
    description: '为家电品牌提供全系列产品的 AI 3D 建模服务',
    content: '我们使用先进的 AI 生成式 3D 技术，为家电品牌提供全系列产品的高精度 3D 建模服务。通过深度学习算法，能够在短时间内生成高质量的 3D 模型，大幅降低建模成本。',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    tags: JSON.stringify(['家电', '产品设计', '3D建模']),
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    title: '文物数字化保护',
    category: '文博数字化',
    description: '与湖北省博物馆合作，对馆藏文物进行高精度三维数字化',
    content: '与湖北省博物馆深度合作，运用三维扫描和 AI 修复技术，对珍贵馆藏文物进行高精度数字化采集与修复，建立完整的数字文物档案库。',
    imageUrl: 'https://images.unsplash.com/photo-1564399579883-4515a5d44ec08?q=80&w=1000&auto=format&fit=crop',
    tags: JSON.stringify(['文物', '博物馆', '数字化']),
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    title: '宠物 IP 形象定制',
    category: 'IP 定制',
    description: '基于宠物照片生成专属的 3D 虚拟形象',
    content: '上传宠物照片，AI 智能生成专属 3D 虚拟形象，支持多种风格定制，可用于社交头像、周边产品等多种场景。',
    imageUrl: 'https://images.unsplash.com/photo-1591946614720-90a587da4f36?q=80&w=1000&auto=format&fit=crop',
    tags: JSON.stringify(['宠物', 'IP', '定制']),
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
]

let services: ServiceItem[] = [
  {
    id: 1,
    title: 'AI 3D 建模',
    icon: 'Box',
    description: '基于 AI 技术快速生成高质量 3D 模型',
    content: '我们的 AI 3D 建模服务采用最先进的生成式 AI 技术，能够从单张图片或文字描述快速生成高质量的 3D 模型。适用于产品设计、游戏开发、电商展示等多个领域。',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
    features: JSON.stringify(['快速生成', '高精度', '多格式输出', '批量处理']),
    price: '¥999起',
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    title: 'LoRA 模型微调',
    icon: 'Settings',
    description: '为企业定制专属 AI 生成模型',
    content: '基于企业自有数据，进行 LoRA 模型微调，打造专属于您品牌的 AI 生成能力。可应用于产品设计、营销素材生成等场景。',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    features: JSON.stringify(['定制化训练', '私有部署', '持续优化', '技术支持']),
    price: '¥9999起',
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    title: '3D 打印服务',
    icon: 'Printer',
    description: '从数字模型到实体产品的一站式服务',
    content: '提供专业级 3D 打印服务，支持多种材料和工艺，从原型验证到小批量生产，满足您的各种需求。',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed1015b1?q=80&w=1000&auto=format&fit=crop',
    features: JSON.stringify(['多材料可选', '高精度', '快速交付', '后处理服务']),
    price: '¥99起',
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
]

let teamMembers: TeamMemberCMS[] = [
  {
    id: 1,
    name: '张小明',
    role: '创始人 & CEO',
    description: '湖北工业大学教授，AI 领域资深专家，拥有 10 年以上技术研发经验',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    socialLinks: JSON.stringify({ linkedin: 'https://linkedin.com', weibo: 'https://weibo.com' }),
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: '李小红',
    role: '技术总监',
    description: '清华大学计算机博士，专注于计算机视觉和 3D 重建技术',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    socialLinks: JSON.stringify({ linkedin: 'https://linkedin.com', github: 'https://github.com' }),
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    name: '王小强',
    role: '设计总监',
    description: '资深工业设计师，曾服务于多家知名企业，擅长产品创新设计',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    socialLinks: JSON.stringify({ linkedin: 'https://linkedin.com', dribbble: 'https://dribbble.com' }),
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
]

let consultations: Consultation[] = [
  {
    id: 1,
    name: '陈先生',
    email: 'chen@example.com',
    phone: '13800138001',
    company: '某科技有限公司',
    service: 'AI 3D 建模',
    message: '您好，我们公司有一批产品需要做 3D 建模，想了解一下具体的服务流程和价格。',
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: '刘女士',
    email: 'liu@example.com',
    phone: '13900139002',
    company: null,
    service: 'LoRA 模型微调',
    message: '想了解 LoRA 微调的具体方案，我们是一家电商公司，需要生成产品图片。',
    status: 'contacted',
    createdAt: now,
    updatedAt: now,
  },
]

let nextCaseId = 4
let nextServiceId = 4
let nextTeamId = 4
let nextConsultationId = 3

export const mockDb = {
  caseStudies: {
    findMany: () => [...caseStudies],
    findUnique: (id: number) => caseStudies.find((c) => c.id === id) || null,
    create: (data: Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newItem: CaseStudy = {
        ...data,
        id: nextCaseId++,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      caseStudies.push(newItem)
      return newItem
    },
    update: (id: number, data: Partial<CaseStudy>) => {
      const index = caseStudies.findIndex((c) => c.id === id)
      if (index === -1) return null
      caseStudies[index] = { ...caseStudies[index], ...data, updatedAt: new Date().toISOString() }
      return caseStudies[index]
    },
    delete: (id: number) => {
      const index = caseStudies.findIndex((c) => c.id === id)
      if (index === -1) return false
      caseStudies.splice(index, 1)
      return true
    },
  },
  services: {
    findMany: () => [...services],
    findUnique: (id: number) => services.find((s) => s.id === id) || null,
    create: (data: Omit<ServiceItem, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newItem: ServiceItem = {
        ...data,
        id: nextServiceId++,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      services.push(newItem)
      return newItem
    },
    update: (id: number, data: Partial<ServiceItem>) => {
      const index = services.findIndex((s) => s.id === id)
      if (index === -1) return null
      services[index] = { ...services[index], ...data, updatedAt: new Date().toISOString() }
      return services[index]
    },
    delete: (id: number) => {
      const index = services.findIndex((s) => s.id === id)
      if (index === -1) return false
      services.splice(index, 1)
      return true
    },
  },
  teamMembers: {
    findMany: () => [...teamMembers],
    findUnique: (id: number) => teamMembers.find((t) => t.id === id) || null,
    create: (data: Omit<TeamMemberCMS, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newItem: TeamMemberCMS = {
        ...data,
        id: nextTeamId++,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      teamMembers.push(newItem)
      return newItem
    },
    update: (id: number, data: Partial<TeamMemberCMS>) => {
      const index = teamMembers.findIndex((t) => t.id === id)
      if (index === -1) return null
      teamMembers[index] = { ...teamMembers[index], ...data, updatedAt: new Date().toISOString() }
      return teamMembers[index]
    },
    delete: (id: number) => {
      const index = teamMembers.findIndex((t) => t.id === id)
      if (index === -1) return false
      teamMembers.splice(index, 1)
      return true
    },
  },
  consultations: {
    findMany: () => [...consultations],
    findUnique: (id: number) => consultations.find((c) => c.id === id) || null,
    create: (data: Omit<Consultation, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
      const newItem: Consultation = {
        ...data,
        id: nextConsultationId++,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      consultations.push(newItem)
      return newItem
    },
    update: (id: number, data: Partial<Consultation>) => {
      const index = consultations.findIndex((c) => c.id === id)
      if (index === -1) return null
      consultations[index] = { ...consultations[index], ...data, updatedAt: new Date().toISOString() }
      return consultations[index]
    },
  },
}
