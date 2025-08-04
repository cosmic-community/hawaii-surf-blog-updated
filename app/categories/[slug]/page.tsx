import { getCategories, getSurfPostsByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import { Category } from '@/types'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: CategoryPageProps
): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - Hawaii Surf Blog'
    }
  }
  
  const title = category.metadata?.name || category.title
  const description = category.metadata?.description || 
    `Browse ${title} posts on Hawaii Surf Blog`
  
  return {
    title: `${title} - Hawaii Surf Blog`,
    description,
    openGraph: {
      title: `${title} - Hawaii Surf Blog`,
      description,
      type: 'website'
    }
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)
  
  if (!category) {
    notFound()
  }
  
  const posts = await getSurfPostsByCategory(category.id)
  const categoryName = category.metadata?.name || category.title
  const categoryDescription = category.metadata?.description
  const categoryColor = category.metadata?.color || '#3B82F6'
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="wave-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
            <div 
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{categoryName}</h1>
          {categoryDescription && (
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {categoryDescription}
            </p>
          )}
        </div>
      </div>
      
      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {posts.length} {posts.length === 1 ? 'Post' : 'Posts'} in {categoryName}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <div 
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: categoryColor }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No posts in {categoryName} yet
            </h3>
            <p className="text-gray-600">
              Check back soon for new content in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}