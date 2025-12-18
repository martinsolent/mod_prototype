import { useState } from 'react';
import { HelpCircle, Download, CheckCircle } from 'lucide-react';
import { AssessmentData } from '../App';

interface PeerReviewSignOffProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
}

export function PeerReviewSignOff({ onNavigate, assessmentData, updateAssessmentData }: PeerReviewSignOffProps) {
  const [formData, setFormData] = useState({
    moduleTitle: assessmentData.moduleTitle,
    moduleCode: assessmentData.moduleCode,
    level: assessmentData.level,
    moduleLeader: assessmentData.moduleLeader,
    internalPeerReviewer: assessmentData.internalPeerReviewer,
    assessmentNumber: assessmentData.assessmentNumber || 'AE1',
    assessmentTitle: assessmentData.assessmentTitle || 'User Research Project',
    weighting: assessmentData.assessmentWeighting || '100%',
    passGrade: assessmentData.passGrade,
    aggregated: assessmentData.aggregated,
    moduleLeaderComments: assessmentData.moduleLeaderComments,
    peerReviewerDate: assessmentData.peerReviewerDate
  });

  const [checkedItems] = useState(assessmentData.peerReviewChecks);

  const [comments, setComments] = useState(assessmentData.peerReviewComments);

  // Add state for overall reviewer comments
  const [reviewerOverallComments, setReviewerOverallComments] = useState(assessmentData.peerReviewerOverallComments || '');

  // Dropdown options for Internal Peer Reviewer
  const peerReviewers = [
    'Select a reviewer...',
    'Dr. Sarah Johnson',
    'Prof. Michael Chen',
    'Dr. Emily Williams',
    'Dr. James Anderson',
    'Prof. Rebecca Taylor'
  ];

  const handleDownloadPeerReviewPDF = () => {
    alert('Downloading Peer Review Form as PDF...\n\nIn a production environment, this would generate and download a PDF of the peer review form.');
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
        {/* Signed Off Status Banner */}
        {assessmentData.peerReviewSignedOff && (
          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-green-800 mb-2">Assessment Brief Signed Off Successfully</h3>
                <p className="text-sm text-green-700 mb-3">
                  This assessment brief has been signed off by the Internal Peer Reviewer. The Module Leader has been notified by email and the brief is now ready to be published.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadPeerReviewPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download Peer Review PDF
                  </button>
                  <button
                    onClick={() => onNavigate('brief-creation')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Assessment Brief
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-300 rounded p-8">
          <h1 className="text-center text-2xl mb-8">Assessment Brief Peer Review - Sign Off</h1>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-[200px_1fr] gap-4 mb-6">
            <label className="text-right">Module Title:</label>
            <input
              type="text"
              value={formData.moduleTitle}
              readOnly
              className="border border-gray-300 px-3 py-1 bg-gray-100"
            />

            <label className="text-right">Module Code:</label>
            <input
              type="text"
              value={formData.moduleCode}
              readOnly
              className="border border-gray-300 px-3 py-1 bg-gray-100"
            />

            <label className="text-right">Level:</label>
            <input
              type="text"
              value={formData.level}
              readOnly
              className="border border-gray-300 px-3 py-1 bg-gray-100"
            />

            <label className="text-right">Module Leader:</label>
            <input
              type="text"
              value={formData.moduleLeader}
              readOnly
              className="border border-gray-300 px-3 py-1 bg-gray-100"
            />

            <label className="text-right">Internal Peer Reviewer:</label>
            <input
              type="text"
              value={formData.internalPeerReviewer}
              readOnly
              className="border border-gray-300 px-3 py-1 bg-gray-100 w-64"
            />

            <label className="text-right">Assessment Number:</label>
            <input
              type="text"
              value={formData.assessmentNumber}
              readOnly
              className="border border-gray-300 px-3 py-1 bg-gray-100"
            />

            <label className="text-right">Assessment Title:</label>
            <input
              type="text"
              value={formData.assessmentTitle}
              readOnly
              className="border border-gray-300 px-3 py-1 bg-gray-100"
            />
          </div>

          {/* Weighting and Pass Grade Row */}
          <div className="flex gap-8 mb-6">
            <div className="flex items-center gap-2">
              <label>Weighting %:</label>
              <input
                type="text"
                value={formData.weighting}
                readOnly
                className="border border-gray-300 px-3 py-1 bg-gray-100 w-20"
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Pass Grade/Mark %:</label>
              <input
                type="text"
                value={formData.passGrade}
                readOnly
                className="border border-gray-300 px-3 py-1 bg-gray-100 w-20"
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Aggregated:</label>
              <input
                type="text"
                value={formData.aggregated}
                readOnly
                className="border border-gray-300 px-3 py-1 bg-gray-100 w-24"
              />
            </div>
          </div>

          {/* Assessment Components Table */}
          <table className="w-full border-collapse border border-black mb-6">
            <thead>
              <tr className="bg-white">
                <th className="border border-black px-4 py-2 text-left">Assessment Components</th>
                <th className="border border-black px-4 py-2 text-center w-40">
                  Confirmed by Module Leader
                </th>
                <th className="border border-black px-4 py-2 text-left">Peer Reviewer Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-4 py-3">Assessment Briefing Sheet used</td>
                <td className="border border-black px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={checkedItems.briefingSheet}
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3">
                  <input
                    type="text"
                    value={comments.briefingSheet}
                    onChange={(e) => setComments({ ...comments, briefingSheet: e.target.value })}
                    className="w-full bg-gray-200 px-2 py-1"
                  />
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
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3">
                  <input
                    type="text"
                    value={comments.compliesDescriptor}
                    onChange={(e) => setComments({ ...comments, compliesDescriptor: e.target.value })}
                    className="w-full bg-gray-200 px-2 py-1"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-3">Instructions are clear</td>
                <td className="border border-black px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={checkedItems.instructionsClear}
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3">
                  <input
                    type="text"
                    value={comments.instructionsClear}
                    onChange={(e) => setComments({ ...comments, instructionsClear: e.target.value })}
                    className="w-full bg-gray-200 px-2 py-1"
                  />
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
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3">
                  <input
                    type="text"
                    value={comments.criteriaClear}
                    onChange={(e) => setComments({ ...comments, criteriaClear: e.target.value })}
                    className="w-full bg-gray-200 px-2 py-1"
                  />
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
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3">
                  <input
                    type="text"
                    value={comments.taskEnables}
                    onChange={(e) => setComments({ ...comments, taskEnables: e.target.value })}
                    className="w-full bg-gray-200 px-2 py-1"
                  />
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
                    disabled
                    className="w-5 h-5"
                  />
                </td>
                <td className="border border-black px-4 py-3">
                  <input
                    type="text"
                    value={comments.specialProvision}
                    onChange={(e) => setComments({ ...comments, specialProvision: e.target.value })}
                    className="w-full bg-gray-200 px-2 py-1"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Module Leader's Comments (Read Only) */}
          <div className="border border-black mb-6">
            <div className="grid grid-cols-[180px_1fr]">
              <div className="border-r border-black px-4 py-3 bg-gray-100">
                Module Leader's Comments
              </div>
              <div className="px-4 py-3 bg-gray-50">
                <div className="w-full h-32 px-2 py-1 overflow-auto">
                  {formData.moduleLeaderComments || 'No comments provided'}
                </div>
              </div>
            </div>
          </div>

          {/* Peer Reviewer's Overall Comments */}
          <div className="border border-black mb-8">
            <div className="grid grid-cols-[180px_1fr]">
              <div className="border-r border-black px-4 py-3 bg-gray-200">
                Peer Reviewer's Comments
              </div>
              <div className="px-4 py-3">
                <textarea
                  value={reviewerOverallComments}
                  onChange={(e) => setReviewerOverallComments(e.target.value)}
                  className="w-full h-32 bg-gray-200 px-2 py-1"
                  placeholder="Add your overall feedback and recommendations here..."
                />
              </div>
            </div>
          </div>

          {/* Peer Reviewer Sign Off */}
          <h3 className="bg-gray-200 px-4 py-2 mb-4">Peer Reviewer Sign Off</h3>
          <div className="flex justify-between mb-8">
            <div className="flex items-center gap-2">
              <label>Internal Peer Reviewer:</label>
              <select
                value={formData.internalPeerReviewer}
                onChange={(e) => setFormData({ ...formData, internalPeerReviewer: e.target.value })}
                className="border border-gray-300 px-3 py-1 bg-gray-200 w-64"
              >
                {peerReviewers.map((reviewer) => (
                  <option key={reviewer} value={reviewer}>{reviewer}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label>Date:</label>
              <input
                type="text"
                value={formData.peerReviewerDate}
                onChange={(e) => setFormData({ ...formData, peerReviewerDate: e.target.value })}
                className="border border-gray-300 px-3 py-1 bg-gray-200 w-40"
              />
            </div>
          </div>

          {/* Peer Reviewer Actions Section */}
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded p-6 mb-6">
              <p className="text-sm mb-4">
                <strong>Note:</strong> The Peer Reviewer checks the brief and signs it off, leaving comments if needed. 
                The Module Leader can update the brief based on these comments. The Module Leader will be notified by email if the brief is sent back for updates.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  alert('Brief has been signed off successfully!');
                  updateAssessmentData({
                    peerReviewSignedOff: true,
                    peerReviewerDate: formData.peerReviewerDate,
                    peerReviewComments: comments,
                    internalPeerReviewer: formData.internalPeerReviewer,
                    peerReviewerOverallComments: reviewerOverallComments
                  });
                }}
                className="px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Sign Off Brief
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to send this brief back to the Module Leader? They will be notified by email.')) {
                    updateAssessmentData({
                      peerReviewComments: comments
                    });
                    alert('Brief has been sent back to the Module Leader. An email notification has been sent.');
                  }
                }}
                className="px-8 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                Send Back for Updates
              </button>
              <button
                onClick={handleDownloadPeerReviewPDF}
                className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Download PDF
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
            Peer Review Sign Off
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