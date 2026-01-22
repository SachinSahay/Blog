import type { Blog } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getCategoryColor, formatDate } from '@/lib/utils'
import { Calendar } from 'lucide-react'

interface BlogCardProps {
    blog: Blog
    isSelected: boolean
    onClick: () => void
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
    return (
        <Card
            className={`blog-card cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-2 ${isSelected
                    ? 'border-indigo-500 shadow-xl shadow-indigo-200/50 bg-gradient-to-br from-indigo-50 to-purple-50'
                    : 'border-transparent hover:border-indigo-200 bg-white'
                }`}
            onClick={onClick}
        >
            <CardHeader className="pb-3">
                <div className="flex flex-wrap gap-2 mb-3">
                    {blog.category.map((cat) => (
                        <span
                            key={cat}
                            className={`category-badge px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getCategoryColor(cat)}`}
                        >
                            {cat}
                        </span>
                    ))}
                </div>
                <CardTitle className="text-xl font-bold line-clamp-2 text-gray-900 leading-tight">
                    {blog.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="line-clamp-2 mb-4 text-base leading-relaxed">
                    {blog.description}
                </CardDescription>
                <div className="flex items-center text-sm text-muted-foreground font-medium">
                    <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
                    {formatDate(blog.date)}
                </div>
            </CardContent>
        </Card>
    )
}
