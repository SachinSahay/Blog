import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date)
}

export function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        FINANCE: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
        TECH: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
        CAREER: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
        EDUCATION: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white',
        REGULATIONS: 'bg-gradient-to-r from-rose-500 to-rose-600 text-white',
        LIFESTYLE: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white',
        GENERAL: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white',
    }
    return colors[category] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
}
