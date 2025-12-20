import { useState } from 'react';
import { HelpCircle, AlertCircle, Send } from 'lucide-react';
import { AssessmentData, StudentSample } from '../App';

interface InternalModerationMLSentBackProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
  onViewChange?: (view: 'moderator-view' | 'ml-sent-back' | 'ml-signed-off') => void;
}

export function InternalModerationMLSentBack({ onNavigate, assessmentData, updateAssessmentData, onViewChange }: InternalModerationMLSentBackProps) {
  const [formData, setFormData] = useState({
    moduleTitle: assessmentData.moduleTitle,
    moduleCode: assessmentData.moduleCode,
    moduleLeader: assessmentData.moduleLeader,
    level: assessmentData.level,
    academicYear: assessmentData.academicYear,
    semester: assessmentData.semester,
    numberOfSubmissions: '45',
    numberOfModeratedSubmissions: '5',
    gradesAppropriate: 'The grades appear to be generally appropriate and in line with the learning outcomes. However, there are a few instances where the feedback could be more detailed to justify the grade awarded.',
    moderatorComments: 'Please provide more detailed feedback for students in the 58-65 grade range. The borderline cases need clearer justification for why they received the grade they did. Also, please clarify the marking criteria applied to Assignment 3.',
    moduleLeaderResponse: assessmentData.internalModerationMLResponse || '',
    isFranchisePartner: false,
    requiresExternalModeration: true
  });

  // Use shared student samples from assessmentData (read-only for prototype)
  const studentSamples: StudentSample[] = assessmentData.studentSamples;

  const handleResubmit = () => {
    if (!formData.moduleLeaderResponse.trim()) {
      alert('Please provide a response to the moderator\'s comments before resubmitting.');
      return;
    }

    if (confirm('Are you sure you want to resubmit this to the Internal Moderator? They will be notified by email that you have addressed their comments.')) {
      updateAssessmentData({
        internalModerationMLResponse: formData.moduleLeaderResponse,
        internalModerationStatus: 'resubmitted'
      });
      alert('Internal Moderation has been resubmitted to the Internal Moderator. They have been notified by email.');
    }
  };

  const handleResponseChange = (value: string) => {
    setFormData({ ...formData, moduleLeaderResponse: value });
    updateAssessmentData({ internalModerationMLResponse: value });
  };

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
              className="py-4 text-[#0066cc] hover:text-[#004499]"
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
              className="py-4 text-[#0066cc] hover:text-[#004499] border-b-2 border-[#0066cc]"
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
        {/* View Toggle Buttons */}
        <div className="mb-6 bg-white border border-gray-300 rounded p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm mr-2">View:</span>
            <button
              onClick={() => onViewChange?.('moderator-view')}
              className="px-4 py-2 rounded transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Internal Moderator View
            </button>
            <button
              className="px-4 py-2 rounded transition-colors bg-yellow-600 text-white"
            >
              ML: Sent Back for Clarification
            </button>
            <button
              onClick={() => onViewChange?.('ml-signed-off')}
              className="px-4 py-2 rounded transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              ML: Signed Off
            </button>
          </div>
        </div>

        {/* Status Banner - Yellow for Action Required */}
        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-6 rounded">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-yellow-800 mb-2">Action Required - Sent Back by Internal Moderator</h3>
              <p className="text-sm text-yellow-700">
                The Internal Moderator has requested clarification. Please review their comments below, provide your response, and resubmit the form.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded p-8">
          <h1 className="text-center text-2xl mb-8">Internal Moderation Form - Module Leader Response</h1>

          {/* Module Information Section */}
          <div className="space-y-4 mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Module Information</h2>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Module Title:</label>
              <input
                type="text"
                value={formData.moduleTitle}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Module Code:</label>
              <input
                type="text"
                value={formData.moduleCode}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Module Leader:</label>
              <input
                type="text"
                value={formData.moduleLeader}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Level:</label>
              <input
                type="text"
                value={formData.level}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Academic Year:</label>
              <input
                type="text"
                value={formData.academicYear}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Semester:</label>
              <input
                type="text"
                value={formData.semester}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Number of Submissions:</label>
              <input
                type="text"
                value={formData.numberOfSubmissions}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Number of Moderated Submissions:</label>
              <input
                type="text"
                value={formData.numberOfModeratedSubmissions}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>
          </div>

          {/* Student Sample Section */}
          <div className="mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Student Names/Numbers & Grades of Moderated Sample</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 p-2 text-left">Student ID</th>
                    <th className="border border-gray-400 p-2 text-left">Student First Name</th>
                    <th className="border border-gray-400 p-2 text-left">Grade</th>
                    <th className="border border-gray-400 p-2 text-left">View Work</th>
                  </tr>
                </thead>
                <tbody>
                  {studentSamples.map((student, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-400 p-2">{student.id}</td>
                      <td className="border border-gray-400 p-2">{student.firstName}</td>
                      <td className="border border-gray-400 p-2">{student.grade}</td>
                      <td className="border border-gray-400 p-2">
                        <a href={student.workLink} className="text-[#0066cc] hover:text-[#004499] underline">
                          View Work & Feedback
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Moderation Review Section */}
          <div className="space-y-4 mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Moderation Review</h2>

            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Are the grades and feedback comments appropriate?</label>
              <div className="w-full p-3 border border-gray-300 bg-gray-50 rounded">
                <p className="text-sm text-gray-700">{formData.gradesAppropriate}</p>
              </div>
            </div>

            {/* Moderator Comments - Highlighted in Yellow */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Internal Moderator Comments:</label>
              <div className="w-full p-4 border-2 border-yellow-400 bg-yellow-50 rounded">
                <p className="text-sm mb-1"><strong className="text-yellow-900">⚠️ Moderator Feedback:</strong></p>
                <p className="text-sm text-gray-800">{formData.moderatorComments}</p>
              </div>
            </div>

            {/* Module Leader Response - Editable */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Your Response <span className="text-red-600">*</span></label>
              <div>
                <textarea
                  value={formData.moduleLeaderResponse}
                  onChange={(e) => handleResponseChange(e.target.value)}
                  className="w-full h-40 p-3 border-2 border-blue-300 bg-white rounded"
                  placeholder="Provide your response to the moderator's comments. Detail any actions taken, changes made, or clarifications needed..."
                />
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Required:</strong> Please address each point raised by the moderator and explain any actions you have taken.
                </p>
              </div>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-800">
                <strong>Important:</strong> If the actions identified result in changes to grades/marks, it is the module leader's responsibility to ensure the correct marks are uploaded.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="flex justify-center">
              <div className="text-center">
                <button
                  onClick={handleResubmit}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Resubmit to Internal Moderator
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  Submit your response and changes to the Internal Moderator for review.
                </p>
              </div>
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
            Internal Moderation
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