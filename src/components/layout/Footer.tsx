import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Github, Youtube, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-50 pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="萌未来 Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-dark-500 text-sm leading-relaxed">
              用 AI 生成 3D，重新定义设计。我们是湖北工业大学首家 AI + 工业设计科创企业，致力于成为空间智能赛道的先行者。
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-100 flex items-center justify-center text-dark-500 hover:text-white hover:bg-purple-500 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-100 flex items-center justify-center text-dark-500 hover:text-white hover:bg-purple-500 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-100 flex items-center justify-center text-dark-500 hover:text-white hover:bg-purple-500 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-dark-900 font-semibold mb-6">快速链接</h4>
            <ul className="space-y-3">
              <li><Link href="#about" className="text-dark-500 hover:text-dark-900 transition-colors">公司介绍</Link></li>
              <li><Link href="#tech" className="text-dark-500 hover:text-dark-900 transition-colors">技术介绍</Link></li>
              <li><Link href="#services" className="text-dark-500 hover:text-dark-900 transition-colors">服务体系</Link></li>
              <li><Link href="#cases" className="text-dark-500 hover:text-dark-900 transition-colors">应用案例</Link></li>
              <li><Link href="#join" className="text-dark-500 hover:text-dark-900 transition-colors">加入我们</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-dark-900 font-semibold mb-6">服务项目</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-dark-500 hover:text-dark-900 transition-colors">AI 建模与 3D 打印</Link></li>
              <li><Link href="#" className="text-dark-500 hover:text-dark-900 transition-colors">企业 LoRA 微调</Link></li>
              <li><Link href="#" className="text-dark-500 hover:text-dark-900 transition-colors">本地部署大模型</Link></li>
              <li><Link href="#" className="text-dark-500 hover:text-dark-900 transition-colors">3D 交互动画</Link></li>
              <li><Link href="#" className="text-dark-500 hover:text-dark-900 transition-colors">文博 3D 数字化</Link></li>
              <li><Link href="#" className="text-dark-500 hover:text-dark-900 transition-colors">宠物 IP 定制</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-dark-900 font-semibold mb-6">联系我们</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-500 text-sm">湖北省武汉市湖北工业大学</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-dark-500 text-sm">contact@mengfuture.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-dark-500 text-sm">400-xxx-xxxx</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-dark-400 text-sm">
            © {currentYear} 武汉萌未来人工智能科技有限公司 版权所有
          </div>
          <div className="flex items-center gap-6 text-sm text-dark-400">
            <span>鄂ICP备xxxxxxxx号</span>
            <span>Made with 🤖 + ❤️ by 萌未来 00 后团队</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
