import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

const TrendingCard = ({ topic, index }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const getGrowthVariant = (growth) => {
    if (growth > 0) return 'growth'
    if (growth < 0) return 'decline'
    return 'default'
  }

  // Generate mock sparkline data
  const sparklineData = Array.from({ length: 7 }, () => Math.random() * 100)
  const maxValue = Math.max(...sparklineData)
  const normalizedData = sparklineData.map(value => (value / maxValue) * 40)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 border border-gray-100 hover-lift cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
            {topic.keyword}
          </h3>
          <Badge variant="primary" size="sm">
            {topic.category}
          </Badge>
        </div>
        <Badge 
          variant={getGrowthVariant(topic.growth)} 
          size="sm"
          className="ml-2"
        >
          {topic.growth > 0 ? '+' : ''}{topic.growth}%
        </Badge>
      </div>

      {/* Mini Sparkline Chart */}
      <div className="mb-4">
        <svg width="100%" height="48" className="text-primary-500">
          <defs>
            <linearGradient id={`gradient-${topic.Id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path
            d={`M 0,${48 - normalizedData[0]} ${normalizedData.map((value, i) => 
              `L ${(i / (normalizedData.length - 1)) * 100},${48 - value}`
            ).join(' ')}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M 0,48 L 0,${48 - normalizedData[0]} ${normalizedData.map((value, i) => 
              `L ${(i / (normalizedData.length - 1)) * 100},${48 - value}`
            ).join(' ')} L 100,48 Z`}
            fill={`url(#gradient-${topic.Id})`}
          />
        </svg>
      </div>

      {/* Metrics */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-900 counter-animation">
            {formatNumber(topic.volume)}
          </div>
          <div className="text-sm text-gray-500">search volume</div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <ApperIcon name="TrendingUp" className="w-4 h-4" />
            <span>Trending</span>
          </div>
        </div>
      </div>

      {/* Related Terms Preview */}
      {topic.relatedTerms && topic.relatedTerms.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-50">
          <div className="text-xs text-gray-500 mb-2">Related:</div>
          <div className="flex flex-wrap gap-1">
            {topic.relatedTerms.slice(0, 3).map((term, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-50 text-xs text-gray-600 rounded-full"
              >
                {term}
              </span>
            ))}
            {topic.relatedTerms.length > 3 && (
              <span className="px-2 py-1 text-xs text-primary-600">
                +{topic.relatedTerms.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default TrendingCard