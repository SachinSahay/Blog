import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useBlog(id: string | null) {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: () => api.getBlogById(id!),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
