import { useState } from 'react';
import { HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { AssessmentData, StudentSample } from '../App';

interface SolentModeratorFranchisePartnerSignOffProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
  onViewChange?: (view: 'moderator-view' | 'franchise-partner-sign-off' | 'ml-sent-back' | 'ml-signed-off') => void;
}

export function SolentModeratorFranchisePartnerSignOff({ 
  onNavigate, 
  assessmentData, 
  updateAssessmentData, 
  onViewChange 
}: SolentModeratorFranchisePartnerSignOffProps) {
  const [formData, setFormData] = useState({
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
    solentModeratorComments: assessmentData.solentModeratorComments || '',
    franchisePartnerName: assessmentData.franchisePartnerName || 'Franchise Partner Moderator',
    franchisePartnerDate: assessmentData.franchisePartnerDate || new Date().toISOString().split('T')[0],
    requiresExternalModeration: true
  });

  // Use shared student samples from assessmentData (read-only for prototype)
  const studentSamples: StudentSample[] = assessmentData.studentSamples;

  const handleSignOffOk = () => {
    if (confirm('Are you sure you want to sign off this moderation? This will send the form to the External Examiner and record your comments.')) {
      updateAssessmentData({
        internalModerationStatus: 'sent-to-external',
        solentModeratorComments: formData.solentModeratorComments
      });
      alert('Solent Moderator has signed off. The External Examiner has been notified by email.');
      onNavigate('feedback');
    }
  };

  const handleSendBackToFranchiseML = () => {
    if (confirm('Are you sure you want to send this back to the Franchise Partner Module Leader for clarification? They will be notified by email.')) {
      updateAssessmentData({ solentModeratorComments: formData.solentModeratorComments });
      alert('The form has been sent back to the Franchise Partner Module Leader for clarification.');
      onViewChange?.('ml-sent-back');
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
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* View Toggle Buttons */}
        <div className="mb-6 bg-white border border-gray-300 rounded p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm mr-2">View:</span>
            <button
              onClick={() => onViewChange?.('moderator-view')}
              className={`px-4 py-2 rounded transition-colors ${
                'moderator-view' === 'franchise-partner-sign-off'
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Internal Moderator View
            </button>
            <button
              onClick={() => onViewChange?.('ml-sent-back')}
              className={`px-4 py-2 rounded transition-colors ${
                'ml-sent-back' === 'franchise-partner-sign-off'
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ML: Sent Back for Clarification
            </button>
            <button
              onClick={() => onViewChange?.('franchise-partner-sign-off')}
              className={`px-4 py-2 rounded transition-colors ${
                true
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ⭐ Solent Moderator Franchise Partner Sign Off
            </button>
            <button
              onClick={() => onViewChange?.('ml-signed-off')}
              className={`px-4 py-2 rounded transition-colors ${
                'ml-signed-off' === 'franchise-partner-sign-off'
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ML: Signed Off
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Page Title and Status */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Solent Moderator Franchise Partner Sign Off</h2>
              <p className="text-gray-600">Module: {formData.moduleCode} - {formData.moduleTitle}</p>
              <p className="text-sm text-gray-500 mt-1">Academic Year: {formData.academicYear} | Semester: {formData.semester}</p>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <div className="flex items-center gap-2 text-yellow-800">
                <CheckCircle className="text-yellow-600" size={20} />
                <span className="font-semibold">Awaiting Solent Moderator decision</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">Review and either sign off or send back to the franchise partner module leader.</p>
            </div>
          </div>

          {/* Module Information Section */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <HelpCircle size={18} className="text-blue-600" />
              Module Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Module Code</label>
                <p className="text-gray-800 font-semibold">{formData.moduleCode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Module Leader</label>
                <p className="text-gray-800 font-semibold">{formData.moduleLeader}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <p className="text-gray-800 font-semibold">{formData.level}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Academic Year</label>
                <p className="text-gray-800 font-semibold">{formData.academicYear}</p>
              </div>
            </div>
          </section>

          {/* Student Samples Section */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Samples Moderated</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border-b border-gray-200 p-3 text-left font-semibold text-gray-700">Student Name</th>
                    <th className="border-b border-gray-200 p-3 text-left font-semibold text-gray-700">Grade</th>
                    <th className="border-b border-gray-200 p-3 text-left font-semibold text-gray-700">Work Link</th>
                  </tr>
                </thead>
                <tbody>
                  {studentSamples.length > 0 ? (
                    studentSamples.map((sample) => (
                      <tr key={sample.id} className="hover:bg-gray-50">
                        <td className="border-b border-gray-200 p-3 text-gray-800">{sample.firstName}</td>
                        <td className="border-b border-gray-200 p-3 text-gray-800 font-semibold">{sample.grade}</td>
                        <td className="border-b border-gray-200 p-3">
                          <a href={sample.workLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            View Work
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="border-b border-gray-200 p-3 text-center text-gray-500">
                        No student samples selected
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Moderation Comments Section */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Moderation Assessment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Are the grades and feedback comments appropriate?</label>
                <div className="bg-gray-50 p-4 rounded border border-gray-200 text-gray-800">
                  {formData.gradesAppropriate}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Moderator Comments</label>
                <div className="bg-gray-50 p-4 rounded border border-gray-200 text-gray-800">
                  {formData.moderatorComments}
                </div>
              </div>
            </div>
          </section>

          {/* Franchise Partner Sign Off Section */}
          <section className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Solent Moderator Final Compliance Moderation</h3>
            <p className="text-sm text-gray-600 mb-4">
              The Solent Moderator performs a final moderation check on the franchise partner’s grading and moderation process to ensure compliance.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Solent Moderator Name</label>
                <select
                  value={formData.franchisePartnerName}
                  onChange={(e) => setFormData({ ...formData, franchisePartnerName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded bg-white"
                >
                  <option value="">Select Solent Moderator</option>
                  <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                  <option value="Dr. Jane Smith">Dr. Jane Smith</option>
                  <option value="Dr. Alex Turner">Dr. Alex Turner</option>
                  <option value="Dr. Priya Patel">Dr. Priya Patel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.franchisePartnerDate}
                  onChange={(e) => setFormData({ ...formData, franchisePartnerDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Solent Moderator Comments</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                placeholder="Add compliance/moderation comments..."
                value={formData.solentModeratorComments}
                onChange={(e) => setFormData({ ...formData, solentModeratorComments: e.target.value })}
              />
            </div>
          </section>

          {/* Action Buttons */}
          <section className="flex gap-4 justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleSendBackToFranchiseML}
                className="px-6 py-2 border border-orange-300 text-orange-700 rounded hover:bg-orange-50 font-medium"
              >
                Send Back to Franchise Partner Module Leader
              </button>
            </div>
            <button
              onClick={handleSignOffOk}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium flex items-center gap-2"
            >
              Sign Off – Everything is OK
              <ArrowRight size={18} />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
