import trendingTopicsData from '@/services/mockData/trendingTopics.json'

export const getTrendingTopics = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Simulate occasional errors
  if (Math.random() < 0.05) {
    throw new Error('Failed to load trending topics. Please try again.')
  }
  
  // Return copy to prevent mutations
  return JSON.parse(JSON.stringify(trendingTopicsData))
}

export const getTrendingTopicById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const topic = trendingTopicsData.find(item => item.Id === parseInt(id))
  if (!topic) {
    throw new Error('Trending topic not found')
  }
  
  return JSON.parse(JSON.stringify(topic))
}

export const getTrendingTopicsByCategory = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 250))
  
  const filtered = trendingTopicsData.filter(topic => 
    category === 'all' || topic.category === category
  )
  
  return JSON.parse(JSON.stringify(filtered))
}