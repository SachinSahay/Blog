import { useBlog } from '@/hooks/useBlog'
import { BlogDetailSkeleton } from '@/components/LoadingSkeleton'
import { ErrorState } from '@/components/ErrorState'
import { getCategoryColor, formatDate } from '@/lib/utils'
import { Calendar, FileText } from 'lucide-react'

interface BlogDetailProps {
    blogId: string | null
}

export function BlogDetail({ blogId }: BlogDetailProps) {
    const { data: blog, isLoading, error, refetch } = useBlog(blogId)

    if (!blogId) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 float-animation" />
                    <h3 className="text-xl font-semibold mb-2">No Blog Selected</h3>
                    <p className="text-muted-foreground">
                        Select a blog from the list to view its details
                    </p>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="h-full overflow-auto p-6">
                <BlogDetailSkeleton />
            </div>
        )
    }

    if (error || !blog) {
        return (
            <div className="h-full flex items-center justify-center p-6">
                <ErrorState
                    message="Failed to load blog details. Please try again."
                    onRetry={() => refetch()}
                />
            </div>
        )
    }

    return (
        <div className="blog-detail-container h-full overflow-y-auto scroll-smooth">
            <article className="max-w-4xl mx-auto p-8">
                {/* Cover Image */}
                <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Blog+Cover+Image'
                        }}
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {blog.category.map((cat) => (
                        <span
                            key={cat}
                            className={`category-badge px-4 py-2 rounded-full text-sm font-semibold shadow-md ${getCategoryColor(cat)}`}
                        >
                            {cat}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {blog.title}
                </h1>

                {/* Date */}
                <div className="flex items-center text-muted-foreground mb-8 pb-8 border-b-2 border-gray-200">
                    <Calendar className="mr-3 h-5 w-5 text-indigo-500" />
                    <time className="text-base font-medium">{formatDate(blog.date)}</time>
                </div>

                {/* Description */}
                <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium italic border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-50/50 rounded-r-lg">
                    {blog.description}
                </p>

                {/* Content */}
                <div className="prose prose-lg prose-slate max-w-none">
                    {blog.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-6 text-gray-800 leading-relaxed text-lg">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>
        </div>
    )
}
