import { useBlogs } from '@/hooks/useBlogs'
import { BlogCard } from '@/components/BlogCard'
import { BlogListSkeleton } from '@/components/LoadingSkeleton'
import { ErrorState } from '@/components/ErrorState'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface BlogListProps {
    selectedBlogId: string | null
    onSelectBlog: (id: string) => void
    onCreateClick: () => void
}

export function BlogList({ selectedBlogId, onSelectBlog, onCreateClick }: BlogListProps) {
    const { data: blogs, isLoading, error, refetch } = useBlogs()

    if (isLoading) {
        return (
            <div className="h-full overflow-auto p-4">
                <BlogListSkeleton />
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <ErrorState
                    message="Failed to load blogs. Please try again."
                    onRetry={() => refetch()}
                />
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col">
            <div className="p-6 border-b bg-gradient-to-br from-indigo-50 to-purple-50 sticky top-0 z-10">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Blog Posts
                    </h2>
                    <Button
                        onClick={onCreateClick}
                        size="sm"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Blog
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                    {blogs?.length || 0} articles available
                </p>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
                {blogs?.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        isSelected={selectedBlogId === blog.id}
                        onClick={() => onSelectBlog(blog.id)}
                    />
                ))}
            </div>
        </div>
    )
}
