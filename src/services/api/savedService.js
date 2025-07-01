import savedItemsData from '@/services/mockData/savedItems.json'

let savedItems = [...savedItemsData]

export const getSavedItems = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Simulate occasional errors
  if (Math.random() < 0.05) {
    throw new Error('Failed to load saved items. Please try again.')
  }
  
  // Sort by creation date (newest first)
  const sorted = savedItems.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  )
  
  return JSON.parse(JSON.stringify(sorted))
}

export const saveItem = async (item) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const newItem = {
    ...item,
    Id: Math.max(...savedItems.map(i => i.Id)) + 1,
    createdAt: new Date().toISOString()
  }
  
  savedItems.push(newItem)
  return JSON.parse(JSON.stringify(newItem))
}

export const deleteItem = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const index = savedItems.findIndex(item => item.Id === parseInt(id))
  if (index === -1) {
    throw new Error('Saved item not found')
  }
  
  savedItems.splice(index, 1)
  return true
}

export const getSavedItemById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const item = savedItems.find(item => item.Id === parseInt(id))
  if (!item) {
    throw new Error('Saved item not found')
  }
  
  return JSON.parse(JSON.stringify(item))
}