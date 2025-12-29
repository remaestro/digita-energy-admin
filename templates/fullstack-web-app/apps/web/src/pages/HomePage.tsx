import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold text-gray-900">
          Welcome to {{PROJECT_NAME}}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {{PROJECT_DESCRIPTION}}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
          <a
            href="https://github.com"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
          >
            View Docs
          </a>
        </div>
      </div>
    </div>
  )
}
