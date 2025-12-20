import { useState } from 'react';
import { HelpCircle, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { AssessmentData, StudentSample } from '../App';
import { InternalModerationMLSentBack } from './InternalModerationMLSentBack';
import { InternalModerationMLSignedOff } from './InternalModerationMLSignedOff';
import { SolentModeratorFranchisePartnerSignOff } from './SolentModeratorFranchisePartnerSignOff';

interface InternalModerationProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
}

export function InternalModeration({ onNavigate, assessmentData, updateAssessmentData }: InternalModerationProps) {
  const [currentView, setCurrentView] = useState<'moderator-view' | 'franchise-partner-sign-off' | 'ml-sent-back' | 'ml-signed-off'>('moderator-view');
  
  const [formData, setFormData] = useState({
    moduleTitle: assessmentData.moduleTitle,
    moduleCode: assessmentData.moduleCode,
    moduleLeader: assessmentData.moduleLeader,
    level: assessmentData.level,
    academicYear: assessmentData.academicYear,
    semester: assessmentData.semester,
    numberOfSubmissions: '45',
    numberOfModeratedSubmissions: '5',
    gradesAppropriate: '',
    additionalComments: '',
    moduleLeaderResponse: '',
    internalModeratorName: '',
    internalModeratorDate: '',
    moduleLeaderSignName: '',
    moduleLeaderSignDate: '',
    franchisePartnerName: assessmentData.franchisePartnerName || '',
    franchisePartnerDate: assessmentData.franchisePartnerDate || '',
    isFranchisePartner: false,
    requiresExternalModeration: true
  });

  // Use shared student samples from assessmentData (read-only for prototype)
  const studentSamples: StudentSample[] = assessmentData.studentSamples;

  const [moderationStatus, setModerationStatus] = useState<'draft' | 'sent-to-moderator' | 'sent-back' | 'moderator-approved' | 'sent-to-external'>('sent-to-moderator');
  const [moderatorComments, setModeratorComments] = useState('');
  
  // If view is ML-specific or Franchise Partner-specific, render those components AFTER all hooks
  if (currentView === 'franchise-partner-sign-off') {
    return <SolentModeratorFranchisePartnerSignOff onNavigate={onNavigate} assessmentData={assessmentData} updateAssessmentData={updateAssessmentData} onViewChange={setCurrentView} />;
  }
  
  if (currentView === 'ml-sent-back') {
    return <InternalModerationMLSentBack onNavigate={onNavigate} assessmentData={assessmentData} updateAssessmentData={updateAssessmentData} onViewChange={setCurrentView} />;
  }
  
  if (currentView === 'ml-signed-off') {
    return <InternalModerationMLSignedOff onNavigate={onNavigate} assessmentData={assessmentData} updateAssessmentData={updateAssessmentData} onViewChange={setCurrentView} />;
  }

  const handleSendToModerator = () => {
    if (!formData.gradesAppropriate) {
      alert('Please complete the "Are the grades and feedback comments appropriate?" field before sending to the moderator.');
      return;
    }
    
    if (confirm('Are you sure you want to send this Internal Moderation form to the Internal Moderator? They will be notified by email.')) {
      alert('Internal Moderation form has been sent to the Internal Moderator. They have been notified by email.');
      setModerationStatus('sent-to-moderator');
    }
  };

  const handleModeratorSignOff = () => {
    if (!formData.internalModeratorName || !formData.internalModeratorDate) {
      alert('Please complete the Internal Moderator signature fields (Name and Date) before signing off.');
      return;
    }
    
    if (formData.isFranchisePartner && (!formData.franchisePartnerName || !formData.franchisePartnerDate)) {
      alert('Please complete the Franchise Partner signature fields before signing off.');
      return;
    }
    
    if (confirm('Are you sure you want to sign off this Internal Moderation?' + (formData.isFranchisePartner ? ' This will route to the Solent Moderator Franchise Partner for final approval.' : ' The Module Leader will be notified by email.'))) {
      if (formData.isFranchisePartner) {
        alert('Internal Moderation has been signed off by the Internal Moderator. Routing to Solent Moderator Franchise Partner for final approval.');
        setModerationStatus('moderator-approved');
        setCurrentView('franchise-partner-sign-off');
      } else {
        alert('Internal Moderation has been signed off. The Module Leader will be notified by email.');
        setModerationStatus('moderator-approved');
        setCurrentView('ml-signed-off');
      }
    }
  };

  const handleModeratorSendBack = () => {
    if (!moderatorComments) {
      alert('Please provide comments before sending back to the Module Leader.');
      return;
    }
    
    if (confirm('Are you sure you want to send this back to the Module Leader? They will be notified by email with your comments.')) {
      alert('Internal Moderation has been sent back to the Module Leader with your comments. They have been notified by email.');
      setFormData({ ...formData, additionalComments: moderatorComments });
      setModerationStatus('sent-back');
      setCurrentView('ml-sent-back');
    }
  };

  const handleModuleLeaderResubmit = () => {
    if (!formData.moduleLeaderResponse) {
      alert('Please provide a response to the moderator\'s comments before resubmitting.');
      return;
    }
    
    if (confirm('Are you sure you want to resubmit this to the Internal Moderator? They will be notified by email that you have actioned their comments.')) {
      alert('Internal Moderation has been resubmitted to the Internal Moderator. They have been notified by email.');
      setModerationStatus('sent-to-moderator');
    }
  };

  const handleSendToExternalExaminer = () => {
    if (!formData.moduleLeaderSignName || !formData.moduleLeaderSignDate) {
      alert('Please complete the Module Leader signature fields before sending to External Examiner.');
      return;
    }

    if (formData.isFranchisePartner && (!formData.franchisePartnerName || !formData.franchisePartnerDate)) {
      alert('Please complete the Franchise Partner signature fields before sending to External Examiner.');
      return;
    }
    
    const levelInfo = formData.requiresExternalModeration 
      ? 'This module requires external moderation.'
      : 'Note: Normal undergraduate first year modules do not typically require external moderation. Please confirm you want to proceed.';
    
    if (confirm(`${levelInfo}\n\nAre you sure you want to send this to the External Examiner? They will be notified by email.`)) {
      alert('Internal Moderation form has been sent to the External Examiner. They have been notified by email.');
      setModerationStatus('sent-to-external');
    }
  };

  const handleCompleteNoExternal = () => {
    if (!formData.moduleLeaderSignName || !formData.moduleLeaderSignDate) {
      alert('Please complete the Module Leader signature fields before completing the process.');
      return;
    }
    // If franchise partner is selected, ensure their signature is present
    if (formData.isFranchisePartner && (!formData.franchisePartnerName || !formData.franchisePartnerDate)) {
      alert('Please complete the Solent Moderator (Franchise Partner) signature fields before completing the process.');
      return;
    }
    alert('Internal Moderation process completed. External moderation is not required for this module.');
    updateAssessmentData({ internalModerationComplete: true });
  };

  const handleDownloadPDF = () => {
    alert('Downloading Internal Moderation form as PDF...\n\nIn a production environment, this would generate and download a PDF of the moderation form.');
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
              onClick={() => setCurrentView('moderator-view')}
              className={`px-4 py-2 rounded transition-colors ${
                currentView === 'moderator-view'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Internal Moderator View
            </button>
            <button
              onClick={() => setCurrentView('ml-sent-back')}
              className={`px-4 py-2 rounded transition-colors ${
                currentView === 'ml-sent-back'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ML: Sent Back for Clarification
            </button>
              <button
                onClick={() => setCurrentView('franchise-partner-sign-off')}
                className={`px-4 py-2 rounded transition-colors ${
                  currentView === 'franchise-partner-sign-off'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ⭐ Solent Moderator Franchise Partner Sign Off
              </button>
            <button
              onClick={() => setCurrentView('ml-signed-off')}
              className={`px-4 py-2 rounded transition-colors ${
                currentView === 'ml-signed-off'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ML: Signed Off
            </button>
          </div>
        </div>

        {/* Status Banners */}
        {moderationStatus === 'sent-to-moderator' && (
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-blue-800 mb-2">Awaiting Internal Moderator Review</h3>
                <p className="text-sm text-blue-700">
                  This Internal Moderation form has been sent to the Internal Moderator for review. They have been notified by email.
                </p>
              </div>
            </div>
          </div>
        )}

        {moderationStatus === 'sent-back' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-6 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-yellow-800 mb-2">Action Required - Sent Back by Moderator</h3>
                <p className="text-sm text-yellow-700 mb-3">
                  The Internal Moderator has sent this form back with comments. Please review the comments below, make any necessary changes, and provide your response.
                </p>
                {formData.additionalComments && (
                  <div className="bg-white p-4 rounded border border-yellow-200">
                    <p className="text-sm mb-1"><strong>Moderator Comments:</strong></p>
                    <p className="text-sm text-gray-700">{formData.additionalComments}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {moderationStatus === 'moderator-approved' && (
          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-green-800 mb-2">Internal Moderation Approved</h3>
                <p className="text-sm text-green-700">
                  The Internal Moderator has approved this moderation. You can now send it to the External Examiner.
                </p>
              </div>
            </div>
          </div>
        )}

        {moderationStatus === 'sent-to-external' && (
          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-6 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-purple-800 mb-2">Sent to External Examiner</h3>
                <p className="text-sm text-purple-700">
                  This Internal Moderation form has been sent to the External Examiner. They have been notified by email.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-300 rounded p-8">
          <h1 className="text-center text-2xl mb-8">Internal Moderation Form</h1>

          {/* Module Information Section */}
          <div className="space-y-4 mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Module Information</h2>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Module Title:</label>
              <input
                type="text"
                value={formData.moduleTitle}
                onChange={(e) => setFormData({ ...formData, moduleTitle: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Module Code:</label>
              <input
                type="text"
                value={formData.moduleCode}
                onChange={(e) => setFormData({ ...formData, moduleCode: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Module Leader:</label>
              <input
                type="text"
                value={formData.moduleLeader}
                onChange={(e) => setFormData({ ...formData, moduleLeader: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Level:</label>
              <input
                type="text"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Academic Year:</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Semester:</label>
              <input
                type="text"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
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
                    updateAssessmentData({ isFranchisePartner: checked });
                  }}
                />
                <span className="text-sm">This module is for a Franchise Partner</span>
              </label>
            </div>

            {formData.isFranchisePartner && (
              <div className="grid grid-cols-[250px_1fr] gap-4 items-start bg-yellow-50 p-4 rounded border-l-4 border-yellow-400 mb-4">
                <div></div>
                <div className="text-sm text-yellow-800">
                  <strong>⭐ Franchise Partner Module Selected:</strong> After Internal Moderator sign-off, the workflow routes to the <strong>Solent Moderator Final Compliance Moderation</strong> view. The Solent Moderator performs a final moderation check on the franchise partner’s grading and moderation process to ensure compliance.
                </div>
              </div>
            )}

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
          </div>

          {/* Student Sample Section */}
          <div className="mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Student Names/Numbers & Grades of Moderated Sample</h2>
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm">
                <strong>Note:</strong> Internal moderation samples must be properly representative and include borderline cases between each grade band. 
                The sample size must represent 10% of submissions which should not be more than 15 or less than 5 (or all assignments if less than 5) assignments for large or small modules.
              </p>
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

          {/* Moderation Questions Section */}
          <div className="space-y-4 mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Moderation Review</h2>

            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Are the grades and feedback comments appropriate?</label>
              <textarea
                value={formData.gradesAppropriate}
                onChange={(e) => setFormData({ ...formData, gradesAppropriate: e.target.value })}
                className="w-full h-32 p-3 border border-gray-300 bg-gray-100"
                placeholder="Please provide your assessment of whether the grades and feedback comments are appropriate..."
                disabled={moderationStatus === 'sent-to-moderator' || moderationStatus === 'sent-to-external'}
              />
            </div>

            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-right pt-2">Additional comments for consideration/action:</label>
              <textarea
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                className="w-full h-32 p-3 border border-gray-300 bg-gray-100"
                placeholder="Provide any additional comments, concerns, or actions required..."
              />
            </div>

            {moderationStatus === 'sent-back' && (
              <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
                <label className="text-right pt-2">Module Leader response (if required):</label>
                <textarea
                  value={formData.moduleLeaderResponse}
                  onChange={(e) => setFormData({ ...formData, moduleLeaderResponse: e.target.value })}
                  className="w-full h-32 p-3 border border-gray-300 bg-yellow-50 border-yellow-300"
                  placeholder="Provide your response to the moderator's comments and detail any actions taken..."
                />
              </div>
            )}

            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-800">
                <strong>Important:</strong> If the actions identified result in changes to grades/marks, it is the module leader's responsibility to ensure the correct marks are uploaded.
              </p>
            </div>
          </div>

          {/* Sign-off Section */}
          <div className="mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Grade/Marks Agreement & Sign-off</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 p-2 text-left w-1/3">Grade/marks agreed</th>
                    <th className="border border-gray-400 p-2 text-left w-1/3">Name</th>
                    <th className="border border-gray-400 p-2 text-left w-1/3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2">Signed Internal Moderator</td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="text"
                        value={formData.internalModeratorName}
                        onChange={(e) => setFormData({ ...formData, internalModeratorName: e.target.value })}
                        className="w-full p-2 border border-gray-300 bg-gray-100"
                        placeholder="Enter name"
                        disabled={moderationStatus !== 'sent-to-moderator'}
                      />
                    </td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="date"
                        value={formData.internalModeratorDate}
                        onChange={(e) => setFormData({ ...formData, internalModeratorDate: e.target.value })}
                        className="w-full p-2 border border-gray-300 bg-gray-100"
                        disabled={moderationStatus !== 'sent-to-moderator'}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">Signed Module Leader</td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="text"
                        value={formData.moduleLeaderSignName}
                        onChange={(e) => setFormData({ ...formData, moduleLeaderSignName: e.target.value })}
                        className="w-full p-2 border border-gray-300 bg-gray-100"
                        placeholder="Enter name"
                        disabled={moderationStatus === 'sent-to-external'}
                      />
                    </td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="date"
                        value={formData.moduleLeaderSignDate}
                        onChange={(e) => setFormData({ ...formData, moduleLeaderSignDate: e.target.value })}
                        className="w-full p-2 border border-gray-300 bg-gray-100"
                        disabled={moderationStatus === 'sent-to-external'}
                      />
                    </td>
                  </tr>
                  <tr className={formData.isFranchisePartner ? "bg-yellow-100" : "bg-gray-50"}>
                    <td className={`border border-gray-400 p-2 font-semibold ${formData.isFranchisePartner ? "text-yellow-900" : "text-gray-500"}`}>
                      ⭐ Signed Solent Moderator Franchise Partners ONLY
                    </td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="text"
                        value={formData.franchisePartnerName}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setFormData({ ...formData, franchisePartnerName: newValue });
                          updateAssessmentData({ franchisePartnerName: newValue });
                        }}
                        className="w-full p-2 border border-gray-300 bg-gray-100"
                        placeholder="Enter name"
                        disabled={!formData.isFranchisePartner || moderationStatus === 'sent-to-external'}
                      />
                    </td>
                    <td className="border border-gray-400 p-2">
                      <input
                        type="date"
                        value={formData.franchisePartnerDate}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setFormData({ ...formData, franchisePartnerDate: newValue });
                          updateAssessmentData({ franchisePartnerDate: newValue });
                        }}
                        className="w-full p-2 border border-gray-300 bg-gray-100"
                        disabled={!formData.isFranchisePartner || moderationStatus === 'sent-to-external'}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Internal Moderator Actions (when status is sent-to-moderator) */}
          {moderationStatus === 'sent-to-moderator' && (
            <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded">
              <h3 className="text-blue-800 mb-4">Internal Moderator Actions</h3>
              <p className="text-sm text-blue-700 mb-4">
                As the Internal Moderator, you can either sign off this moderation or request clarification from the Module Leader.
              </p>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm">Comments for Module Leader (required if requesting clarification):</label>
                <textarea
                  value={moderatorComments}
                  onChange={(e) => setModeratorComments(e.target.value)}
                  className="w-full h-32 p-3 border border-blue-300 bg-white"
                  placeholder="Enter any comments, questions, or concerns that need clarification or action from the Module Leader..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleModeratorSignOff}
                  className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Sign Off Moderation
                </button>
                <button
                  onClick={handleModeratorSendBack}
                  className="px-6 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                >
                  Request Clarification from Module Leader
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="flex flex-col items-center gap-4">
              {/* Module Leader: Send to Moderator */}
              {moderationStatus === 'draft' && (
                <div className="text-center">
                  <button
                    onClick={handleSendToModerator}
                    className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Send to Internal Moderator
                  </button>
                  <p className="text-sm text-gray-600 mt-2">
                    Send this form to the Internal Moderator for review and sign-off.
                  </p>
                </div>
              )}

              {/* Module Leader: Resubmit after sent back */}
              {moderationStatus === 'sent-back' && (
                <div className="text-center">
                  <button
                    onClick={handleModuleLeaderResubmit}
                    className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Resubmit to Internal Moderator
                  </button>
                  <p className="text-sm text-gray-600 mt-2">
                    Resubmit this form after addressing the moderator's comments.
                  </p>
                </div>
              )}

              {/* Module Leader: Send to External Examiner */}
              {moderationStatus === 'moderator-approved' && (
                <div className="text-center">
                  {formData.requiresExternalModeration ? (
                    <>
                      <button
                        onClick={handleSendToExternalExaminer}
                        className="px-8 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                      >
                        Send to External Examiner
                      </button>
                      <p className="text-sm text-gray-600 mt-2">
                        Send this approved moderation to the External Examiner for review.
                      </p>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleCompleteNoExternal}
                        className="px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Complete Process (No External Moderation)
                      </button>
                      <p className="text-sm text-yellow-700 mt-2">
                        External moderation is not required. Complete the process once sign-offs are in place.
                      </p>
                    </>
                  )}
                </div>
              )}

              {/* Download PDF - always available */}
              <div className="text-center">
                <button
                  onClick={handleDownloadPDF}
                  className="px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  <Download className="inline w-4 h-4 mr-2" />
                  Download as PDF
                </button>
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