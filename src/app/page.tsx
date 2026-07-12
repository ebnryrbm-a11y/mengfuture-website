import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Tech from '@/components/home/Tech'
import Services from '@/components/home/Services'
import Cases from '@/components/home/Cases'
import Vision from '@/components/home/Vision'
import Team from '@/components/home/Team'
import Contact from '@/components/home/Contact'
import Scene from '@/components/canvas/Scene'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <Scene />
      </div>
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Tech />
          <Services />
          <Cases />
          <Vision />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
