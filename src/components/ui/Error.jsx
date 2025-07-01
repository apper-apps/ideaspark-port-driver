import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ message = "Something went wrong", onRetry, type = 'default' }) => {
  const getErrorContent = () => {
    switch (type) {
      case 'network':
        return {
          icon: 'WifiOff',
          title: 'Connection Error',
          description: 'Unable to connect to our servers. Please check your internet connection and try again.',
        }
      case 'search':
        return {
          icon: 'SearchX',
          title: 'Search Failed',
          description: 'We couldn\'t complete your search. This might be a temporary issue.',
        }
      case 'data':
        return {
          icon: 'AlertTriangle',
          title: 'Data Unavailable',
          description: 'The requested data is currently unavailable. Please try again later.',
        }
      default:
        return {
          icon: 'AlertCircle',
          title: 'Oops! Something went wrong',
          description: message,
        }
    }
  }

  const errorContent = getErrorContent()

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
          className="w-16 h-16 bg-gradient-to-br from-error to-warning rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name={errorContent.icon} className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-gray-900 mb-2"
        >
          {errorContent.title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6 leading-relaxed"
        >
          {errorContent.description}
        </motion.p>
        
        {onRetry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={onRetry}
              variant="primary"
              className="inline-flex items-center space-x-2"
            >
              <ApperIcon name="RotateCcw" className="w-4 h-4" />
              <span>Try Again</span>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Error