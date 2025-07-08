import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import IdeaGenerator from '@/components/organisms/IdeaGenerator'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { draftContent } from '@/services/api/contentService'

const DraftingModal = ({ isOpen, onClose, idea, onSuccess }) => {
  const [drafting, setDrafting] = useState(false)
  const [draftData, setDraftData] = useState({
    title: idea?.title || '',
    outline: '',
    introduction: '',
    keyPoints: '',
    conclusion: '',
    resources: ''
  })

  const handleDraft = async () => {
    try {
      setDrafting(true)
      const draft = await draftContent(idea.Id, draftData)
      toast.success('Content draft created successfully!')
      onSuccess(draft)
      onClose()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setDrafting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Draft Content</h2>
              <p className="text-gray-600 mt-1">Create a structured draft for your content idea</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ApperIcon name="X" className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <Input
              label="Content Title"
              value={draftData.title}
              onChange={(e) => setDraftData({ ...draftData, title: e.target.value })}
              placeholder="Enter your content title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Outline</label>
            <textarea
              value={draftData.outline}
              onChange={(e) => setDraftData({ ...draftData, outline: e.target.value })}
              placeholder="• Main section 1&#10;  - Subsection A&#10;  - Subsection B&#10;• Main section 2&#10;• Main section 3"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Introduction</label>
            <textarea
              value={draftData.introduction}
              onChange={(e) => setDraftData({ ...draftData, introduction: e.target.value })}
              placeholder="Write a compelling introduction that hooks your audience and sets clear expectations..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Learning Points</label>
            <textarea
              value={draftData.keyPoints}
              onChange={(e) => setDraftData({ ...draftData, keyPoints: e.target.value })}
              placeholder="• Key takeaway 1&#10;• Key takeaway 2&#10;• Key takeaway 3&#10;• Practical application tips"
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conclusion & Next Steps</label>
            <textarea
              value={draftData.conclusion}
              onChange={(e) => setDraftData({ ...draftData, conclusion: e.target.value })}
              placeholder="Summarize key points and provide clear next steps for learners..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Resources</label>
            <textarea
              value={draftData.resources}
              onChange={(e) => setDraftData({ ...draftData, resources: e.target.value })}
              placeholder="• Recommended reading&#10;• Tools and software&#10;• Further learning resources&#10;• Templates or worksheets"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Your draft will be saved and accessible in the Saved Items section
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button 
              onClick={handleDraft} 
              loading={drafting}
              disabled={!draftData.title.trim()}
            >
              <ApperIcon name="FileText" className="w-4 h-4 mr-2" />
              Create Draft
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Ideas = () => {
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [showDraftModal, setShowDraftModal] = useState(false)

  const handleDraftContent = (idea) => {
    setSelectedIdea(idea)
    setShowDraftModal(true)
  }

  const handleDraftSuccess = (draft) => {
    // Draft saved successfully
    setSelectedIdea(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <IdeaGenerator onDraftContent={handleDraftContent} />
      
      <AnimatePresence>
        <DraftingModal
          isOpen={showDraftModal}
          onClose={() => setShowDraftModal(false)}
          idea={selectedIdea}
          onSuccess={handleDraftSuccess}
        />
      </AnimatePresence>
    </div>
  )
}

export default Ideas