import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'trending-topics') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-100 hover-lift"
          >
            <div className="shimmer h-6 w-3/4 rounded mb-3"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="shimmer h-8 w-20 rounded-full"></div>
              <div className="shimmer h-6 w-16 rounded"></div>
            </div>
            <div className="shimmer h-12 w-full rounded mb-3"></div>
            <div className="flex items-center justify-between">
              <div className="shimmer h-4 w-24 rounded"></div>
              <div className="shimmer h-4 w-16 rounded"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'content-list') {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 border border-gray-100 flex items-center space-x-4"
          >
            <div className="shimmer w-20 h-14 rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <div className="shimmer h-5 w-3/4 rounded mb-2"></div>
              <div className="shimmer h-4 w-1/2 rounded mb-2"></div>
              <div className="flex items-center space-x-4">
                <div className="shimmer h-4 w-16 rounded"></div>
                <div className="shimmer h-4 w-20 rounded"></div>
                <div className="shimmer h-4 w-12 rounded"></div>
              </div>
            </div>
            <div className="shimmer w-8 h-8 rounded-full flex-shrink-0"></div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'ideas-grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="shimmer h-6 w-16 rounded-full"></div>
              <div className="shimmer h-8 w-12 rounded"></div>
            </div>
            <div className="shimmer h-5 w-full rounded mb-2"></div>
            <div className="shimmer h-5 w-4/5 rounded mb-4"></div>
            <div className="shimmer h-4 w-full rounded mb-2"></div>
            <div className="shimmer h-4 w-3/4 rounded mb-4"></div>
            <div className="flex items-center justify-between">
              <div className="shimmer h-8 w-20 rounded"></div>
              <div className="shimmer h-8 w-8 rounded"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg animate-pulse"></div>
        <div className="text-lg font-medium text-gray-600">Loading amazing content...</div>
      </div>
    </div>
  )
}

export default Loading