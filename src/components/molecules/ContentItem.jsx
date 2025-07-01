import { motion } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const ContentItem = ({ content, index, onBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return 'Youtube'
      case 'blog': return 'FileText'
      case 'reddit': return 'MessageSquare'
      case 'twitter': return 'Twitter'
      default: return 'Globe'
    }
  }

  const getPlatformColor = (platform) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return 'text-red-500'
      case 'blog': return 'text-blue-500'
      case 'reddit': return 'text-orange-500'
      case 'twitter': return 'text-blue-400'
      default: return 'text-gray-500'
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark && onBookmark(content)
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks')
  }

  const handleOpenContent = () => {
    window.open(content.url, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-lg p-4 border border-gray-100 hover-lift group"
    >
      <div className="flex items-start space-x-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <div className="w-20 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            {content.thumbnail ? (
              <img
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ApperIcon name={getPlatformIcon(content.platform)} className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 
                className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors cursor-pointer line-clamp-2"
                onClick={handleOpenContent}
              >
                {content.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <ApperIcon 
                  name={getPlatformIcon(content.platform)} 
                  className={`w-4 h-4 ${getPlatformColor(content.platform)}`} 
                />
                <span className="text-sm text-gray-600">{content.author}</span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <ApperIcon name="Eye" className="w-4 h-4" />
              <span>{formatNumber(content.views)}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <ApperIcon name="Heart" className="w-4 h-4" />
              <span>{formatNumber(content.engagement)}</span>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(content.publishedDate).toLocaleDateString()}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center justify-between">
            <Badge variant="primary" size="sm">
              {content.platform}
            </Badge>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className="p-1"
              >
                <ApperIcon 
                  name={isBookmarked ? "BookmarkCheck" : "Bookmark"} 
                  className={`w-4 h-4 ${isBookmarked ? 'text-accent-500' : 'text-gray-400'}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenContent}
                className="p-1"
              >
                <ApperIcon name="ExternalLink" className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ContentItem