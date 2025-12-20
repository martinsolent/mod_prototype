import { useState } from 'react';
import { HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { AssessmentData, StudentSample } from '../App';

interface InternalModerationMLSignedOffProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
  onViewChange?: (view: 'moderator-view' | 'franchise-partner-sign-off' | 'ml-sent-back' | 'ml-signed-off') => void;
}

export function InternalModerationMLSignedOff({ onNavigate, assessmentData, updateAssessmentData, onViewChange }: InternalModerationMLSignedOffProps) {
  const [formData] = useState({
    moduleTitle: assessmentData.moduleTitle,
    moduleCode: assessmentData.moduleCode,
    moduleLeader: assessmentData.moduleLeader,
    level: assessmentData.level,
    academicYear: assessmentData.academicYear,
    semester: assessmentData.semester,
    numberOfSubmissions: '45',
    numberOfModeratedSubmissions: '5',
    gradesAppropriate: 'The grades are appropriate and consistent with the learning outcomes. Feedback provided is clear, constructive, and supports student learning. The marking is fair and equitable across all submissions.',
    moderatorComments: 'All samples reviewed are of good quality. The marking is consistent and feedback is appropriate. No further action required.',
    internalModeratorName: assessmentData.internalModeratorName || 'Dr. Sarah Johnson',
    internalModeratorDate: '2024-12-15',
    moduleLeaderSignName: 'Dr. Jane Smith',
    moduleLeaderSignDate: '2024-12-16',
    franchisePartnerName: assessmentData.franchisePartnerName || '',
    franchisePartnerDate: assessmentData.franchisePartnerDate || '',
    isFranchisePartner: assessmentData.isFranchisePartner || false,
    solentModeratorCompleted: assessmentData.solentModeratorCompleted || false,
    requiresExternalModeration: true
  });

  // Use shared student samples from assessmentData (read-only for prototype)
  const studentSamples: StudentSample[] = assessmentData.studentSamples;

  const handleSendToExternalExaminer = () => {
    // Check if Solent Moderator sign-off is required but not completed
    if (formData.isFranchisePartner && !formData.solentModeratorCompleted) {
      alert('Cannot send to External Examiner: Solent Moderator Franchise Partner sign-off is required but has not been completed. Please ensure the Solent Moderator completes their review and approval.');
      return;
    }
    
    if (confirm('Are you sure you want to send this approved Internal Moderation to the External Examiner? They will be notified by email.')) {
      updateAssessmentData({
        internalModerationStatus: 'sent-to-external'
      });
      alert('Internal Moderation has been sent to the External Examiner. They have been notified by email.');
      onNavigate('feedback');
    }
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
              onClick={() => onViewChange?.('ml-sent-back')}
              className="px-4 py-2 rounded transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              ML: Sent Back for Clarification
            </button>
            <button
              onClick={() => onViewChange?.('franchise-partner-sign-off')}
              className="px-4 py-2 rounded transition-colors bg-orange-600 text-white"
            >
              ⭐ Solent Moderator Franchise Partner Sign Off
            </button>
            <button
              className="px-4 py-2 rounded transition-colors bg-green-600 text-white"
            >
              ML: Signed Off
            </button>
          </div>
        </div>

        {/* Status Banner - Green for Approved */}
        <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-green-800 mb-2">✓ Internal Moderation Approved</h3>
              <p className="text-sm text-green-700">
                The Internal Moderator has approved this moderation. This form is now ready to be sent to the External Examiner.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded p-8">
          <h1 className="text-center text-2xl mb-8">Internal Moderation Form - Approved</h1>

          {/* Module Information Section */}
          <div className="space-y-4 mb-8">
            <h2 className="bg-green-100 px-4 py-2 mb-4 text-green-900">Module Information</h2>

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
            <h2 className="bg-green-100 px-4 py-2 mb-4 text-green-900">Student Names/Numbers & Grades of Moderated Sample</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-green-50">
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
            <h2 className="bg-green-100 px-4 py-2 mb-4 text-green-900">Moderation Review</h2>

            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Are the grades and feedback comments appropriate?</label>
              <div className="w-full p-3 border border-green-300 bg-green-50 rounded">
                <p className="text-sm text-gray-700">{formData.gradesAppropriate}</p>
              </div>
            </div>

            {/* Moderator Comments - Highlighted in Green */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Internal Moderator Comments:</label>
              <div className="w-full p-4 border-2 border-green-400 bg-green-50 rounded">
                <p className="text-sm mb-1"><strong className="text-green-900">✓ Moderator Approval:</strong></p>
                <p className="text-sm text-gray-800">{formData.moderatorComments}</p>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-300 rounded">
              <p className="text-sm text-green-800">
                <strong>✓ Approved:</strong> This moderation has been approved by the Internal Moderator and is ready to proceed to the External Examiner.
              </p>
            </div>
          </div>

          {/* Sign-off Section - Read Only with Green Accents */}
          <div className="mb-8">
            <h2 className="bg-green-100 px-4 py-2 mb-4 text-green-900">Grade/Marks Agreement & Sign-off</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-green-50">
                    <th className="border border-gray-400 p-2 text-left w-1/3">Grade/marks agreed</th>
                    <th className="border border-gray-400 p-2 text-left w-1/3">Name</th>
                    <th className="border border-gray-400 p-2 text-left w-1/3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="border border-gray-400 p-2">
                      <strong>✓ Signed Internal Moderator</strong>
                    </td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="text"
                        value={formData.internalModeratorName}
                        className="w-full p-2 border border-green-300 bg-green-50"
                        readOnly
                      />
                    </td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="text"
                        value={formData.internalModeratorDate}
                        className="w-full p-2 border border-green-300 bg-green-50"
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-400 p-2">
                      <strong>✓ Signed Module Leader</strong>
                    </td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="text"
                        value={formData.moduleLeaderSignName}
                        className="w-full p-2 border border-green-300 bg-green-50"
                        readOnly
                      />
                    </td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="text"
                        value={formData.moduleLeaderSignDate}
                        className="w-full p-2 border border-green-300 bg-green-50"
                        readOnly
                      />
                    </td>
                  </tr>
                  {formData.isFranchisePartner && (
                  <tr className={formData.solentModeratorCompleted ? "bg-green-50" : "bg-yellow-100"}>
                    <td className={`border border-gray-400 p-2 font-semibold ${formData.isFranchisePartner ? (formData.solentModeratorCompleted ? "text-green-900" : "text-yellow-900") : "text-gray-500"}`}>
                      {formData.solentModeratorCompleted ? "✓ Signed Solent Moderator Franchise Partners" : "⭐ Signed Solent Moderator Franchise Partners ONLY"}
                    </td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="text"
                        value={formData.franchisePartnerName}
                        className="w-full p-2 border border-gray-300 bg-gray-100"
                        readOnly
                      />
                    </td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="text"
                        value={formData.franchisePartnerDate}
                        className="w-full p-2 border border-gray-300 bg-gray-100"
                        readOnly
                      />
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Button */}
          <div className="border-t-2 border-gray-300 pt-6">
            {formData.isFranchisePartner && !formData.solentModeratorCompleted && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Pending Solent Moderator Approval:</strong> This is a Franchise Partner module. The Solent Moderator must complete their compliance check and sign-off before you can send this to the External Examiner.
                </p>
              </div>
            )}
            <div className="flex justify-center">
              <div className="text-center">
                <button
                  onClick={handleSendToExternalExaminer}
                  disabled={formData.isFranchisePartner && !formData.solentModeratorCompleted}
                  className={`flex items-center gap-2 px-8 py-3 rounded transition-colors ${
                    formData.isFranchisePartner && !formData.solentModeratorCompleted
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <ArrowRight className="w-5 h-5" />
                  Send to External Examiner
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  Send this approved moderation to the External Examiner for review.
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