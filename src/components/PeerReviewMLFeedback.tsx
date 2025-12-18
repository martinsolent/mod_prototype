import { useState } from 'react';
import { HelpCircle, AlertCircle, Send } from 'lucide-react';
import { AssessmentData } from '../App';

interface PeerReviewMLFeedbackProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
}

export function PeerReviewMLFeedback({ onNavigate, assessmentData, updateAssessmentData }: PeerReviewMLFeedbackProps) {
  const [formData, setFormData] = useState({
    moduleTitle: assessmentData.moduleTitle,
    moduleCode: assessmentData.moduleCode,
    level: assessmentData.level,
    moduleLeader: assessmentData.moduleLeader,
    internalPeerReviewer: assessmentData.internalPeerReviewer,
    assessmentNumber: assessmentData.assessmentNumber,
    assessmentTitle: assessmentData.assessmentTitle,
    weighting: assessmentData.assessmentWeighting,
    passGrade: assessmentData.passGrade,
    aggregated: assessmentData.aggregated,
    moduleLeaderComments: assessmentData.moduleLeaderComments
  });

  const [checkedItems, setCheckedItems] = useState(assessmentData.peerReviewChecks);
  const [responseToReviewer, setResponseToReviewer] = useState(assessmentData.moduleLeaderResponseToReviewer || '');

  // Update shared state in real-time whenever formData changes
  const handleFormChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    updateAssessmentData({
      [field === 'weighting' ? 'assessmentWeighting' : field]: value
    });
  };

  // Update shared state in real-time whenever checkboxes change
  const handleCheckboxChange = (field: keyof typeof checkedItems) => {
    const newCheckedItems = { ...checkedItems, [field]: !checkedItems[field] };
    setCheckedItems(newCheckedItems);
    
    updateAssessmentData({
      peerReviewChecks: newCheckedItems
    });
  };

  const handleResubmit = () => {
    updateAssessmentData({
      moduleTitle: formData.moduleTitle,
      moduleCode: formData.moduleCode,
      level: formData.level,
      moduleLeader: formData.moduleLeader,
      internalPeerReviewer: formData.internalPeerReviewer,
      assessmentNumber: formData.assessmentNumber,
      assessmentTitle: formData.assessmentTitle,
      assessmentWeighting: formData.weighting,
      passGrade: formData.passGrade,
      aggregated: formData.aggregated,
      moduleLeaderComments: formData.moduleLeaderComments,
      peerReviewChecks: checkedItems,
      moduleLeaderResponseToReviewer: responseToReviewer
    });
    alert('Updated form has been re-submitted to the Peer Reviewer. They will be notified by email to review your changes.');
  };

  // Dropdown options
  const moduleLeaders = [
    'Select a module leader...',
    'Dr. Jane Smith',
    'Dr. Sarah Johnson',
    'Prof. Michael Chen',
    'Dr. Emily Williams',
    'Dr. James Anderson'
  ];

  const peerReviewers = [
    'Select a reviewer...',
    'Dr. Sarah Johnson',
    'Prof. Michael Chen',
    'Dr. Emily Williams',
    'Dr. James Anderson',
    'Prof. Rebecca Taylor'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#4a5568] text-white px-6 py-3">
        <h1>Assessment brief and moderation workflow Prototype</h1>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex gap-8">
            <button className="py-4 text-[#0066cc] hover:text-[#004499]">
              Course
            </button>
            <button className="py-4 text-[#0066cc] hover:text-[#004499]">
              Settings
            </button>
            <button className="py-4 text-[#0066cc] hover:text-[#004499]">
              Participants
            </button>
            <button 
              onClick={() => onNavigate('brief-creation')}
              className="py-4 text-[#0066cc] hover:text-[#004499]"
            >
              Assessment Brief
            </button>
            <button 
              onClick={() => onNavigate('peer-review')}
              className="py-4 text-[#0066cc] hover:text-[#004499] border-b-2 border-[#0066cc]"
            >
              Peer Review
            </button>
            <button 
              onClick={() => onNavigate('sample-selection')}
              className="py-4 text-[#0066cc] hover:text-[#004499]"
            >
              Sample Selection
            </button>
            <button 
              onClick={() => onNavigate('internal-moderation')}
              className="py-4 text-[#0066cc] hover:text-[#004499]"
            >
              Internal Moderation
            </button>
            <button 
              onClick={() => onNavigate('feedback')}
              className="py-4 text-[#0066cc] hover:text-[#004499]"
            >
              External Examiner
            </button>
            <button className="py-4 text-[#0066cc] hover:text-[#004499]">
              More ▾
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Feedback Alert Banner */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6 rounded">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-orange-800 mb-2">Peer Reviewer Feedback Received</h3>
              <p className="text-sm text-orange-700 mb-3">
                The Peer Reviewer has reviewed your assessment brief and provided feedback below. 
                Please review their comments, make any necessary updates to the form, and address their concerns in the "Response to Reviewer" section. 
                Once you've made the updates, click "Re-submit to Peer Reviewer" to send it back for another review.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded p-8">
          <h1 className="text-center text-2xl mb-8">Assessment Brief Peer Review - Address Feedback</h1>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-[200px_1fr] gap-4 mb-6">
            <label className="text-right">Module Title:</label>
            <input
              type="text"
              value={formData.moduleTitle}
              onChange={(e) => handleFormChange('moduleTitle', e.target.value)}
              className="border border-gray-300 px-3 py-1 bg-gray-200"
            />

            <label className="text-right">Module Code:</label>
            <input
              type="text"
              value={formData.moduleCode}
              onChange={(e) => handleFormChange('moduleCode', e.target.value)}
              className="border border-gray-300 px-3 py-1 bg-gray-200"
            />

            <label className="text-right">Level:</label>
            <input
              type="text"
              value={formData.level}
              onChange={(e) => handleFormChange('level', e.target.value)}
              className="border border-gray-300 px-3 py-1 bg-gray-200"
            />

            <label className="text-right">Module Leader:</label>
            <select
              value={formData.moduleLeader}
              onChange={(e) => handleFormChange('moduleLeader', e.target.value)}
              className="border border-gray-300 px-3 py-1 bg-gray-200"
            >
              {moduleLeaders.map((leader) => (
                <option key={leader} value={leader}>{leader}</option>
              ))}
            </select>

            <label className="text-right">Internal Peer Reviewer:</label>
            <div className="border border-gray-300 px-3 py-1 bg-gray-100">
              {formData.internalPeerReviewer}
            </div>

            <label className="text-right">Assessment Number:</label>
            <input
              type="text"
              value={formData.assessmentNumber}
              onChange={(e) => handleFormChange('assessmentNumber', e.target.value)}
              className="border border-gray-300 px-3 py-1 bg-gray-200"
            />

            <label className="text-right">Assessment Title:</label>
            <input
              type="text"
              value={formData.assessmentTitle}
              onChange={(e) => handleFormChange('assessmentTitle', e.target.value)}
              className="border border-gray-300 px-3 py-1 bg-gray-200"
            />
          </div>

          {/* Weighting and Pass Grade Row */}
          <div className="flex gap-8 mb-6">
            <div className="flex items-center gap-2">
              <label>Weighting %:</label>
              <input
                type="text"
                value={formData.weighting}
                onChange={(e) => handleFormChange('weighting', e.target.value)}
                className="border border-gray-300 px-3 py-1 bg-gray-200 w-20"
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Pass Grade/Mark %:</label>
              <input
                type="text"
                value={formData.passGrade}
                onChange={(e) => handleFormChange('passGrade', e.target.value)}
                className="border border-gray-300 px-3 py-1 bg-gray-200 w-20"
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Aggregated:</label>
              <select
                value={formData.aggregated}
                onChange={(e) => handleFormChange('aggregated', e.target.value)}
                className="border border-gray-300 px-3 py-1 bg-gray-200"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Assessment Components Table with Peer Reviewer Comments */}
          <table className="w-full border-collapse border border-black mb-6">
            <thead>
              <tr className="bg-white">
                <th className="border border-black px-4 py-2 text-left">Assessment Components</th>
                <th className="border border-black px-4 py-2 text-center w-32">
                  Confirmed
                </th>
                <th className="border border-black px-4 py-2 text-left w-96">Peer Reviewer's Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-4 py-3">Assessment Briefing Sheet used</td>
                <td className="border border-black px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={checkedItems.briefingSheet}
                    onChange={() => handleCheckboxChange('briefingSheet')}
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-yellow-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.briefingSheet || 'No comments'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">
                  Complies with Module descriptor assessment strategy and assessment descriptor
                </td>
                <td className="border border-black px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={checkedItems.compliesDescriptor}
                    onChange={() => handleCheckboxChange('compliesDescriptor')}
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-yellow-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.compliesDescriptor || 'No comments'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">Instructions are clear</td>
                <td className="border border-black px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={checkedItems.instructionsClear}
                    onChange={() => handleCheckboxChange('instructionsClear')}
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-yellow-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.instructionsClear || 'No comments'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">
                  Assessment criteria are clear and appropriate to task and level, and align with the SU generic grading criteria
                </td>
                <td className="border border-black px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={checkedItems.criteriaClear}
                    onChange={() => handleCheckboxChange('criteriaClear')}
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-yellow-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.criteriaClear || 'No comments'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">
                  Task enables students to achieve Module learning outcomes
                </td>
                <td className="border border-black px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={checkedItems.taskEnables}
                    onChange={() => handleCheckboxChange('taskEnables')}
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-yellow-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.taskEnables || 'No comments'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">
                  Consideration of special provision arrangements for students with disabilities
                </td>
                <td className="border border-black px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={checkedItems.specialProvision}
                    onChange={() => handleCheckboxChange('specialProvision')}
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-yellow-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.specialProvision || 'No comments'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Module Leader's Original Comments */}
          <div className="border border-black mb-6">
            <div className="grid grid-cols-[200px_1fr]">
              <div className="border-r border-black px-4 py-3 bg-gray-100">
                Your Original Comments
              </div>
              <div className="px-4 py-3">
                <textarea
                  value={formData.moduleLeaderComments}
                  onChange={(e) => handleFormChange('moduleLeaderComments', e.target.value)}
                  className="w-full h-24 bg-gray-200 px-2 py-1 resize-none"
                  placeholder="Update your comments if needed..."
                />
              </div>
            </div>
          </div>

          {/* Peer Reviewer's Overall Comments (Read Only) */}
          <div className="border border-black mb-6">
            <div className="grid grid-cols-[200px_1fr]">
              <div className="border-r border-black px-4 py-3 bg-orange-100">
                Peer Reviewer's Overall Feedback
              </div>
              <div className="px-4 py-3 bg-orange-50">
                <div className="text-sm text-gray-800 min-h-[80px] whitespace-pre-wrap">
                  {assessmentData.peerReviewerOverallComments || 'No overall comments provided'}
                </div>
              </div>
            </div>
          </div>

          {/* Module Leader's Response to Reviewer */}
          <div className="border border-black mb-8">
            <div className="grid grid-cols-[200px_1fr]">
              <div className="border-r border-black px-4 py-3 bg-blue-100">
                Your Response to Reviewer
              </div>
              <div className="px-4 py-3">
                <textarea
                  value={responseToReviewer}
                  onChange={(e) => {
                    setResponseToReviewer(e.target.value);
                    updateAssessmentData({ moduleLeaderResponseToReviewer: e.target.value });
                  }}
                  className="w-full h-32 bg-gray-200 px-2 py-1 resize-none"
                  placeholder="Address the peer reviewer's feedback and explain what changes you've made..."
                />
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded p-6 mb-6">
              <p className="text-sm mb-4">
                <strong>Note:</strong> Review all the peer reviewer's comments above (highlighted in yellow). 
                Make any necessary updates to the assessment components, checkboxes, or your comments. 
                Add your response explaining the changes you've made, then click "Re-submit to Peer Reviewer" to send the updated form back for another review.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleResubmit}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
                Re-submit to Peer Reviewer
              </button>
              <button
                onClick={() => onNavigate('brief-creation')}
                className="px-8 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                View Assessment Brief
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Breadcrumb */}
      <div className="border-t border-gray-200 bg-white px-6 py-3 mt-8">
        <div className="flex items-center gap-2 text-sm">
          <a href="#" className="text-[#0066cc] hover:text-[#004499]">
            Dashboard
          </a>
          <span className="text-gray-400">/</span>
          <a href="#" className="text-[#0066cc] hover:text-[#004499]">
            Course administration
          </a>
          <span className="text-gray-400">/</span>
          <a href="#" className="text-[#0066cc] hover:text-[#004499]">
            Peer Review
          </a>
          <span className="text-gray-400">/</span>
          <a href="#" className="text-[#0066cc] hover:text-[#004499]">
            Address Peer Reviewer Feedback
          </a>
        </div>
      </div>

      {/* Help Button */}
      <button
        className="fixed bottom-6 right-6 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
        aria-label="Help"
      >
        <HelpCircle className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
