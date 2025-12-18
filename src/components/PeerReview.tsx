import { useState } from 'react';
import { HelpCircle, Download, CheckCircle } from 'lucide-react';
import { AssessmentData } from '../App';
import { PeerReviewML } from './PeerReviewML';
import { PeerReviewerView } from './PeerReviewerView';
import { PeerReviewMLFeedback } from './PeerReviewMLFeedback';
import { PeerReviewMLSignedOff } from './PeerReviewMLSignedOff';

interface PeerReviewProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
}

export function PeerReview({ onNavigate, assessmentData, updateAssessmentData }: PeerReviewProps) {
  // Toggle between different views
  const [viewMode, setViewMode] = useState<'module-leader' | 'peer-reviewer' | 'ml-feedback' | 'ml-signed-off'>('module-leader');

  return (
    <div>
      {/* Toggle buttons at the top to switch views */}
      <div className="bg-yellow-100 border-b-2 border-yellow-400 px-6 py-3">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-sm">View Mode (for testing):</span>
          <button
            onClick={() => setViewMode('module-leader')}
            className={`px-4 py-2 rounded transition-colors text-sm ${
              viewMode === 'module-leader' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
            }`}
          >
            Module Leader View
          </button>
          <button
            onClick={() => setViewMode('peer-reviewer')}
            className={`px-4 py-2 rounded transition-colors text-sm ${
              viewMode === 'peer-reviewer' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
            }`}
          >
            Peer Reviewer View
          </button>
          <button
            onClick={() => setViewMode('ml-feedback')}
            className={`px-4 py-2 rounded transition-colors text-sm ${
              viewMode === 'ml-feedback' 
                ? 'bg-orange-600 text-white' 
                : 'bg-white text-orange-600 border border-orange-600 hover:bg-orange-50'
            }`}
          >
            ML: Sent Back for Updates
          </button>
          <button
            onClick={() => setViewMode('ml-signed-off')}
            className={`px-4 py-2 rounded transition-colors text-sm ${
              viewMode === 'ml-signed-off' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
            }`}
          >
            ML: Signed Off
          </button>
        </div>
      </div>

      {viewMode === 'module-leader' ? (
        <PeerReviewML onNavigate={onNavigate} assessmentData={assessmentData} updateAssessmentData={updateAssessmentData} />
      ) : viewMode === 'peer-reviewer' ? (
        <PeerReviewerView onNavigate={onNavigate} assessmentData={assessmentData} updateAssessmentData={updateAssessmentData} />
      ) : viewMode === 'ml-feedback' ? (
        <PeerReviewMLFeedback onNavigate={onNavigate} assessmentData={assessmentData} updateAssessmentData={updateAssessmentData} />
      ) : (
        <PeerReviewMLSignedOff onNavigate={onNavigate} assessmentData={assessmentData} updateAssessmentData={updateAssessmentData} />
      )}
    </div>
  );
}