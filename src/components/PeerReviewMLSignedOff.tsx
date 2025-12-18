import { HelpCircle, CheckCircle, Download, ArrowRight } from 'lucide-react';
import { AssessmentData } from '../App';

interface PeerReviewMLSignedOffProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
}

export function PeerReviewMLSignedOff({ onNavigate, assessmentData, updateAssessmentData }: PeerReviewMLSignedOffProps) {
  const handleDownloadPDF = () => {
    alert('Downloading Peer Review Form as PDF...\n\nIn a production environment, this would generate and download a PDF of the signed-off peer review form.');
  };

  const handlePublishBrief = () => {
    if (confirm('Are you sure you want to publish this Assessment Brief to students?\n\nOnce published, students will be able to view and access the assessment.')) {
      alert('Assessment Brief has been published successfully!\n\nStudents have been notified by email and can now access the brief.');
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
        {/* Success Banner */}
        <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-green-800 mb-2">Peer Review Completed Successfully!</h3>
              <p className="text-sm text-green-700 mb-3">
                The Internal Peer Reviewer has signed off on this assessment brief on <strong>{assessmentData.peerReviewerDate}</strong>. 
                The brief has been approved and is now ready to be published to students. You can download the peer review form for your records or proceed to publish the assessment brief.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded p-8">
          <h1 className="text-center text-2xl mb-8">Assessment Brief Peer Review - Signed Off</h1>

          {/* Form Fields Grid - Read Only */}
          <div className="grid grid-cols-[200px_1fr] gap-4 mb-6">
            <label className="text-right">Module Title:</label>
            <div className="border border-gray-300 px-3 py-1 bg-gray-100">
              {assessmentData.moduleTitle}
            </div>

            <label className="text-right">Module Code:</label>
            <div className="border border-gray-300 px-3 py-1 bg-gray-100">
              {assessmentData.moduleCode}
            </div>

            <label className="text-right">Level:</label>
            <div className="border border-gray-300 px-3 py-1 bg-gray-100">
              {assessmentData.level}
            </div>

            <label className="text-right">Module Leader:</label>
            <div className="border border-gray-300 px-3 py-1 bg-gray-100">
              {assessmentData.moduleLeader}
            </div>

            <label className="text-right">Internal Peer Reviewer:</label>
            <div className="border border-gray-300 px-3 py-1 bg-gray-100">
              {assessmentData.internalPeerReviewer}
            </div>

            <label className="text-right">Assessment Number:</label>
            <div className="border border-gray-300 px-3 py-1 bg-gray-100">
              {assessmentData.assessmentNumber}
            </div>

            <label className="text-right">Assessment Title:</label>
            <div className="border border-gray-300 px-3 py-1 bg-gray-100">
              {assessmentData.assessmentTitle}
            </div>
          </div>

          {/* Weighting and Pass Grade Row - Read Only */}
          <div className="flex gap-8 mb-6">
            <div className="flex items-center gap-2">
              <label>Weighting %:</label>
              <div className="border border-gray-300 px-3 py-1 bg-gray-100 w-20">
                {assessmentData.assessmentWeighting}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label>Pass Grade/Mark %:</label>
              <div className="border border-gray-300 px-3 py-1 bg-gray-100 w-20">
                {assessmentData.passGrade || 'N/A'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label>Aggregated:</label>
              <div className="border border-gray-300 px-3 py-1 bg-gray-100 w-24">
                {assessmentData.aggregated || 'N/A'}
              </div>
            </div>
          </div>

          {/* Assessment Components Table - All Read Only */}
          <table className="w-full border-collapse border border-black mb-6">
            <thead>
              <tr className="bg-white">
                <th className="border border-black px-4 py-2 text-left">Assessment Components</th>
                <th className="border border-black px-4 py-2 text-center w-40">
                  Confirmed by Module Leader
                </th>
                <th className="border border-black px-4 py-2 text-left w-80">Peer Reviewer Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-4 py-3">Assessment Briefing Sheet used</td>
                <td className="border border-black px-4 py-3 text-center bg-green-50">
                  <input
                    type="checkbox"
                    checked={assessmentData.peerReviewChecks.briefingSheet}
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-gray-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.briefingSheet || 'No comments'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">
                  Complies with Module descriptor assessment strategy and assessment descriptor
                </td>
                <td className="border border-black px-4 py-3 text-center bg-green-50">
                  <input
                    type="checkbox"
                    checked={assessmentData.peerReviewChecks.compliesDescriptor}
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-gray-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.compliesDescriptor || 'No comments'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">Instructions are clear</td>
                <td className="border border-black px-4 py-3 text-center bg-green-50">
                  <input
                    type="checkbox"
                    checked={assessmentData.peerReviewChecks.instructionsClear}
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-gray-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.instructionsClear || 'No comments'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">
                  Assessment criteria are clear and appropriate to task and level, and align with the SU generic grading criteria
                </td>
                <td className="border border-black px-4 py-3 text-center bg-green-50">
                  <input
                    type="checkbox"
                    checked={assessmentData.peerReviewChecks.criteriaClear}
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-gray-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.criteriaClear || 'No comments'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">
                  Task enables students to achieve Module learning outcomes
                </td>
                <td className="border border-black px-4 py-3 text-center bg-green-50">
                  <input
                    type="checkbox"
                    checked={assessmentData.peerReviewChecks.taskEnables}
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-gray-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.taskEnables || 'No comments'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">
                  Consideration of special provision arrangements for students with disabilities
                </td>
                <td className="border border-black px-4 py-3 text-center bg-green-50">
                  <input
                    type="checkbox"
                    checked={assessmentData.peerReviewChecks.specialProvision}
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3 bg-gray-50">
                  <div className="text-sm italic text-gray-700">
                    {assessmentData.peerReviewComments.specialProvision || 'No comments'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Module Leader's Comments (Read Only) */}
          <div className="border border-black mb-6">
            <div className="grid grid-cols-[200px_1fr]">
              <div className="border-r border-black px-4 py-3 bg-gray-100">
                Module Leader's Comments
              </div>
              <div className="px-4 py-3 bg-gray-50">
                <div className="text-sm min-h-[80px] whitespace-pre-wrap">
                  {assessmentData.moduleLeaderComments || 'No comments provided'}
                </div>
              </div>
            </div>
          </div>

          {/* Peer Reviewer's Overall Comments (Read Only) */}
          <div className="border border-black mb-6">
            <div className="grid grid-cols-[200px_1fr]">
              <div className="border-r border-black px-4 py-3 bg-gray-100">
                Peer Reviewer's Comments
              </div>
              <div className="px-4 py-3 bg-gray-50">
                <div className="text-sm min-h-[80px] whitespace-pre-wrap">
                  {assessmentData.peerReviewerOverallComments || 'No comments provided'}
                </div>
              </div>
            </div>
          </div>

          {/* Sign Off Information */}
          <div className="bg-green-50 border-2 border-green-600 rounded p-6 mb-8">
            <h3 className="text-green-800 mb-4">Peer Review Sign-Off Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Internal Peer Reviewer:</div>
                <div className="text-green-900">{assessmentData.internalPeerReviewer}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Date Signed Off:</div>
                <div className="text-green-900">{assessmentData.peerReviewerDate}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span>This assessment brief has been reviewed and approved by the peer reviewer.</span>
              </div>
            </div>
          </div>

          {/* Next Steps Section */}
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded p-6 mb-6">
              <h4 className="text-blue-900 mb-3">Next Steps:</h4>
              <ul className="list-disc list-inside text-sm text-blue-800 space-y-2">
                <li>Download the peer review form for your records</li>
                <li>Publish the assessment brief to make it available to students</li>
                <li>Proceed to Sample Selection once student submissions are received</li>
                <li>Complete the Internal Moderation process before final grades are submitted</li>
              </ul>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Peer Review PDF
              </button>
              <button
                onClick={handlePublishBrief}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                Publish Assessment Brief
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
            Peer Review Signed Off
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