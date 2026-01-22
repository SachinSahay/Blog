import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api, type CreateBlogInput } from '@/lib/api'

export function useCreateBlog() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (blog: CreateBlogInput) => api.createBlog(blog),
        onSuccess: () => {
            // Invalidate and refetch blogs list
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
    })
}
