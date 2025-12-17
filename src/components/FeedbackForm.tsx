import { useState } from 'react';
import { ChevronDown, ChevronRight, Info, HelpCircle, Download, CheckCircle } from 'lucide-react';
import { AssessmentData, StudentSample } from '../App';

interface FeedbackFormProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
}

export function FeedbackForm({ onNavigate, assessmentData, updateAssessmentData }: FeedbackFormProps) {
  const [assessmentExpanded, setAssessmentExpanded] = useState(true);
  const [feedbackExpanded, setFeedbackExpanded] = useState(true);
  const [comments, setComments] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [externalExaminerSignature, setExternalExaminerSignature] = useState('');
  const [externalExaminerDate, setExternalExaminerDate] = useState('');

  const handleSubmitSignOff = () => {
    if (!externalExaminerSignature || !externalExaminerDate) {
      alert('Please complete the External Examiner signature fields (Name and Date) before submitting.');
      return;
    }

    if (!isCompleted) {
      alert('Please check the "I have completed this form and wish to submit it" checkbox before submitting.');
      return;
    }

    if (confirm('Are you sure you want to submit this External Examiner report? The Module Leader will be notified by email that the assessment process is complete.')) {
      alert('External Examiner report has been submitted successfully.\n\nThe Module Leader has been notified by email that the external examination process is complete.');
      setIsSubmitted(true);
    }
  };

  const handleDownloadPDF = () => {
    alert('Downloading External Examiner Report as PDF...\n\nIn a production environment, this would generate and download a PDF of the complete report.');
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
        {/* Status Banner */}
        {isSubmitted && (
          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-green-800 mb-2">External Examiner Report Submitted</h3>
                <p className="text-sm text-green-700">
                  Your External Examiner report has been successfully submitted. The Module Leader has been notified by email that the external examination process is complete.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Page Title */}
        <div className="bg-white border border-gray-300 rounded p-6 mb-6">
          <h1 className="text-center text-2xl">External Examiner Report</h1>
        </div>

        <div className="bg-white border border-gray-300 rounded p-8 mb-6">
          {/* Module Information Section */}
          <div className="mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Module Information</h2>

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
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Student Sample for External Review</h2>
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm">
                <strong>Note:</strong> The following student samples have been selected and reviewed during internal moderation. 
                You can view the student work and feedback by clicking the links provided.
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
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Internal Moderation Summary</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
                <label className="text-right pt-2">Internal Moderator Assessment:</label>
                <textarea
                  value={assessmentData.gradesAppropriate}
                  className="w-full h-24 p-3 border border-gray-300 bg-gray-100"
                  readOnly
                />
              </div>

              {assessmentData.additionalComments && (
                <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
                  <label className="text-right pt-2">Additional Comments:</label>
                  <textarea
                    value={assessmentData.additionalComments}
                    className="w-full h-24 p-3 border border-gray-300 bg-gray-100"
                    readOnly
                  />
                </div>
              )}

              {assessmentData.moduleLeaderResponse && (
                <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
                  <label className="text-right pt-2">Module Leader Response:</label>
                  <textarea
                    value={assessmentData.moduleLeaderResponse}
                    className="w-full h-24 p-3 border border-gray-300 bg-gray-100"
                    readOnly
                  />
                </div>
              )}
            </div>

            {/* Internal Moderation Sign-offs (Read-only) */}
            <div className="mt-6">
              <h3 className="text-sm mb-3">Internal Moderation Sign-offs:</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-gray-200">
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
                    <tr>
                      <td className="border border-gray-400 p-2 bg-yellow-50">
                        Signed Solent Moderator Franchise Partners ONLY
                      </td>
                      <td className="border border-gray-400 p-2 bg-gray-100">
                        {assessmentData.franchisePartnerName || 'N/A'}
                      </td>
                      <td className="border border-gray-400 p-2 bg-gray-100">
                        {assessmentData.franchisePartnerDate || 'N/A'}
                      </td>
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

        {/* Assessment Section */}
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
            <h2>Assessment Questions</h2>
          </button>

          {assessmentExpanded && (
            <div className="px-6 pb-4">
              {/* Question 1 */}
              <div className="mb-6">
                <p className="text-sm mb-2">
                  Have you seen samples of completed work for this assessment?
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question1"
                      value="yes"
                      checked={question1 === 'yes'}
                      onChange={(e) => setQuestion1(e.target.value)}
                      className="w-4 h-4"
                      disabled={isSubmitted}
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question1"
                      value="no"
                      checked={question1 === 'no'}
                      onChange={(e) => setQuestion1(e.target.value)}
                      className="w-4 h-4"
                      disabled={isSubmitted}
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>

              {/* Question 2 */}
              <div className="mb-6">
                <p className="text-sm mb-2">
                  Were the standards set for the assessment appropriate for their level?
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question2"
                      value="yes"
                      checked={question2 === 'yes'}
                      onChange={(e) => setQuestion2(e.target.value)}
                      className="w-4 h-4"
                      disabled={isSubmitted}
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question2"
                      value="no"
                      checked={question2 === 'no'}
                      onChange={(e) => setQuestion2(e.target.value)}
                      className="w-4 h-4"
                      disabled={isSubmitted}
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>

              {/* Question 3 */}
              <div className="mb-4">
                <p className="text-sm mb-2">
                  Were the standards of student performance comparable with similar programmes or subjects in other UK institutions with which you are familiar?
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question3"
                      value="yes"
                      checked={question3 === 'yes'}
                      onChange={(e) => setQuestion3(e.target.value)}
                      className="w-4 h-4"
                      disabled={isSubmitted}
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="question3"
                      value="no"
                      checked={question3 === 'no'}
                      onChange={(e) => setQuestion3(e.target.value)}
                      className="w-4 h-4"
                      disabled={isSubmitted}
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
            <h2>Feedback summary</h2>
          </button>

          {feedbackExpanded && (
            <div className="px-6 pb-6">
              <div className="mb-4">
                <label htmlFor="comments" className="block text-sm mb-2">
                  Comments:
                </label>
                <textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full h-80 p-3 border border-gray-300 rounded bg-[#e8edf1] focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:border-transparent"
                  disabled={isSubmitted}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="completed"
                  checked={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.checked)}
                  className="w-4 h-4"
                  disabled={isSubmitted}
                />
                <label htmlFor="completed" className="text-sm">
                  I have completed this form and wish to submit it.
                </label>
                <Info className="w-5 h-5 text-[#0066cc]" />
              </div>
            </div>
          )}
        </div>

        {/* External Examiner Sign-off Section */}
        <div className="bg-white border border-gray-300 rounded p-8 mb-6">
          <h2 className="bg-gray-200 px-4 py-2 mb-4">External Examiner Sign-off</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-2 text-left w-1/3">Role</th>
                  <th className="border border-gray-400 p-2 text-left w-1/3">Name</th>
                  <th className="border border-gray-400 p-2 text-left w-1/3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2">External Examiner</td>
                  <td className="border border-gray-400 p-2">
                    <input
                      type="text"
                      value={externalExaminerSignature}
                      onChange={(e) => setExternalExaminerSignature(e.target.value)}
                      className="w-full p-2 border border-gray-300 bg-gray-100"
                      placeholder="Enter your name"
                      disabled={isSubmitted}
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      type="date"
                      value={externalExaminerDate}
                      onChange={(e) => setExternalExaminerDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 bg-gray-100"
                      disabled={isSubmitted}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {!isSubmitted && (
            <div className="mt-6 flex flex-col items-center gap-4">
              <button
                onClick={handleSubmitSignOff}
                className="px-8 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Submit External Examiner Report
              </button>
              <p className="text-sm text-gray-600 text-center">
                By submitting, you confirm that you have reviewed all student samples and internal moderation documentation. 
                The Module Leader will be notified by email that the assessment process is complete.
              </p>
            </div>
          )}

          {isSubmitted && (
            <div className="mt-6 flex justify-center">
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-800">Report submitted successfully</p>
                <p className="text-sm text-green-700 mt-1">
                  Submitted on {externalExaminerDate} by {externalExaminerSignature}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Download PDF Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleDownloadPDF}
            className="px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <Download className="inline w-4 h-4 mr-2" />
            Download Complete Report as PDF
          </button>
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