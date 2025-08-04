import { getSurfPost, getSurfPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import PostContent from '@/components/PostContent'
import { SurfPost } from '@/types'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: PostPageProps
): Promise<Metadata> {
  const { slug } = await params
  const post = await getSurfPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Hawaii Surf Blog'
    }
  }
  
  const title = post.metadata?.title || post.title
  const description = post.metadata?.content ? 
    post.metadata.content.replace(/<[^>]*>/g, '').substring(0, 160) : 
    'Read this surf post on Hawaii Surf Blog'
  const featuredImage = post.metadata?.featured_image?.imgix_url
  
  return {
    title: `${title} - Hawaii Surf Blog`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      ...(featuredImage && {
        images: [{
          url: `${featuredImage}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: title
        }]
      })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(featuredImage && {
        images: [`${featuredImage}?w=1200&h=630&fit=crop&auto=format,compress`]
      })
    }
  }
}

export async function generateStaticParams() {
  const posts = await getSurfPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getSurfPost(slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PostContent post={post} />
    </div>
  )
}