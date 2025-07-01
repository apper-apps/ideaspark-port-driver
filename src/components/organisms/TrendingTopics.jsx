import { useState, useEffect } from 'react'
import TrendingCard from '@/components/molecules/TrendingCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { getTrendingTopics } from '@/services/api/trendingService'

const TrendingTopics = () => {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Topics', icon: 'Grid3X3' },
    { id: 'technology', label: 'Technology', icon: 'Smartphone' },
    { id: 'business', label: 'Business', icon: 'Briefcase' },
    { id: 'lifestyle', label: 'Lifestyle', icon: 'Heart' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'entertainment', label: 'Entertainment', icon: 'PlayCircle' }
  ]

  const loadTrendingTopics = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getTrendingTopics()
      setTopics(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTrendingTopics()
  }, [])

  const filteredTopics = topics.filter(topic => 
    selectedCategory === 'all' || topic.category === selectedCategory
  )

  if (loading) {
    return <Loading type="trending-topics" />
  }

  if (error) {
    return <Error message={error} onRetry={loadTrendingTopics} type="data" />
  }

  if (topics.length === 0) {
    return <Empty type="trending" onAction={loadTrendingTopics} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trending Topics</h1>
          <p className="text-gray-600 mt-1">Discover what's hot right now</p>
        </div>
        <Button
          onClick={loadTrendingTopics}
          variant="secondary"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <ApperIcon name={category.icon} className="w-4 h-4" />
            <span>{category.label}</span>
          </Button>
        ))}
      </div>

      {/* Topics Grid */}
      {filteredTopics.length === 0 ? (
        <Empty 
          type="search" 
          title="No topics in this category"
          message="Try selecting a different category or refresh the data."
          actionLabel="Show All Topics"
          onAction={() => setSelectedCategory('all')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTopics.map((topic, index) => (
            <TrendingCard
              key={topic.Id}
              topic={topic}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{topics.length}</div>
            <div className="text-sm text-gray-600">Trending Topics</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary-600">
              {topics.reduce((acc, topic) => acc + topic.volume, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Search Volume</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-600">
              +{Math.round(topics.reduce((acc, topic) => acc + topic.growth, 0) / topics.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Growth</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingTopics