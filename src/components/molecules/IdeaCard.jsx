import { motion } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const IdeaCard = ({ idea, index }) => {
  const [isSaved, setIsSaved] = useState(false)

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'video': return 'Video'
      case 'blog': return 'FileText'
      case 'social': return 'MessageSquare'
      case 'infographic': return 'BarChart3'
      default: return 'Lightbulb'
    }
  }

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'video': return 'secondary'
      case 'blog': return 'primary'
      case 'social': return 'accent'
      case 'infographic': return 'success'
      default: return 'default'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-accent-600'
    return 'text-gray-600'
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Idea removed from saved' : 'Idea saved successfully')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(idea.title)
    toast.success('Title copied to clipboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 border border-gray-100 hover-lift group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Badge variant={getTypeColor(idea.type)} size="sm">
          <ApperIcon name={getTypeIcon(idea.type)} className="w-3 h-3 mr-1" />
          {idea.type}
        </Badge>
        <div className="flex items-center space-x-1">
          <div className={`text-lg font-bold ${getScoreColor(idea.score)}`}>
            {idea.score}
          </div>
          <div className="text-sm text-gray-500">/100</div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {idea.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {idea.reasoning}
        </p>
      </div>

      {/* Topic */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Based on topic:</div>
        <Badge variant="primary" size="sm">
          {idea.topic}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="flex items-center space-x-1"
        >
          <ApperIcon name="Copy" className="w-4 h-4" />
          <span>Copy</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          className="flex items-center space-x-1"
        >
          <ApperIcon 
            name={isSaved ? "BookmarkCheck" : "Bookmark"} 
            className={`w-4 h-4 ${isSaved ? 'text-accent-500' : ''}`}
          />
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </Button>
      </div>
    </motion.div>
  )
}

export default IdeaCard