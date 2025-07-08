import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import IdeaCard from '@/components/molecules/IdeaCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { generateIdeas } from '@/services/api/ideaService'

const IdeaGenerator = ({ onDraftContent }) => {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [topic, setTopic] = useState('')
  const [parameters, setParameters] = useState({
    type: 'all',
    difficulty: 'medium',
    audience: 'general',
    structure: 'mixed',
    objectives: 'engagement'
  })

  const handleDraftContent = (idea) => {
    if (onDraftContent) {
      onDraftContent(idea)
    }
  }

  const contentTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'course', label: 'Course Module' },
    { id: 'book', label: 'Book Chapter' },
    { id: 'workshop', label: 'Workshop' },
    { id: 'video', label: 'Video Lesson' },
    { id: 'blog', label: 'Blog Post' },
    { id: 'coaching', label: 'Coaching Session' },
    { id: 'webinar', label: 'Webinar' },
    { id: 'social', label: 'Social Media' },
    { id: 'infographic', label: 'Infographic' }
  ]

  const difficulties = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'medium', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ]

const audiences = [
    { id: 'general', label: 'General Audience' },
    { id: 'students', label: 'Students & Learners' },
    { id: 'business', label: 'Business Professionals' },
    { id: 'educators', label: 'Fellow Educators' },
    { id: 'coaches', label: 'Coaches & Consultants' },
    { id: 'entrepreneurs', label: 'Entrepreneurs' },
    { id: 'creators', label: 'Content Creators' }
  ]

  const structures = [
    { id: 'mixed', label: 'Mixed Format' },
    { id: 'sequential', label: 'Sequential Learning' },
    { id: 'modular', label: 'Modular Approach' },
    { id: 'project', label: 'Project-Based' },
    { id: 'case-study', label: 'Case Studies' }
  ]

  const objectives = [
    { id: 'engagement', label: 'Maximize Engagement' },
    { id: 'retention', label: 'Knowledge Retention' },
    { id: 'practical', label: 'Practical Application' },
    { id: 'transformation', label: 'Behavioral Change' },
    { id: 'certification', label: 'Skill Certification' }
  ]

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic to generate ideas')
      return
    }

    try {
      setLoading(true)
      setError('')
      const generatedIdeas = await generateIdeas(topic, parameters)
      setIdeas(generatedIdeas)
      toast.success(`Generated ${generatedIdeas.length} content ideas!`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    if (topic.trim()) {
      handleGenerate()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Idea Generator</h1>
        <p className="text-gray-600">Generate creative content ideas powered by trending data</p>
      </div>

      {/* Generator Form */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="space-y-6">
          {/* Topic Input */}
          <div>
            <Input
              label="Topic or Keyword"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., 'productivity apps', 'sustainable living')"
              icon="Lightbulb"
            />
          </div>

{/* Parameters */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <select
                  value={parameters.type}
                  onChange={(e) => setParameters({ ...parameters, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {contentTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                <select
                  value={parameters.difficulty}
                  onChange={(e) => setParameters({ ...parameters, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {difficulties.map((diff) => (
                    <option key={diff.id} value={diff.id}>{diff.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <select
                  value={parameters.audience}
                  onChange={(e) => setParameters({ ...parameters, audience: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {audiences.map((aud) => (
                    <option key={aud.id} value={aud.id}>{aud.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Structure</label>
                <select
                  value={parameters.structure}
                  onChange={(e) => setParameters({ ...parameters, structure: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {structures.map((struct) => (
                    <option key={struct.id} value={struct.id}>{struct.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objective</label>
                <select
                  value={parameters.objectives}
                  onChange={(e) => setParameters({ ...parameters, objectives: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {objectives.map((obj) => (
                    <option key={obj.id} value={obj.id}>{obj.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

{/* Generate Button */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              AI will generate 5-8 educational content ideas optimized for your audience and learning objectives
            </div>
            <Button
              onClick={handleGenerate}
              loading={loading}
              disabled={!topic.trim()}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Sparkles" className="w-4 h-4" />
              <span>Generate Ideas</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        {loading && <Loading type="ideas-grid" />}
        
        {error && !loading && (
          <Error 
            message={error} 
            onRetry={handleRefresh} 
            type="data" 
          />
        )}

        {!loading && !error && ideas.length === 0 && topic && (
          <Empty 
            type="ideas"
            title="No ideas generated"
            message="We couldn't generate ideas for this topic. Try a different keyword or adjust your parameters."
            actionLabel="Try Different Topic"
            onAction={() => setTopic('')}
          />
        )}

        {!loading && !error && ideas.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Generated {ideas.length} ideas for "{topic}"
              </h2>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleRefresh}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="RefreshCw" className="w-4 h-4" />
                  <span>Refresh</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>

            {/* Ideas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{ideas.map((idea, index) => (
                <IdeaCard
                  key={idea.Id}
                  idea={idea}
                  index={index}
                  onDraftContent={handleDraftContent}
                />
              ))}
            </div>
          </motion.div>
        )}

        {!topic && !loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Lightbulb" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to spark ideas</h3>
            <p className="text-gray-600">Enter a topic above and let AI generate creative content ideas for you.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default IdeaGenerator