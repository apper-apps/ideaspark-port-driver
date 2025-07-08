import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ContentItem from '@/components/molecules/ContentItem'
import IdeaCard from '@/components/molecules/IdeaCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { getSavedItems } from '@/services/api/savedService'

const SavedItems = () => {
  const [savedItems, setSavedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

const tabs = [
    { id: 'all', label: 'All Items', icon: 'Grid3X3' },
    { id: 'content', label: 'Content', icon: 'FileText' },
    { id: 'ideas', label: 'Ideas', icon: 'Lightbulb' },
    { id: 'drafts', label: 'Drafts', icon: 'PenTool' },
    { id: 'searches', label: 'Searches', icon: 'Search' }
  ]

  const loadSavedItems = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getSavedItems()
      setSavedItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSavedItems()
  }, [])

  const filteredItems = savedItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  const handleDelete = (itemId) => {
    setSavedItems(savedItems.filter(item => item.Id !== itemId))
  }

  if (loading) {
    return <Loading type="content-list" />
  }

  if (error) {
    return <Error message={error} onRetry={loadSavedItems} type="data" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Items</h1>
          <p className="text-gray-600 mt-1">Your collection of saved content and ideas</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="secondary" size="sm">
            <ApperIcon name="FolderPlus" className="w-4 h-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved items..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <ApperIcon name={tab.icon} className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
                {savedItems.filter(item => tab.id === 'all' || item.type === tab.id).length}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      {filteredItems.length === 0 ? (
        <Empty 
          type="saved"
          title={savedItems.length === 0 ? "No saved items yet" : "No items match your filter"}
          message={savedItems.length === 0 
            ? "Start saving interesting content and ideas to build your collection."
            : "Try adjusting your search or selecting a different category."
          }
          actionLabel={savedItems.length === 0 ? "Explore Content" : "Clear Filters"}
          onAction={() => {
            if (savedItems.length === 0) {
              // Navigate to discover page
            } else {
              setActiveTab('all')
              setSearchQuery('')
            }
          }}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              {searchQuery && ` matching "${searchQuery}"`}
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ApperIcon name="SlidersHorizontal" className="w-4 h-4 mr-2" />
                Sort
              </Button>
              <Button variant="ghost" size="sm">
                <ApperIcon name="LayoutGrid" className="w-4 h-4 mr-2" />
                View
              </Button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="space-y-4">
            {filteredItems.map((item, index) => {
              if (item.type === 'content') {
                return (
                  <ContentItem
                    key={item.Id}
                    content={item}
                    index={index}
                    onBookmark={() => handleDelete(item.Id)}
                  />
                )
              } else if (item.type === 'ideas') {
                return (
                  <div key={item.Id} className="max-w-md">
                    <IdeaCard
                      idea={item}
                      index={index}
                    />
                  </div>
                )
              } else {
                return (
                  <motion.div
                    key={item.Id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg p-4 border border-gray-100 hover-lift"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <div className="text-xs text-gray-500 mt-2">
                          Saved on {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.Id)}
                        className="text-gray-400 hover:text-error"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )
              }
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SavedItems