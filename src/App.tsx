import { useState } from 'react';
import { FeedbackForm } from './components/FeedbackForm';
import { PeerReview } from './components/PeerReview';
import { PeerReviewerView } from './components/PeerReviewerView';
import { AssessmentBriefCreation } from './components/AssessmentBriefCreation';
import { SampleSelection } from './components/SampleSelection';
import { InternalModeration } from './components/InternalModeration';

// Shared data structure for all pages
export interface StudentSample {
  id: string;
  firstName: string;
  grade: string;
  workLink: string;
}

export interface AssessmentData {
  // Assessment Brief Fields
  moduleTitle: string;
  moduleCode: string;
  moduleLeader: string;
  level: string;
  academicYear: string;
  semester: string;
  assessmentTitle: string;
  assessmentNumber: string;
  assessmentType: string;
  mustPass: string;
  restrictions: string;
  consequenceOption: string;
  individualGroup: string;
  groupMarking: string;
  assessmentWeighting: string;
  issueDate: string;
  handInDate: string;
  plannedFeedbackDate: string;
  modeOfSubmission: string;
  anonymousMarking: string;
  assessmentTask: string;
  assessmentCriteria: string;
  aiGuidance: string;
  aiPolicy: string;
  learningOutcomes: string;
  livingCV1: string;
  livingCV2: string;
  internalPeerReviewer: string;
  
  // Peer Review Fields
  passGrade: string;
  aggregated: string;
  // Solent Moderator final compliance comments
  solentModeratorComments: string;
  moduleLeaderComments: string;
  moduleLeaderSignature: string;
  peerReviewDate: string;
  peerReviewerDate: string;
  peerReviewSignedOff: boolean;
  peerReviewerOverallComments: string;
  moduleLeaderResponseToReviewer: string;
  peerReviewSentBack: boolean;
  peerReviewComments: {
    briefingSheet: string;
    compliesDescriptor: string;
    instructionsClear: string;
    criteriaClear: string;
    taskEnables: string;
    specialProvision: string;
  };
  peerReviewChecks: {
    briefingSheet: boolean;
    compliesDescriptor: boolean;
    instructionsClear: boolean;
    criteriaClear: boolean;
    taskEnables: boolean;
    specialProvision: boolean;
  };
  
  // Internal Moderation Fields
  numberOfSubmissions: string;
  numberOfModeratedSubmissions: string;
  studentSamples: StudentSample[];
  gradesAppropriate: string;
  additionalComments: string;
  moduleLeaderResponse: string;
  internalModeratorName: string;
  internalModeratorDate: string;
  moduleLeaderSignName: string;
  moduleLeaderSignDate: string;
  franchisePartnerName: string;
  franchisePartnerDate: string;
  isFranchisePartner: boolean;
  requiresExternalModeration: boolean;
  internalModerationComplete: boolean;
  internalModerationStatus?: string;
  internalModerationMLResponse?: string;
  
  // External Examiner Fields
  externalExaminerQuestion1: string;
  externalExaminerQuestion2: string;
  externalExaminerQuestion3: string;
  externalExaminerComments: string;
  externalExaminerCompleted: boolean;
  externalExaminerSignature: string;
  externalExaminerDate: string;
  externalExaminerSubmitted: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'brief-creation' | 'peer-review' | 'sample-selection' | 'internal-moderation' | 'feedback'>('brief-creation');
  
  // Shared state for all assessment data
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    // Assessment Brief Fields
    moduleTitle: 'COM416: External examiner feedback',
    moduleCode: 'COM416',
    moduleLeader: 'Dr. Jane Smith',
    level: 'Level 6',
    academicYear: '2025/26',
    semester: 'Semester 1',
    assessmentTitle: '',
    assessmentNumber: '',
    assessmentType: '',
    mustPass: '',
    restrictions: '',
    consequenceOption: 'option1',
    individualGroup: '',
    groupMarking: '',
    assessmentWeighting: '',
    issueDate: '',
    handInDate: '',
    plannedFeedbackDate: '',
    modeOfSubmission: '',
    anonymousMarking: '',
    assessmentTask: '',
    assessmentCriteria: '',
    aiGuidance: '',
    aiPolicy: '',
    learningOutcomes: '',
    livingCV1: '',
    livingCV2: '',
    internalPeerReviewer: '',
    
    // Peer Review Fields
    passGrade: '',
    aggregated: '',
    moduleLeaderComments: '',
    moduleLeaderSignature: '',
    peerReviewDate: '',
    peerReviewerDate: '',
    peerReviewSignedOff: false,
    peerReviewerOverallComments: '',
    moduleLeaderResponseToReviewer: '',
    peerReviewSentBack: false,
    peerReviewComments: {
      briefingSheet: '',
      compliesDescriptor: '',
      instructionsClear: '',
      criteriaClear: '',
      taskEnables: '',
      specialProvision: ''
    },
    peerReviewChecks: {
      briefingSheet: false,
      compliesDescriptor: false,
      instructionsClear: false,
      criteriaClear: false,
      taskEnables: false,
      specialProvision: false
    },
    
    // Internal Moderation Fields
    numberOfSubmissions: '45',
    numberOfModeratedSubmissions: '5',
    studentSamples: [
      { id: 'ST001234', firstName: 'Alice Johnson', grade: '74', workLink: '#' },
      { id: 'ST001235', firstName: 'Bob Williams', grade: '65', workLink: '#' },
      { id: 'ST001236', firstName: 'Charlie Brown', grade: '58', workLink: '#' },
      { id: 'ST001237', firstName: 'Diana Martinez', grade: '48', workLink: '#' },
      { id: 'ST001238', firstName: 'Ethan Davis', grade: '35', workLink: '#' }
    ],
    gradesAppropriate: 'Yes, the grades and feedback comments are appropriate and align with the assessment criteria. The marking is consistent across the sample.',
    additionalComments: 'Minor formatting inconsistencies noted in some feedback comments. Suggest using a standard template.',
    moduleLeaderResponse: 'Feedback template has been created and shared with the marking team.',
    internalModeratorName: 'Dr. Sarah Johnson',
    internalModeratorDate: '2025-12-10',
    moduleLeaderSignName: 'Dr. Jane Smith',
    moduleLeaderSignDate: '2025-12-12',
    franchisePartnerName: '',
    franchisePartnerDate: '',
    isFranchisePartner: false,
    requiresExternalModeration: true,
    internalModerationComplete: false,
    internalModerationStatus: 'Pending',
    internalModerationMLResponse: 'Awaiting response from the marking team.',
    
    // External Examiner Fields
    externalExaminerQuestion1: '',
    externalExaminerQuestion2: '',
    externalExaminerQuestion3: '',
    externalExaminerComments: '',
    externalExaminerCompleted: false,
    externalExaminerSignature: '',
    externalExaminerDate: '',
    externalExaminerSubmitted: false,
    solentModeratorComments: '',
  });

  // Update function that can be used by all components
  const updateAssessmentData = (updates: Partial<AssessmentData>) => {
    setAssessmentData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage === 'brief-creation' ? (
        <AssessmentBriefCreation 
          onNavigate={setCurrentPage} 
          assessmentData={assessmentData}
          updateAssessmentData={updateAssessmentData}
        />
      ) : currentPage === 'peer-review' ? (
        <PeerReview 
          onNavigate={setCurrentPage} 
          assessmentData={assessmentData}
          updateAssessmentData={updateAssessmentData}
        />
      ) : currentPage === 'sample-selection' ? (
        <SampleSelection 
          onNavigate={setCurrentPage}
          assessmentData={assessmentData}
          updateAssessmentData={updateAssessmentData}
        />
      ) : currentPage === 'internal-moderation' ? (
        <InternalModeration 
          onNavigate={setCurrentPage}
          assessmentData={assessmentData}
          updateAssessmentData={updateAssessmentData}
        />
      ) : (
        <FeedbackForm 
          onNavigate={setCurrentPage}
          assessmentData={assessmentData}
          updateAssessmentData={updateAssessmentData}
        />
      )}
    </div>
  );
}