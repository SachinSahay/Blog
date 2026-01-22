export interface Blog {
    id: string
    title: string
    category: string[]
    description: string
    date: string
    coverImage: string
    content: string
}

export interface CreateBlogInput {
    title: string
    category: string[]
    description: string
    coverImage: string
    content: string
}

const API_BASE_URL = 'http://localhost:3001'

export const api = {
    async getAllBlogs(): Promise<Blog[]> {
        const response = await fetch(`${API_BASE_URL}/blogs`)
        if (!response.ok) {
            throw new Error('Failed to fetch blogs')
        }
        return response.json()
    },

    async getBlogById(id: string): Promise<Blog> {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch blog')
        }
        return response.json()
    },

    async createBlog(blog: CreateBlogInput): Promise<Blog> {
        const response = await fetch(`${API_BASE_URL}/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...blog,
                date: new Date().toISOString(),
            }),
        })
        if (!response.ok) {
            throw new Error('Failed to create blog')
        }
        return response.json()
    },
}
