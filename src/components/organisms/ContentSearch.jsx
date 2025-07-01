import { useState, useEffect } from 'react'
import SearchBar from '@/components/molecules/SearchBar'
import ContentItem from '@/components/molecules/ContentItem'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { searchContent } from '@/services/api/contentService'

const ContentSearch = () => {
  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')

  const handleSearch = async (query) => {
    if (!query.trim()) return

    try {
      setLoading(true)
      setError('')
      setCurrentQuery(query)
      setHasSearched(true)
      const results = await searchContent(query)
      setContent(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleBookmark = (contentItem) => {
    // In a real app, this would save to backend
    console.log('Bookmarked:', contentItem)
  }

  const retrySearch = () => {
    if (currentQuery) {
      handleSearch(currentQuery)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Research</h1>
        <p className="text-gray-600">Search and analyze content across multiple platforms</p>
      </div>

      {/* Search */}
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search for content, keywords, or topics..."
        showFilters={true}
      />

      {/* Results */}
      <div>
        {loading && <Loading type="content-list" />}
        
        {error && !loading && (
          <Error 
            message={error} 
            onRetry={retrySearch} 
            type="search" 
          />
        )}

        {!loading && !error && hasSearched && content.length === 0 && (
          <Empty 
            type="search"
            title="No content found"
            message={`No results found for "${currentQuery}". Try different keywords or adjust your filters.`}
            actionLabel="Clear Search"
            onAction={() => {
              setCurrentQuery('')
              setHasSearched(false)
              setContent([])
            }}
          />
        )}

        {!loading && !error && content.length > 0 && (
          <div className="space-y-4">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Found {content.length} results for "{currentQuery}"
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <ApperIcon name="SlidersHorizontal" className="w-4 h-4 mr-2" />
                  Sort
                </Button>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Content List */}
            <div className="space-y-4">
              {content.map((item, index) => (
                <ContentItem
                  key={item.Id}
                  content={item}
                  index={index}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center pt-6">
              <Button variant="secondary">
                Load More Results
              </Button>
            </div>
          </div>
        )}

        {!hasSearched && !loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Search" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to discover content</h3>
            <p className="text-gray-600">Search for trending topics, keywords, or specific content to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentSearch