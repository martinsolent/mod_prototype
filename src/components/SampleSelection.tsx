import { useState } from 'react';
import { HelpCircle, Download, AlertCircle } from 'lucide-react';
import { AssessmentData, StudentSample } from '../App';

interface SampleSelectionProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
}

export function SampleSelection({ onNavigate, assessmentData, updateAssessmentData }: SampleSelectionProps) {
  const [formData, setFormData] = useState({
    numberOfSubmissions: '45',
    numberOfModeratedSubmissions: '5',
    gradesAppropriate: '',
    additionalComments: '',
    isFranchisePartner: false,
    requiresExternalModeration: true,
    selectedModerator: assessmentData.internalModeratorName || ''
  });

  // Use shared student samples from assessmentData (read-only for prototype)
  const studentSamples: StudentSample[] = assessmentData.studentSamples;

  // Recommended sample size: 10% of submissions, min 5, max 15
  const totalSubmissions = parseInt(formData.numberOfSubmissions || '0', 10) || 0;
  const recommendedSampleCount = Math.min(15, Math.max(5, Math.round(totalSubmissions * 0.1)));
  const currentSampleCount = studentSamples.length;

  // Moderator dropdown options
  const moderators = [
    'Select a moderator...',
    'Dr. Sarah Johnson',
    'Prof. Michael Chen',
    'Dr. Emily Williams',
    'Dr. James Anderson',
    'Prof. Rebecca Taylor',
    'Dr. David Miller'
  ];

  const handleSendToModerator = () => {
    if (!formData.selectedModerator || formData.selectedModerator === 'Select a moderator...') {
      alert('Please select a moderator before sending.');
      return;
    }
    
    if (confirm('Are you sure you want to send this Sample Selection form to the Internal Moderator? They will be notified by email.')) {
      // Update the shared state with the selected moderator
      updateAssessmentData({
        internalModeratorName: formData.selectedModerator
      });
      alert('Sample Selection form has been sent to the Internal Moderator. They have been notified by email.');
      // Navigate to Internal Moderation page
      onNavigate('internal-moderation');
    }
  };

  const handleDownloadPDF = () => {
    alert('Downloading Sample Selection form as PDF...\n\nIn a production environment, this would generate and download a PDF of the sample selection form.');
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
              className="py-4 text-[#0066cc] hover:text-[#004499] border-b-2 border-[#0066cc]"
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
        <div className="bg-white border border-gray-300 rounded p-8">
          <h1 className="text-center text-2xl mb-4">Sample Selection</h1>
          
          {/* Note about Sample Selection */}
          <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This is for module leader sample selection following grading. 
              Please select representative student samples before sending to the Internal Moderator for review.
            </p>
          </div>

          {/* Module Information Section */}
          <div className="space-y-4 mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Module Information</h2>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Module Title:</label>
              <input
                type="text"
                value={assessmentData.moduleTitle}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Module Code:</label>
              <input
                type="text"
                value={assessmentData.moduleCode}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Module Leader:</label>
              <input
                type="text"
                value={assessmentData.moduleLeader}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Level:</label>
              <input
                type="text"
                value={assessmentData.level}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Academic Year:</label>
              <input
                type="text"
                value={assessmentData.academicYear}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Semester:</label>
              <input
                type="text"
                value={assessmentData.semester}
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

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Franchise Partner:</label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isFranchisePartner}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData({ ...formData, isFranchisePartner: checked });
                    // Persist to shared state so Internal Moderation routes correctly
                    updateAssessmentData({ isFranchisePartner: checked });
                  }}
                />
                <span className="text-sm">This module is for a Franchise Partner</span>
              </label>
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">External Moderation Required:</label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.requiresExternalModeration}
                  onChange={(e) => setFormData({ ...formData, requiresExternalModeration: e.target.checked })}
                />
                <span className="text-sm">Requires external moderation (All levels except normal undergraduate first year)</span>
              </label>
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Select Internal Moderator:</label>
              <select
                value={formData.selectedModerator}
                onChange={(e) => {
                  setFormData({ ...formData, selectedModerator: e.target.value });
                  updateAssessmentData({ internalModeratorName: e.target.value });
                }}
                className="border border-gray-300 px-3 py-2 bg-gray-200"
              >
                {moderators.map((moderator) => (
                  <option key={moderator} value={moderator}>{moderator}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Sample Section */}
          <div className="mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Student Names/Numbers & Grades of Moderated Sample</h2>
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm">
                <strong>Note:</strong> Internal moderation samples must be properly representative and include borderline cases between each grade band. 
                The sample size must represent 10% of submissions which should not be more than 15 or less than 5 (or all assignments if less than 5) assignments for large or small modules.
              </p>
              <p className="text-sm mt-2">
                <strong>Recommendation:</strong> For {totalSubmissions || '0'} submissions, select <strong>{recommendedSampleCount}</strong> samples.
                Currently selected: <strong>{currentSampleCount}</strong>.
              </p>
              {currentSampleCount !== recommendedSampleCount && (
                <div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm text-yellow-800">
                    Consider adjusting the sample count to match the recommendation (10% with bounds 5–15) and ensure stratified coverage across bottom, middle, and top performers.
                  </p>
                </div>
              )}
            </div>
            
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

          {/* Action Buttons */}
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="flex justify-center">
              {/* Send to Internal Moderator */}
              <div className="text-center">
                <button
                  onClick={handleSendToModerator}
                  className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Send to Internal Moderator
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  Send this sample selection to the Internal Moderator for review and sign-off.
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
            Sample Selection
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