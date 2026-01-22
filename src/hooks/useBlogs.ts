import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useBlogs() {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: api.getAllBlogs,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
