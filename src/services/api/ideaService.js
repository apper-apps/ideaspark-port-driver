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
  
// If no specific matches, generate educational content ideas
  if (ideas.length === 0) {
    const educationalIdeas = [
      {
        Id: Date.now() + 1,
        title: `Mastering ${topic}: Complete Course Curriculum Design`,
        topic: topic,
        type: parameters.type === 'all' ? 'course' : parameters.type,
        score: Math.floor(Math.random() * 20) + 80,
        reasoning: `Comprehensive course design on ${topic} addresses educator needs for structured learning paths and systematic skill development.`
      },
      {
        Id: Date.now() + 2,
        title: `${topic} Workshop: Interactive Learning Activities That Work`,
        topic: topic,
        type: parameters.type === 'all' ? 'workshop' : parameters.type,
        score: Math.floor(Math.random() * 25) + 75,
        reasoning: `Interactive workshops on ${topic} engage learners through hands-on practice and collaborative problem-solving.`
      },
      {
        Id: Date.now() + 3,
        title: `Case Study: How ${topic} Transformed My Students' Results`,
        topic: topic,
        type: parameters.type === 'all' ? 'blog' : parameters.type,
        score: Math.floor(Math.random() * 20) + 85,
        reasoning: `Real transformation stories around ${topic} build credibility and inspire both educators and learners.`
      },
      {
        Id: Date.now() + 4,
        title: `${topic} Assessment Strategies: Measuring Real Learning`,
        topic: topic,
        type: parameters.type === 'all' ? 'course' : parameters.type,
        score: Math.floor(Math.random() * 25) + 70,
        reasoning: `Assessment-focused content helps educators validate learning outcomes and improve their ${topic} teaching methods.`
      },
      {
        Id: Date.now() + 5,
        title: `Coaching Framework: ${topic} Breakthrough Techniques`,
        topic: topic,
        type: parameters.type === 'all' ? 'coaching' : parameters.type,
        score: Math.floor(Math.random() * 30) + 75,
        reasoning: `Structured coaching approaches for ${topic} appeal to consultants seeking proven methodologies and client transformation tools.`
      },
      {
        Id: Date.now() + 6,
        title: `${topic} Book Outline: Chapter-by-Chapter Authority Building`,
        topic: topic,
        type: parameters.type === 'all' ? 'book' : parameters.type,
        score: Math.floor(Math.random() * 25) + 78,
        reasoning: `Book planning content helps experts structure their ${topic} knowledge into publishable, marketable educational resources.`
      },
      {
        Id: Date.now() + 7,
        title: `${topic} Learning Path: From Novice to Expert in 90 Days`,
        topic: topic,
        type: parameters.type === 'all' ? 'webinar' : parameters.type,
        score: Math.floor(Math.random() * 20) + 82,
        reasoning: `Structured learning progressions for ${topic} provide clear value propositions and attract serious learners seeking systematic growth.`
      }
    ]
    ideas = educationalIdeas
  }
  
  // Filter by content type if specified
  if (parameters.type && parameters.type !== 'all') {
    ideas = ideas.filter(idea => idea.type === parameters.type)
  }
  
// Adjust scores based on educational parameters
  ideas = ideas.map(idea => {
    let adjustedScore = idea.score
    
    // Difficulty bonus
    if (parameters.difficulty === 'advanced') adjustedScore += 5
    if (parameters.difficulty === 'beginner') adjustedScore += 3
    
    // Structure bonus
    if (parameters.structure === 'project') adjustedScore += 4
    if (parameters.structure === 'case-study') adjustedScore += 3
    
    // Objectives bonus
    if (parameters.objectives === 'transformation') adjustedScore += 6
    if (parameters.objectives === 'practical') adjustedScore += 4
    
    // Audience-specific scoring
    if (parameters.audience === 'educators' && ['course', 'workshop'].includes(idea.type)) adjustedScore += 5
    if (parameters.audience === 'coaches' && ['coaching', 'webinar'].includes(idea.type)) adjustedScore += 5
    
    return {
      ...idea,
      score: Math.min(100, adjustedScore)
    }
  })
  
  // Sort by score
  ideas.sort((a, b) => b.score - a.score)
  
// Return top 8 educational ideas
  return JSON.parse(JSON.stringify(ideas.slice(0, 8)))
}

export const getIdeaById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const idea = contentIdeasData.find(item => item.Id === parseInt(id))
  if (!idea) {
    throw new Error('Idea not found')
  }
  
  return JSON.parse(JSON.stringify(idea))
}