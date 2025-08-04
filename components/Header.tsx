import Link from 'next/link'
import { Waves, Menu, X } from 'lucide-react'
import { getCategories } from '@/lib/cosmic'

export default async function Header() {
  const categories = await getCategories()
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg wave-bg group-hover:scale-105 transition-transform">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold gradient-text">Hawaii Surf</span>
              <span className="text-sm text-gray-600 block leading-none">Blog</span>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
            >
              Home
            </Link>
            
            {/* Categories */}
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}