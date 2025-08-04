import { getSurfPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'
import { SurfPost, Category } from '@/types'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getSurfPosts(),
    getCategories()
  ])

  // Get featured post (first post)
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredPost && <Hero post={featuredPost} />}
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <CategoryFilter categories={categories} />
        </div>
        
        {/* Recent Posts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Surf Reports & Guides</h2>
          
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No surf posts available at the moment.</p>
            </div>
          )}
        </div>
        
        {/* Call to Action */}
        <div className="wave-bg rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Hawaiian Surf Conditions</h3>
          <p className="text-lg opacity-90 mb-6">
            Get the latest surf reports, spot guides, and gear reviews from Hawaii's most experienced surfers.
          </p>
          <p className="text-sm opacity-80">
            Follow our expert surf photographers and local watermen for authentic insights into Hawaii's legendary breaks.
          </p>
        </div>
      </div>
    </div>
  )
}