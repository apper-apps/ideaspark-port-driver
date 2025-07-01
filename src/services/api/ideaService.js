import contentIdeasData from '@/services/mockData/contentIdeas.json'

export const generateIdeas = async (topic, parameters = {}) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Simulate occasional errors
  if (Math.random() < 0.05) {
    throw new Error('Idea generation failed. Please try again.')
  }
  
  // Filter ideas based on topic
  let ideas = contentIdeasData.filter(idea => 
    idea.topic.toLowerCase().includes(topic.toLowerCase()) ||
    idea.title.toLowerCase().includes(topic.toLowerCase())
  )
  
  // If no specific matches, generate some generic ideas
  if (ideas.length === 0) {
    const genericIdeas = [
      {
        Id: Date.now() + 1,
        title: `Ultimate Guide to ${topic}: Everything You Need to Know`,
        topic: topic,
        type: parameters.type === 'all' ? 'blog' : parameters.type,
        score: Math.floor(Math.random() * 30) + 70,
        reasoning: `Comprehensive guides on ${topic} perform well and establish authority in the niche.`
      },
      {
        Id: Date.now() + 2,
        title: `${topic} Mistakes That Are Costing You (And How to Fix Them)`,
        topic: topic,
        type: parameters.type === 'all' ? 'video' : parameters.type,
        score: Math.floor(Math.random() * 25) + 75,
        reasoning: `Problem-solving content around ${topic} attracts engaged audiences looking for solutions.`
      },
      {
        Id: Date.now() + 3,
        title: `I Tried ${topic} for 30 Days - Here's What Happened`,
        topic: topic,
        type: parameters.type === 'all' ? 'video' : parameters.type,
        score: Math.floor(Math.random() * 20) + 80,
        reasoning: `Personal experiment content creates authentic connection and drives high engagement.`
      },
      {
        Id: Date.now() + 4,
        title: `${topic} for Beginners: Simple Steps to Get Started`,
        topic: topic,
        type: parameters.type === 'all' ? 'blog' : parameters.type,
        score: Math.floor(Math.random() * 25) + 65,
        reasoning: `Beginner-friendly content has consistent search demand and helps build audience.`
      },
      {
        Id: Date.now() + 5,
        title: `The Science Behind ${topic}: What Research Shows`,
        topic: topic,
        type: parameters.type === 'all' ? 'infographic' : parameters.type,
        score: Math.floor(Math.random() * 30) + 70,
        reasoning: `Research-backed content builds credibility and gets shared by authoritative sources.`
      }
    ]
    ideas = genericIdeas
  }
  
  // Filter by content type if specified
  if (parameters.type && parameters.type !== 'all') {
    ideas = ideas.filter(idea => idea.type === parameters.type)
  }
  
  // Adjust scores based on difficulty and audience
  ideas = ideas.map(idea => ({
    ...idea,
    score: Math.min(100, idea.score + (parameters.difficulty === 'advanced' ? 5 : 0))
  }))
  
  // Sort by score
  ideas.sort((a, b) => b.score - a.score)
  
  // Return top 6 ideas
  return JSON.parse(JSON.stringify(ideas.slice(0, 6)))
}

export const getIdeaById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const idea = contentIdeasData.find(item => item.Id === parseInt(id))
  if (!idea) {
    throw new Error('Idea not found')
  }
  
  return JSON.parse(JSON.stringify(idea))
}