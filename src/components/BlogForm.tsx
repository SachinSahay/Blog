import { useState } from 'react'
import { useCreateBlog } from '@/hooks/useCreateBlog'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

interface BlogFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function BlogForm({ open, onOpenChange }: BlogFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        categories: '',
        description: '',
        coverImage: '',
        content: '',
    })

    const createBlog = useCreateBlog()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Basic validation
        if (!formData.title || !formData.description || !formData.content) {
            alert('Please fill in all required fields')
            return
        }

        const categoryArray = formData.categories
            .split(',')
            .map((cat) => cat.trim().toUpperCase())
            .filter((cat) => cat.length > 0)

        try {
            await createBlog.mutateAsync({
                title: formData.title,
                category: categoryArray.length > 0 ? categoryArray : ['GENERAL'],
                description: formData.description,
                coverImage: formData.coverImage || 'https://via.placeholder.com/800x400?text=Blog+Cover',
                content: formData.content,
            })

            // Reset form and close dialog
            setFormData({
                title: '',
                categories: '',
                description: '',
                coverImage: '',
                content: '',
            })
            onOpenChange(false)
        } catch (error) {
            console.error('Failed to create blog:', error)
            alert('Failed to create blog. Please try again.')
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white border-2 border-indigo-100 shadow-2xl">
                <DialogHeader className="space-y-3 pb-6 border-b-2 border-gradient-to-r from-indigo-200 to-purple-200">
                    <DialogTitle className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Create New Blog Post
                    </DialogTitle>
                    <DialogDescription className="text-base text-gray-600 font-medium">
                        Fill in the details below to create a new blog post. All fields marked with * are required.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-bold block text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter an engaging blog title"
                            required
                            className="text-base border-2 border-gray-200 focus:border-indigo-500 rounded-lg px-4 py-3 transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="categories" className="text-sm font-bold block mb-2 text-gray-700">
                            Categories
                        </label>
                        <Input
                            id="categories"
                            value={formData.categories}
                            onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
                            placeholder="e.g., FINANCE, TECH (comma-separated)"
                            className="text-base border-2 border-gray-200 focus:border-indigo-500 rounded-lg px-4 py-3 transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-2 font-medium">
                            Separate multiple categories with commas
                        </p>
                    </div>

                    <div>
                        <label htmlFor="description" className="text-sm font-bold block mb-2 text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief description of the blog post"
                            rows={3}
                            required
                            className="text-base border-2 border-gray-200 focus:border-indigo-500 rounded-lg px-4 py-3 transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="coverImage" className="text-sm font-bold block mb-2 text-gray-700">
                            Cover Image URL
                        </label>
                        <Input
                            id="coverImage"
                            type="url"
                            value={formData.coverImage}
                            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="text-base border-2 border-gray-200 focus:border-indigo-500 rounded-lg px-4 py-3 transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-2 font-medium">
                            Leave empty to use a default placeholder image
                        </p>
                    </div>

                    <div>
                        <label htmlFor="content" className="text-sm font-bold block mb-2 text-gray-700">
                            Content <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your blog content here..."
                            rows={10}
                            required
                            className="text-base border-2 border-gray-200 focus:border-indigo-500 rounded-lg px-4 py-3 transition-all"
                        />
                    </div>

                    <DialogFooter className="mt-8 pt-6 border-t-2 border-gray-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={createBlog.isPending}
                            className="border-2 border-gray-300 hover:border-gray-400 font-semibold px-6 py-3"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={createBlog.isPending}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all"
                        >
                            {createBlog.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Blog
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
