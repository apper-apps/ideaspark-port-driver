import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  type = 'default',
  title,
  message,
  actionLabel,
  onAction,
  icon
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case 'search':
        return {
          icon: icon || 'Search',
          title: title || 'No Results Found',
          message: message || 'Try adjusting your search terms or filters to find what you\'re looking for.',
          actionLabel: actionLabel || 'Clear Filters',
          gradient: 'from-primary-500 to-secondary-500'
        }
      case 'saved':
        return {
          icon: icon || 'BookmarkCheck',
          title: title || 'No Saved Items Yet',
          message: message || 'Start saving interesting content and ideas to build your personal collection.',
          actionLabel: actionLabel || 'Explore Content',
          gradient: 'from-accent-500 to-primary-500'
        }
      case 'ideas':
        return {
          icon: icon || 'Lightbulb',
          title: title || 'No Ideas Generated',
          message: message || 'Generate content ideas based on trending topics and keywords.',
          actionLabel: actionLabel || 'Generate Ideas',
          gradient: 'from-secondary-500 to-accent-500'
        }
      case 'trending':
        return {
          icon: icon || 'TrendingUp',
          title: title || 'No Trending Topics',
          message: message || 'We\'re having trouble loading trending topics right now.',
          actionLabel: actionLabel || 'Refresh',
          gradient: 'from-success to-primary-500'
        }
      default:
        return {
          icon: icon || 'Folder',
          title: title || 'Nothing Here Yet',
          message: message || 'This section is empty. Start exploring to see content here.',
          actionLabel: actionLabel || 'Get Started',
          gradient: 'from-primary-500 to-secondary-500'
        }
    }
  }

  const emptyContent = getEmptyContent()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
          className={`w-20 h-20 bg-gradient-to-br ${emptyContent.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
        >
          <ApperIcon name={emptyContent.icon} className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-gray-900 mb-2"
        >
          {emptyContent.title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          {emptyContent.message}
        </motion.p>
        
        {(onAction || emptyContent.actionLabel) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={onAction}
              variant="primary"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
            >
              <ApperIcon name="Sparkles" className="w-4 h-4" />
              <span>{emptyContent.actionLabel}</span>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Empty