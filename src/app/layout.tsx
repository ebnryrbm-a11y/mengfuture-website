import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '萌未来 - AI生成3D | 重新定义设计',
  description: '萌未来是湖北工业大学首家AI+工业设计科创企业，专注于AI生成3D技术，为企业提供AI建模、3D打印、LoRA微调等服务。',
  keywords: ['AI生成3D', 'AI建模', '3D打印', 'LoRA微调', '萌未来', '空间智能'],
  authors: [{ name: '萌未来' }],
  creator: '萌未来',
  publisher: '萌未来',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
