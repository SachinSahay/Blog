import { useState } from 'react'
import { BlogList } from '@/components/BlogList'
import { BlogDetail } from '@/components/BlogDetail'
import { BlogForm } from '@/components/BlogForm'

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="relative border-b border-white/20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 py-6 relative z-10">
          {/* Editorial Brand Logo */}
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-4xl font-bold text-white tracking-tight" style={{
              fontFamily: 'Georgia, "Times New Roman", serif'
            }}>
              Bloggify
            </h1>
            <span className="text-white/40 text-2xl font-light">•</span>
            <span className="text-lg font-medium text-white/90 tracking-wide uppercase" style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              letterSpacing: '0.1em'
            }}>
              Blog
            </span>
          </div>

          <p className="text-white/80 text-sm font-normal tracking-wide" style={{
            fontFamily: 'Inter, -apple-system, sans-serif',
            letterSpacing: '0.01em'
          }}>
            Insights on Finance, Technology, and Career Development
          </p>
        </div>
      </header>

      {/* Main Content - Two Panel Layout */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {/* Left Panel - Blog List */}
          <div className="h-full rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md border border-white/20 overflow-hidden">
            <BlogList
              selectedBlogId={selectedBlogId}
              onSelectBlog={setSelectedBlogId}
              onCreateClick={() => setIsCreateDialogOpen(true)}
            />
          </div>

          {/* Right Panel - Blog Detail */}
          <div className="h-full rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md border border-white/20 overflow-hidden">
            <BlogDetail blogId={selectedBlogId} />
          </div>
        </div>
      </main>

      {/* Create Blog Dialog */}
      <BlogForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  )
}

export default App
