import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search topics, keywords...",
  showFilters = false,
  onFilterToggle,
  filters = {}
}) => {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const platforms = [
    { id: 'youtube', label: 'YouTube', icon: 'Youtube' },
    { id: 'blog', label: 'Blogs', icon: 'FileText' },
    { id: 'reddit', label: 'Reddit', icon: 'MessageSquare' },
    { id: 'twitter', label: 'Twitter', icon: 'Twitter' }
  ]

  return (
    <div className="space-y-4">
      {/* Main Search */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-32 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg shadow-sm"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {showFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsExpanded(!isExpanded)
                  onFilterToggle && onFilterToggle()
                }}
                className="p-2"
              >
                <ApperIcon name="SlidersHorizontal" className="w-4 h-4" />
              </Button>
            )}
            <Button type="submit" variant="primary" size="md">
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Filters Panel */}
      {showFilters && isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Platform</label>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <label key={platform.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.platforms?.includes(platform.id) || false}
                      onChange={() => {
                        // Handle platform filter change
                      }}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <ApperIcon name={platform.icon} className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{platform.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Date Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="views">Views</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <Button variant="ghost" size="sm">
              Clear All Filters
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
              <Button variant="primary" size="sm">
                Apply Filters
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SearchBar