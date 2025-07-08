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

export const draftContent = async (ideaId, draftData) => {
  // Simulate AI content generation delay
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  // Simulate occasional errors
  if (Math.random() < 0.05) {
    throw new Error('Content drafting failed. Please try again.')
  }
  
  // Generate a new draft based on the idea and user input
  const draft = {
    Id: Date.now(),
    type: 'drafts',
    title: draftData.title,
    description: `Draft content created from idea #${ideaId}`,
    content: {
      outline: draftData.outline,
      introduction: draftData.introduction,
      keyPoints: draftData.keyPoints,
      conclusion: draftData.conclusion,
      resources: draftData.resources
    },
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    wordCount: (draftData.introduction + draftData.keyPoints + draftData.conclusion).split(' ').length,
    originalIdeaId: ideaId
  }
  
  return JSON.parse(JSON.stringify(draft))
}

export const updateDraft = async (draftId, updates) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  if (Math.random() < 0.03) {
    throw new Error('Failed to update draft. Please try again.')
  }
  
  // In a real app, this would update the draft in the database
  const updatedDraft = {
    Id: parseInt(draftId),
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  return JSON.parse(JSON.stringify(updatedDraft))
}

export const deleteDraft = async (draftId) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  if (Math.random() < 0.03) {
    throw new Error('Failed to delete draft. Please try again.')
  }
  
  return { success: true, deletedId: parseInt(draftId) }
}