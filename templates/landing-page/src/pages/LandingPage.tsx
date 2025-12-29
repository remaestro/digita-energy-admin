import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>{{PROJECT_NAME}}</title>
        <meta name="description" content="{{PROJECT_DESCRIPTION}}" />
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </div>
    </>
  )
}
