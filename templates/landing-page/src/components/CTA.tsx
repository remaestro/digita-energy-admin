import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id="get-started" className="section bg-gradient-to-br from-primary-600 to-primary-700">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-8">
            Join thousands of users who are already using {{PROJECT_NAME}} to achieve their goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:{{CONTACT_EMAIL}}"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
            >
              Contact Us
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
