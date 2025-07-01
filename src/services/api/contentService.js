import contentItemsData from '@/services/mockData/contentItems.json'

export const searchContent = async (query, filters = {}) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  // Simulate occasional errors
  if (Math.random() < 0.05) {
    throw new Error('Search failed. Please check your connection and try again.')
  }
  
  // Filter content based on query
  let results = contentItemsData.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.author.toLowerCase().includes(query.toLowerCase())
  )
  
  // Apply platform filter if provided
  if (filters.platform) {
    results = results.filter(item => 
      item.platform.toLowerCase() === filters.platform.toLowerCase()
    )
  }
  
  // Sort by relevance/engagement
  results.sort((a, b) => b.engagement - a.engagement)
  
  return JSON.parse(JSON.stringify(results))
}

export const getContentById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const content = contentItemsData.find(item => item.Id === parseInt(id))
  if (!content) {
    throw new Error('Content not found')
  }
  
  return JSON.parse(JSON.stringify(content))
}

export const getAllContent = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return JSON.parse(JSON.stringify(contentItemsData))
}