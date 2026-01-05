import { useState } from 'react';
import { HelpCircle, CheckCircle, Download, ChevronDown, ChevronRight } from 'lucide-react';
import { AssessmentData } from '../App';

interface ExternalExaminerCourseLeaderViewProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
  onViewChange?: (view: 'external-examiner' | 'course-leader') => void;
}

export function ExternalExaminerCourseLeaderView({ onNavigate, assessmentData, updateAssessmentData, onViewChange }: ExternalExaminerCourseLeaderViewProps) {
  const [assessmentExpanded, setAssessmentExpanded] = useState(true);
  const [feedbackExpanded, setFeedbackExpanded] = useState(true);

  // Mock completed data
  const completedData = {
    question1: 'yes',
    question2: 'yes',
    question3: 'yes',
    comments: 'I have reviewed all student samples and the internal moderation documentation. The assessment is well-designed and appropriately challenging for the level. The marking is consistent and fair across all samples reviewed.\n\nThe feedback provided to students is constructive and detailed, clearly explaining how grades were awarded. The standards achieved by students are comparable to similar programmes at other UK institutions.\n\nThe internal moderation process has been thorough, and I am satisfied that the assessment process has been conducted to a high standard. No concerns or recommendations for improvement at this time.',
    externalExaminerName: 'Prof. Michael Thompson',
    externalExaminerDate: '2024-12-17',
    submittedDate: '17th December 2024'
  };

  const handleDownloadPDF = () => {
    alert('Downloading Complete External Examiner Report as PDF...\n\nIn a production environment, this would generate and download a comprehensive PDF including all assessment documentation, internal moderation records, and external examiner feedback.');
  };

  const handleAcknowledge = () => {
    if (confirm('Are you sure you want to acknowledge receipt of this External Examiner report? This will mark the assessment process as complete.')) {
      updateAssessmentData({
        externalExaminerCompleted: true
      });
      alert('External Examiner report acknowledged. The assessment workflow is now complete.');
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
              className="py-4 text-[#0066cc] hover:text-[#004499]"
            >
              Internal Moderation
            </button>
            <button 
              onClick={() => onNavigate('feedback')}
              className="py-4 text-[#0066cc] hover:text-[#004499] border-b-2 border-[#0066cc]"
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
              onClick={() => onViewChange?.('external-examiner')}
              className="px-4 py-2 rounded transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              External Examiner View
            </button>
            <button
              className="px-4 py-2 rounded transition-colors bg-blue-600 text-white"
            >
              Module Leader: Completed Report
            </button>
          </div>
        </div>

        {/* Status Banner - Green for Completed */}
        <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-green-800 mb-2">✓ External Examiner Report Completed</h3>
              <p className="text-sm text-green-700">
                The External Examiner has submitted their report on {completedData.submittedDate}. The assessment workflow is complete. 
                You can download the complete report as PDF below.
              </p>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="bg-white border border-gray-300 rounded p-6 mb-6">
          <h1 className="text-center text-2xl">External Examiner Report - Completed</h1>
          <p className="text-center text-sm text-gray-600 mt-2">
            Submitted by {completedData.externalExaminerName} on {completedData.submittedDate}
          </p>
        </div>

        <div className="bg-white border border-gray-300 rounded p-8 mb-6">
          {/* Module Information Section */}
          <div className="mb-8">
            <h2 className="bg-green-100 px-4 py-2 mb-4 text-green-900">Module Information</h2>

            <div className="space-y-4">
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
                  value={assessmentData.numberOfSubmissions}
                  className="border border-gray-300 px-3 py-2 bg-gray-100"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-[250px_1fr] gap-4 items-start">
                <label className="text-right pt-2">Number of Moderated Submissions:</label>
                <input
                  type="text"
                  value={assessmentData.numberOfModeratedSubmissions}
                  className="border border-gray-300 px-3 py-2 bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Student Sample Section */}
          <div className="mb-8">
            <h2 className="bg-green-100 px-4 py-2 mb-4 text-green-900">Student Sample Reviewed by External Examiner</h2>
            
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
                  {assessmentData.studentSamples.map((student, index) => (
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

          {/* Internal Moderation Summary */}
          <div className="mb-8">
            <h2 className="bg-green-100 px-4 py-2 mb-4 text-green-900">Internal Moderation Summary</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
                <label className="text-right pt-2">Internal Moderator Assessment:</label>
                <div className="w-full p-3 border border-gray-300 bg-gray-50 rounded">
                  <p className="text-sm text-gray-700">{assessmentData.gradesAppropriate}</p>
                </div>
              </div>

              {assessmentData.additionalComments && (
                <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
                  <label className="text-right pt-2">Additional Comments:</label>
                  <div className="w-full p-3 border border-gray-300 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">{assessmentData.additionalComments}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Internal Moderation Sign-offs */}
            <div className="mt-6">
              <h3 className="text-sm mb-3">Internal Moderation Sign-offs:</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="border border-gray-400 p-2 text-left w-1/3">Role</th>
                      <th className="border border-gray-400 p-2 text-left w-1/3">Name</th>
                      <th className="border border-gray-400 p-2 text-left w-1/3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-2">Internal Moderator</td>
                      <td className="border border-gray-400 p-2 bg-gray-100">{assessmentData.internalModeratorName}</td>
                      <td className="border border-gray-400 p-2 bg-gray-100">{assessmentData.internalModeratorDate}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2">Module Leader</td>
                      <td className="border border-gray-400 p-2 bg-gray-100">{assessmentData.moduleLeaderSignName}</td>
                      <td className="border border-gray-400 p-2 bg-gray-100">{assessmentData.moduleLeaderSignDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Collapse All Button */}
        <div className="flex justify-end mb-4">
          <button className="text-[#0066cc] hover:text-[#004499]">
            Collapse all
          </button>
        </div>

        {/* Assessment Questions Section */}
        <div className="bg-white border border-gray-300 rounded mb-4">
          <button
            onClick={() => setAssessmentExpanded(!assessmentExpanded)}
            className="w-full flex items-center gap-2 p-4 hover:bg-gray-50"
          >
            {assessmentExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
            <h2>Assessment Questions - External Examiner Responses</h2>
          </button>

          {assessmentExpanded && (
            <div className="px-6 pb-4 bg-green-50">
              {/* Question 1 */}
              <div className="mb-6 p-4 bg-white rounded border border-green-200">
                <p className="text-sm mb-3">
                  <strong>Have you seen samples of completed work for this assessment?</strong>
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question1"
                      value="yes"
                      checked={completedData.question1 === 'yes'}
                      readOnly
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold text-green-700">✓ Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question1"
                      value="no"
                      checked={completedData.question1 === 'no'}
                      readOnly
                      className="w-4 h-4"
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>

              {/* Question 2 */}
              <div className="mb-6 p-4 bg-white rounded border border-green-200">
                <p className="text-sm mb-3">
                  <strong>Were the standards set for the assessment appropriate for their level?</strong>
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question2"
                      value="yes"
                      checked={completedData.question2 === 'yes'}
                      readOnly
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold text-green-700">✓ Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question2"
                      value="no"
                      checked={completedData.question2 === 'no'}
                      readOnly
                      className="w-4 h-4"
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>

              {/* Question 3 */}
              <div className="mb-4 p-4 bg-white rounded border border-green-200">
                <p className="text-sm mb-3">
                  <strong>Were the standards of student performance comparable with similar programmes or subjects in other UK institutions with which you are familiar?</strong>
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question3"
                      value="yes"
                      checked={completedData.question3 === 'yes'}
                      readOnly
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold text-green-700">✓ Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question3"
                      value="no"
                      checked={completedData.question3 === 'no'}
                      readOnly
                      className="w-4 h-4"
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feedback Summary Section */}
        <div className="bg-white border border-gray-300 rounded mb-6">
          <button
            onClick={() => setFeedbackExpanded(!feedbackExpanded)}
            className="w-full flex items-center gap-2 p-4 hover:bg-gray-50"
          >
            {feedbackExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
            <h2>External Examiner Feedback Summary</h2>
          </button>

          {feedbackExpanded && (
            <div className="px-6 pb-6 bg-green-50">
              <div className="mb-4 p-4 bg-white rounded border-2 border-green-300">
                <label className="block text-sm mb-2">
                  <strong>External Examiner Comments:</strong>
                </label>
                <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded">
                  <p className="text-sm text-gray-800 whitespace-pre-line">{completedData.comments}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* External Examiner Sign-off Section */}
        <div className="bg-white border border-gray-300 rounded p-8 mb-6">
          <h2 className="bg-green-100 px-4 py-2 mb-4 text-green-900">External Examiner Sign-off</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-green-50">
                  <th className="border border-gray-400 p-2 text-left w-1/3">Role</th>
                  <th className="border border-gray-400 p-2 text-left w-1/3">Name</th>
                  <th className="border border-gray-400 p-2 text-left w-1/3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-400 p-2">
                    <strong>✓ External Examiner</strong>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      type="text"
                      value={completedData.externalExaminerName}
                      className="w-full p-2 border border-green-300 bg-green-50"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      type="text"
                      value={completedData.externalExaminerDate}
                      className="w-full p-2 border border-green-300 bg-green-50"
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-green-50 border-2 border-green-400 rounded">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <p className="text-green-900">
                <strong>Report Submitted:</strong> {completedData.submittedDate}
              </p>
            </div>
            <p className="text-sm text-green-800">
              The External Examiner has completed their review and submitted this report. The assessment workflow is now complete.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Complete Report as PDF
          </button>
          <button
            onClick={handleAcknowledge}
            className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            Acknowledge Receipt
          </button>
        </div>

        <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800">
            <strong>Assessment Workflow Complete:</strong> All stages from Assessment Brief Creation through External Examiner review have been completed successfully.
          </p>
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
            Reports
          </a>
          <span className="text-gray-400">/</span>
          <a href="#" className="text-[#0066cc] hover:text-[#004499]">
            External examiner feedback
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
