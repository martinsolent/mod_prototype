import { useState } from 'react';
import { HelpCircle, Download, CheckCircle } from 'lucide-react';
import { AssessmentData } from '../App';

interface AssessmentBriefCreationProps {
  onNavigate: (page: 'brief-creation' | 'peer-review' | 'internal-moderation' | 'feedback') => void;
  assessmentData: AssessmentData;
  updateAssessmentData: (updates: Partial<AssessmentData>) => void;
}

export function AssessmentBriefCreation({ onNavigate, assessmentData, updateAssessmentData }: AssessmentBriefCreationProps) {
  const [formData, setFormData] = useState({
    moduleTitle: assessmentData.moduleTitle,
    moduleCode: assessmentData.moduleCode,
    moduleLeader: assessmentData.moduleLeader,
    level: assessmentData.level,
    assessmentTitle: assessmentData.assessmentTitle,
    assessmentNumber: assessmentData.assessmentNumber,
    assessmentType: assessmentData.assessmentType,
    mustPass: assessmentData.mustPass,
    restrictions: assessmentData.restrictions,
    consequenceOption: assessmentData.consequenceOption,
    individualGroup: assessmentData.individualGroup,
    groupMarking: assessmentData.groupMarking,
    assessmentWeighting: assessmentData.assessmentWeighting,
    issueDate: assessmentData.issueDate,
    handInDate: assessmentData.handInDate,
    plannedFeedbackDate: assessmentData.plannedFeedbackDate,
    modeOfSubmission: assessmentData.modeOfSubmission,
    anonymousMarking: assessmentData.anonymousMarking,
    assessmentTask: assessmentData.assessmentTask,
    assessmentCriteria: assessmentData.assessmentCriteria,
    aiGuidance: assessmentData.aiGuidance,
    aiPolicy: assessmentData.aiPolicy,
    learningOutcomes: assessmentData.learningOutcomes,
    livingCV1: assessmentData.livingCV1,
    livingCV2: assessmentData.livingCV2,
    internalPeerReviewer: assessmentData.internalPeerReviewer
  });

  const peerReviewers = [
    'Select a reviewer...',
    'Dr. Sarah Johnson',
    'Prof. Michael Chen',
    'Dr. Emily Williams',
    'Dr. James Anderson',
    'Prof. Rebecca Taylor'
  ];

  const handleSaveDraft = () => {
    alert('Assessment Brief has been saved as draft.');
  };

  const handleSubmitForReview = () => {
    if (!formData.internalPeerReviewer || formData.internalPeerReviewer === 'Select a reviewer...') {
      alert('Please select an Internal Peer Reviewer before submitting for review.');
      return;
    }
    
    if (confirm(`Are you sure you want to submit this Assessment Brief to ${formData.internalPeerReviewer} for peer review? They will be notified by email.`)) {
      alert(`Assessment Brief has been submitted for peer review. ${formData.internalPeerReviewer} has been notified by email.`);
      onNavigate('peer-review');
    }
  };

  const [learningOutcomes, setLearningOutcomes] = useState(['']);

  const handleLearningOutcomeChange = (index: number, value: string) => {
    const newLearningOutcomes = [...learningOutcomes];
    newLearningOutcomes[index] = value;
    setLearningOutcomes(newLearningOutcomes);
  };

  const handleAddLearningOutcome = () => {
    setLearningOutcomes([...learningOutcomes, '']);
  };

  const handleRemoveLearningOutcome = (index: number) => {
    const newLearningOutcomes = [...learningOutcomes];
    newLearningOutcomes.splice(index, 1);
    setLearningOutcomes(newLearningOutcomes);
  };

  // Rubric state - each row has 17 cells (one for each grade level)
  const [rubricRows, setRubricRows] = useState([
    { id: 1, criteria: Array(17).fill('') }
  ]);

  const handleAddRubricRow = () => {
    const newId = rubricRows.length > 0 ? Math.max(...rubricRows.map(r => r.id)) + 1 : 1;
    setRubricRows([...rubricRows, { id: newId, criteria: Array(17).fill('') }]);
  };

  const handleRemoveRubricRow = (id: number) => {
    if (rubricRows.length > 1) {
      setRubricRows(rubricRows.filter(row => row.id !== id));
    }
  };

  const handleRubricCriteriaChange = (rowId: number, cellIndex: number, value: string) => {
    setRubricRows(rubricRows.map(row => {
      if (row.id === rowId) {
        const newCriteria = [...row.criteria];
        newCriteria[cellIndex] = value;
        return { ...row, criteria: newCriteria };
      }
      return row;
    }));
  };

  const handleDownloadBriefPDF = () => {
    alert('Downloading Assessment Brief as PDF...\n\nIn a production environment, this would generate and download a PDF of the assessment brief.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#4a5568] text-white px-6 py-3">
        <h1>COM416_A_SEM1_2025/26: External examiner feedback</h1>
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
              className="py-4 text-[#0066cc] hover:text-[#004499] border-b-2 border-[#0066cc]"
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
                <h3 className="text-green-800 mb-2">Assessment Brief Signed Off - Ready to Publish</h3>
                <p className="text-sm text-green-700 mb-3">
                  This assessment brief has been reviewed and signed off by the Internal Peer Reviewer. You have been notified by email. The brief is now ready to be published to students.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadBriefPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download Assessment Brief PDF
                  </button>
                  <button
                    onClick={() => onNavigate('peer-review')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Peer Review Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-300 rounded p-8">
          <h1 className="text-center text-2xl mb-8">Assessment Brief Template</h1>

          {/* Form Fields */}
          <div className="space-y-4 mb-8">
            {/* Module Title */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Module Title:</label>
              <input
                type="text"
                value={formData.moduleTitle}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData({ ...formData, moduleTitle: newValue });
                  updateAssessmentData({ moduleTitle: newValue });
                }}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Module Code */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Module Code:</label>
              <input
                type="text"
                value={formData.moduleCode}
                onChange={(e) => setFormData({ ...formData, moduleCode: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Module Leader */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Module Leader:</label>
              <input
                type="text"
                value={formData.moduleLeader}
                onChange={(e) => setFormData({ ...formData, moduleLeader: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Level */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Level:</label>
              <input
                type="text"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Assessment Title */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Assessment Title:</label>
              <input
                type="text"
                value={formData.assessmentTitle}
                onChange={(e) => setFormData({ ...formData, assessmentTitle: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Assessment Number */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Assessment Number:</label>
              <input
                type="text"
                value={formData.assessmentNumber}
                onChange={(e) => setFormData({ ...formData, assessmentNumber: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Assessment Type */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Assessment Type:</label>
              <input
                type="text"
                value={formData.assessmentType}
                onChange={(e) => setFormData({ ...formData, assessmentType: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                placeholder="e.g., Essay, Report, Presentation, etc."
              />
            </div>

            {/* Must Pass */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Is this a 'must pass' element of assessment (Y/N):</label>
              <input
                type="text"
                value={formData.mustPass}
                onChange={(e) => setFormData({ ...formData, mustPass: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                placeholder="Y or N"
              />
            </div>

            {/* Restrictions on Time/Word Count */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Restrictions on Time/Word Count:</label>
              <input
                type="text"
                value={formData.restrictions}
                onChange={(e) => setFormData({ ...formData, restrictions: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                placeholder="e.g., 2000 words +/- 10%"
              />
            </div>

            {/* Consequence of not meeting time/word count limit */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Consequence of not meeting time/word count limit:</label>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="consequenceOption"
                      value="option1"
                      checked={formData.consequenceOption === 'option1'}
                      onChange={(e) => setFormData({ ...formData, consequenceOption: e.target.value })}
                      className="mt-1"
                    />
                    <span className="text-sm">
                      There is no penalty for submitting below the word/count limit, but you should be aware that there is a risk you may not maximise your potential mark.
                      <br /><br />
                      Assignments should be presented appropriately in line with the restrictions stated above; if an assignment exceeds the time/word count this will be taken in account in the marks given using the assessment criteria shown.
                    </span>
                  </label>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="consequenceOption"
                      value="option2"
                      checked={formData.consequenceOption === 'option2'}
                      onChange={(e) => setFormData({ ...formData, consequenceOption: e.target.value })}
                      className="mt-1"
                    />
                    <span className="text-sm">
                      It is essential that assignments keep within the time/word count limit stated above. Any work beyond the maximum time/word length permitted will be disregarded and not accounted for in the final grade.
                    </span>
                  </label>
                </div>
                <p className="text-xs text-gray-600 italic">*Please select one of the statements above</p>
              </div>
            </div>

            {/* Individual/Group */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Individual/Group:</label>
              <input
                type="text"
                value={formData.individualGroup}
                onChange={(e) => setFormData({ ...formData, individualGroup: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                placeholder="Individual or Group"
              />
            </div>

            {/* If a group */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">If a group:</label>
              <div>
                <textarea
                  value={formData.groupMarking}
                  onChange={(e) => setFormData({ ...formData, groupMarking: e.target.value })}
                  className="w-full h-24 p-3 border border-gray-300 bg-gray-100"
                  placeholder="Clearly state here how marks are identified for each student, do they all get the same mark or what evidence will be used to differentiate marks? You must not use the team discretion, marking must be based on evidence and linked to the learning outcomes."
                />
                <p className="text-xs text-gray-600 mt-1 italic">
                  Clearly state here how marks are identified for each student. Marking must be based on evidence and linked to the learning outcomes.
                </p>
              </div>
            </div>

            {/* Assessment Weighting */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Assessment Weighting:</label>
              <input
                type="text"
                value={formData.assessmentWeighting}
                onChange={(e) => setFormData({ ...formData, assessmentWeighting: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                placeholder="e.g., 100%"
              />
            </div>

            {/* Issue Date */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Issue Date:</label>
              <input
                type="text"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                placeholder="e.g., Monday 1st January 2026"
              />
            </div>

            {/* Hand In Date */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Hand In Date:</label>
              <input
                type="text"
                value={formData.handInDate}
                onChange={(e) => setFormData({ ...formData, handInDate: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                placeholder="e.g., Friday 15th March 2026, 4:00pm"
              />
            </div>

            {/* Planned Feedback Date */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Planned Feedback Date:</label>
              <input
                type="text"
                value={formData.plannedFeedbackDate}
                onChange={(e) => setFormData({ ...formData, plannedFeedbackDate: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                placeholder="e.g., Within 20 working days"
              />
            </div>

            {/* Mode of Submission */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Mode of Submission:</label>
              <div>
                <input
                  type="text"
                  value={formData.modeOfSubmission}
                  onChange={(e) => setFormData({ ...formData, modeOfSubmission: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 bg-gray-100 mb-2"
                  placeholder="Hard copy/on-line/presentation/viva/DVD/audio file"
                />
                <p className="text-xs text-gray-600 italic">
                  (delete as appropriate. It is expected that each assessment will have just one assessment point and method)
                </p>
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm">
                    Only <strong>FINAL submissions</strong> will be accepted. <strong>DRAFT submissions</strong> will not be considered an attempt and will not be marked.
                  </p>
                </div>
              </div>
            </div>

            {/* Anonymous Marking */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Anonymous Marking:</label>
              <div className="space-y-2">
                <p className="text-sm mb-2">This assessment:</p>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="anonymousMarking"
                    value="anonymous"
                    checked={formData.anonymousMarking === 'anonymous'}
                    onChange={(e) => setFormData({ ...formData, anonymousMarking: e.target.value })}
                  />
                  <span className="text-sm">(a) Will be marked anonymously</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="anonymousMarking"
                    value="exempt"
                    checked={formData.anonymousMarking === 'exempt'}
                    onChange={(e) => setFormData({ ...formData, anonymousMarking: e.target.value })}
                  />
                  <span className="text-sm">(b) Is exempt from anonymous marking</span>
                </label>
                <p className="text-xs text-gray-600 italic">(delete as appropriate)</p>
              </div>
            </div>

            {/* Assessment Task */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Assessment Task:</label>
              <div>
                <textarea
                  value={formData.assessmentTask}
                  onChange={(e) => setFormData({ ...formData, assessmentTask: e.target.value })}
                  className="w-full h-40 p-3 border border-gray-300 bg-gray-100"
                  placeholder="Enter task details here."
                />
                <p className="text-xs text-gray-600 mt-1 italic">
                  Enter task details here.
                </p>
              </div>
            </div>

            {/* Assessment Criteria */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Assessment criteria:</label>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 bg-[#2d3748] text-white p-2 w-48">Learning Outcomes</th>
                      <th colSpan={4} className="border border-gray-400 bg-[#6b9d3e] text-white p-2">
                        <div>1<sup>st</sup> (Distinction)</div>
                        <div className="text-sm">70-100</div>
                      </th>
                      <th colSpan={3} className="border border-gray-400 bg-[#a0622f] text-white p-2">
                        <div>2:1 (Merit)</div>
                        <div className="text-sm">60-69</div>
                      </th>
                      <th colSpan={3} className="border border-gray-400 bg-[#8b6f3d] text-white p-2">
                        <div>2:2 (Pass)</div>
                        <div className="text-sm">50-59</div>
                      </th>
                      <th colSpan={3} className="border border-gray-400 bg-[#6d5730] text-white p-2">
                        <div>3<sup>rd</sup> (Pass)</div>
                        <div className="text-sm">40-49</div>
                      </th>
                      <th colSpan={4} className="border border-gray-400 bg-[#c96c6c] text-white p-2">
                        <div>Fail</div>
                        <div className="text-sm">0-39</div>
                      </th>
                      <th className="border border-gray-400 bg-[#2d3748] text-white p-2 w-20">Actions</th>
                    </tr>
                    <tr>
                      <th className="border border-gray-400 bg-[#2d3748] text-white p-1"></th>
                      {/* 1st grade numbers */}
                      <th className="border border-gray-400 bg-[#6b9d3e] text-white p-1 text-sm w-12">10</th>
                      <th className="border border-gray-400 bg-[#6b9d3e] text-white p-1 text-sm w-12">9</th>
                      <th className="border border-gray-400 bg-[#6b9d3e] text-white p-1 text-sm w-12">8</th>
                      <th className="border border-gray-400 bg-[#6b9d3e] text-white p-1 text-sm w-12">7</th>
                      {/* 2:1 grade numbers */}
                      <th className="border border-gray-400 bg-[#a0622f] text-white p-1 text-sm w-12">6</th>
                      <th className="border border-gray-400 bg-[#a0622f] text-white p-1 text-sm w-12">5</th>
                      <th className="border border-gray-400 bg-[#a0622f] text-white p-1 text-sm w-12"></th>
                      {/* 2:2 grade numbers */}
                      <th className="border border-gray-400 bg-[#8b6f3d] text-white p-1 text-sm w-12"></th>
                      <th className="border border-gray-400 bg-[#8b6f3d] text-white p-1 text-sm w-12"></th>
                      <th className="border border-gray-400 bg-[#8b6f3d] text-white p-1 text-sm w-12"></th>
                      {/* 3rd grade numbers */}
                      <th className="border border-gray-400 bg-[#6d5730] text-white p-1 text-sm w-12"></th>
                      <th className="border border-gray-400 bg-[#6d5730] text-white p-1 text-sm w-12"></th>
                      <th className="border border-gray-400 bg-[#6d5730] text-white p-1 text-sm w-12"></th>
                      {/* Fail grade numbers */}
                      <th className="border border-gray-400 bg-[#c96c6c] text-white p-1 text-sm w-12">3</th>
                      <th className="border border-gray-400 bg-[#c96c6c] text-white p-1 text-sm w-12">2</th>
                      <th className="border border-gray-400 bg-[#c96c6c] text-white p-1 text-sm w-12"></th>
                      <th className="border border-gray-400 bg-[#c96c6c] text-white p-1 text-sm w-12">0</th>
                      <th className="border border-gray-400 bg-[#2d3748] text-white p-1"></th>
                    </tr>
                    <tr>
                      <th className="border border-gray-400 bg-[#2d3748] text-white p-1"></th>
                      {/* 1st percentages */}
                      <th className="border border-gray-400 bg-[#6b9d3e] text-white p-1 text-xs">100</th>
                      <th className="border border-gray-400 bg-[#6b9d3e] text-white p-1 text-xs">92</th>
                      <th className="border border-gray-400 bg-[#6b9d3e] text-white p-1 text-xs">83</th>
                      <th className="border border-gray-400 bg-[#6b9d3e] text-white p-1 text-xs">74</th>
                      {/* 2:1 percentages */}
                      <th className="border border-gray-400 bg-[#a0622f] text-white p-1 text-xs">68</th>
                      <th className="border border-gray-400 bg-[#a0622f] text-white p-1 text-xs">65</th>
                      <th className="border border-gray-400 bg-[#a0622f] text-white p-1 text-xs">62</th>
                      {/* 2:2 percentages */}
                      <th className="border border-gray-400 bg-[#8b6f3d] text-white p-1 text-xs">58</th>
                      <th className="border border-gray-400 bg-[#8b6f3d] text-white p-1 text-xs">55</th>
                      <th className="border border-gray-400 bg-[#8b6f3d] text-white p-1 text-xs">52</th>
                      {/* 3rd percentages */}
                      <th className="border border-gray-400 bg-[#6d5730] text-white p-1 text-xs">48</th>
                      <th className="border border-gray-400 bg-[#6d5730] text-white p-1 text-xs">45</th>
                      <th className="border border-gray-400 bg-[#6d5730] text-white p-1 text-xs">42</th>
                      {/* Fail percentages */}
                      <th className="border border-gray-400 bg-[#c96c6c] text-white p-1 text-xs">35</th>
                      <th className="border border-gray-400 bg-[#c96c6c] text-white p-1 text-xs">20</th>
                      <th className="border border-gray-400 bg-[#c96c6c] text-white p-1 text-xs">15</th>
                      <th className="border border-gray-400 bg-[#c96c6c] text-white p-1 text-xs">0</th>
                      <th className="border border-gray-400 bg-[#2d3748] text-white p-1"></th>
                    </tr>
                    <tr className="text-xs">
                      <th className="border border-gray-400 bg-[#2d3748] text-white p-2"></th>
                      <th colSpan={4} className="border border-gray-400 bg-[#6b9d3e] text-white p-2">
                        Extraordinary, flawless, publishable (or industry standard). Superb, outstanding, original. Articulated, highly impressive, excellent. Strong, proficient, very good
                      </th>
                      <th colSpan={3} className="border border-gray-400 bg-[#a0622f] text-white p-2">
                        Competent, good, effective, capable
                      </th>
                      <th colSpan={3} className="border border-gray-400 bg-[#8b6f3d] text-white p-2">
                        Reasonable, fair, appropriate
                      </th>
                      <th colSpan={3} className="border border-gray-400 bg-[#6d5730] text-white p-2">
                        Basic, satisfactory, acceptable
                      </th>
                      <th colSpan={4} className="border border-gray-400 bg-[#c96c6c] text-white p-2">
                        Fail, doesn't meet pass threshold. Inadequate, poor, unsatisfactory, limited, incomplete. Learning outcomes not achieved
                      </th>
                      <th className="border border-gray-400 bg-[#2d3748] text-white p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rubricRows.map(row => (
                      <tr key={row.id}>
                        <td className="border border-gray-400 bg-[#2d3748] text-white p-2 text-center">{row.id}</td>
                        {/* 1st columns */}
                        <td className="border border-gray-400 bg-[#5a7c33] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[0]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 0, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#5a7c33] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[1]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 1, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#5a7c33] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[2]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 2, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#5a7c33] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[3]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 3, e.target.value)}
                          />
                        </td>
                        {/* 2:1 columns */}
                        <td className="border border-gray-400 bg-[#7d4d24] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[4]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 4, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#7d4d24] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[5]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 5, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#7d4d24] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[6]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 6, e.target.value)}
                          />
                        </td>
                        {/* 2:2 columns */}
                        <td className="border border-gray-400 bg-[#6d5730] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[7]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 7, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#6d5730] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[8]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 8, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#6d5730] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[9]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 9, e.target.value)}
                          />
                        </td>
                        {/* 3rd columns */}
                        <td className="border border-gray-400 bg-[#5a4527] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[10]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 10, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#5a4527] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[11]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 11, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#5a4527] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[12]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 12, e.target.value)}
                          />
                        </td>
                        {/* Fail columns */}
                        <td className="border border-gray-400 bg-[#a85b5b] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[13]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 13, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#a85b5b] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[14]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 14, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#a85b5b] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[15]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 15, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-[#a85b5b] p-2">
                          <textarea 
                            className="w-full h-20 bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder=""
                            value={row.criteria[16]}
                            onChange={(e) => handleRubricCriteriaChange(row.id, 16, e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 bg-white p-2 text-center">
                          {rubricRows.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveRubricRow(row.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-600 mt-2 italic">
                  Please fill in the assessment criteria for each learning outcome and grade band.
                </p>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleAddRubricRow}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    + Add Row
                  </button>
                </div>
              </div>
            </div>

            {/* Use of AI in this Assessment */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Use of AI in this Assessment:</label>
              <div>
                <div className="mb-3 p-4 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm mb-2">
                    Generative AI is permitted at Solent University under specific conditions and must continue to follow the university's rules around Academic Misconduct and the AI and Academic Integrity policy. In this assessment, you are allowed to use AI for the following tasks:
                  </p>
                </div>
                <textarea
                  value={formData.aiGuidance}
                  onChange={(e) => setFormData({ ...formData, aiGuidance: e.target.value })}
                  className="w-full h-32 p-3 border border-gray-300 bg-gray-100 mb-2"
                  placeholder="Please add in your own guidance for students on what constitutes acceptable use of AI in this assignment (e.g. planning, outlining, research, etc.). You may also want to clarify what would be unacceptable."
                />
                <p className="text-xs text-gray-600 italic">
                  Please add in your own guidance for students on what constitutes acceptable use of AI in this assignment (e.g. planning, outlining, research, etc.). You may also want to clarify what would be unacceptable.
                </p>
              </div>
            </div>

            {/* AI and Academic Integrity Policy */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">AI and Academic Integrity Policy:</label>
              <input
                type="text"
                value={formData.aiPolicy}
                onChange={(e) => setFormData({ ...formData, aiPolicy: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
                placeholder="Link to AI and Academic Integrity Policy"
              />
            </div>

            {/* Learning Outcomes */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Learning Outcomes:</label>
              <div>
                <p className="text-sm mb-2 italic">
                  This assessment will enable you to demonstrate in full or in part your fulfilment of the following learning outcomes identified in the Module Descriptor:
                </p>
                <div className="space-y-3">
                  {learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-sm mt-2 w-6">{index + 1}.</span>
                      <input
                        type="text"
                        value={outcome}
                        onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                        className="flex-1 border border-gray-300 px-3 py-2 bg-gray-100"
                        placeholder={`Learning outcome ${index + 1}`}
                      />
                      {learningOutcomes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLearningOutcome(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddLearningOutcome}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    + Add Learning Outcome
                  </button>
                </div>
              </div>
            </div>

            {/* Living CV */}
            <div className="grid grid-cols-[300px_1fr] gap-4 items-start">
              <label className="text-left pt-2">Living CV:</label>
              <div>
                <p className="text-sm mb-3">
                  As part of the University's Work Ready, Future Ready strategy, you will be expected to build a professional, Living CV as you successfully engage and pass each module of your degree.
                </p>
                <p className="text-sm mb-2">
                  The Living CV outputs evidenced on completion of this assessment are:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-sm mt-2">1.</span>
                    <input
                      type="text"
                      value={formData.livingCV1}
                      onChange={(e) => setFormData({ ...formData, livingCV1: e.target.value })}
                      className="flex-1 border border-gray-300 px-3 py-2 bg-gray-100"
                      placeholder="Living CV output 1"
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm mt-2">2.</span>
                    <input
                      type="text"
                      value={formData.livingCV2}
                      onChange={(e) => setFormData({ ...formData, livingCV2: e.target.value })}
                      className="flex-1 border border-gray-300 px-3 py-2 bg-gray-100"
                      placeholder="Living CV output 2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information Section */}
          <div className="mb-8 p-6 bg-gray-50 border-l-4 border-blue-600">
            <h2 className="text-xl mb-4">Important Information</h2>

            <h3 className="mb-3">Solent University Academic Regulations 2025-26</h3>
            <h4 className="mb-2">Late Submissions</h4>
            <p className="text-sm mb-2">You are reminded that:</p>
            <ul className="list-none mb-4 space-y-1 text-sm">
              <li className="ml-4">i. If this assessment is submitted late i.e. within 7 calendar days of the submission deadline, the mark will be capped at 40% if a pass mark is achieved;</li>
              <li className="ml-4">ii. If this assessment is submitted later than 7 calendar days after the submission deadline, the work will be regarded as a non-submission and will be awarded a zero;</li>
              <li className="ml-4">iii. If this assessment is being submitted as a referred piece of work, then it must be submitted by the deadline date; any Refer assessment submitted late will be regarded as a non-submission and will be awarded a zero.</li>
            </ul>

            <h4 className="mb-2">Assessment regulations</h4>
            <h4 className="mb-2">Extenuating Circumstances</h4>
            <p className="text-sm mb-2">
              The University's Extenuating Circumstances (EC) procedure is in place if there are genuine short term exceptional circumstances that may prevent you submitting an assessment. You are able to self-certify for up to two assessment dates in any semester without supporting evidence for an extension of up to seven calendar days for coursework or to defer an exam to the resit period.
            </p>
            <p className="text-sm mb-2">
              Alternatively, if you are not 'fit to study' (or you have used up your two self-certification opportunities), you can request:
            </p>
            <ul className="list-disc ml-8 mb-2 space-y-1 text-sm">
              <li>an extension to the submission deadline of 7 calendar days, or</li>
              <li>a request to submit the assessment at the next opportunity, i.e. the resit period (as a Defer without capping of the grade).</li>
            </ul>
            <p className="text-sm mb-2">
              In both instances you must submit an EC application with relevant evidence. If accepted under the university regulations there will be no academic penalty for late submission or non-submission dependent on what is requested. You are reminded that EC covers only short-term issues (20 working days) and that if you experience longer term matters that impact on your learning then you must contact the Student Hub for advice.
            </p>
            <p className="text-sm mb-4">
              Please find a link to the EC policy below:
            </p>
            <p className="text-sm mb-4">
              <a href="#" className="text-[#0066cc] hover:text-[#004499] underline">Extenuating Circumstances</a>
            </p>

            <h4 className="mb-2">Academic Misconduct</h4>
            <p className="text-sm mb-2">
              Any submission must be your own work and, where facts or ideas have been used from other sources, these sources must be appropriately referenced. The University's Academic Regulations includes the definitions of all practices that will be deemed to constitute academic misconduct. You should check this link before submitting your work.
            </p>
            <p className="text-sm mb-4">
              Procedures relating to student academic misconduct are given below:
            </p>
            <p className="text-sm mb-4">
              <a href="#" className="text-[#0066cc] hover:text-[#004499] underline">Academic Misconduct</a>
            </p>

            <h4 className="mb-2">Ethics Policy</h4>
            <p className="text-sm mb-2">
              The work being carried out must be in compliance with the university Ethics Policy. Where there is an ethical issue, as specified within the Ethics Policy, then you will need an ethics release or ethics approval prior to the start of the project.
            </p>
            <p className="text-sm mb-2">
              <a href="#" className="text-[#0066cc] hover:text-[#004499] underline">Ethics Page</a><br />
              <a href="#" className="text-[#0066cc] hover:text-[#004499] underline">Ethics Policy</a>
            </p>

            <h4 className="mb-2 mt-4">Grade marking</h4>
            <p className="text-sm mb-2">
              The University uses a numeric grade scale for the marking of assessments. More detailed information on grade marking and the grade scale can be found on the portal and in the Student Handbook.
            </p>
            <p className="text-sm mb-4">
              <a href="#" className="text-[#0066cc] hover:text-[#004499] underline">Grade Marking Scale</a>
            </p>

            <h4 className="mb-2">Guidance for online submission through Solent Online Learning (SOL)</h4>
            <p className="text-sm mb-2">
              <a href="#" className="text-[#0066cc] hover:text-[#004499] underline">Online Submission</a>
            </p>
          </div>

          {/* Internal Peer Reviewer Selection */}
          <div className="mb-8">
            <h2 className="bg-gray-200 px-4 py-2 mb-4">Peer Review</h2>
            <div className="grid grid-cols-[200px_1fr] gap-4">
              <label className="text-right pt-2">Internal Peer Reviewer:</label>
              <select
                value={formData.internalPeerReviewer}
                onChange={(e) => setFormData({ ...formData, internalPeerReviewer: e.target.value })}
                className="border border-gray-300 px-3 py-2 bg-gray-100"
              >
                {peerReviewers.map((reviewer, index) => (
                  <option key={index} value={reviewer}>
                    {reviewer}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-600 mt-2 ml-[200px]">
              Select an internal peer reviewer who will review this assessment brief.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSaveDraft}
                className="px-8 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Save as Draft
              </button>
              <button
                onClick={handleSubmitForReview}
                className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Submit for Peer Review
              </button>
              <button
                onClick={handleDownloadBriefPDF}
                className="px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Download as PDF
              </button>
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Click "Submit for Peer Review" to notify the selected Internal Peer Reviewer by email.
            </p>
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
            Assessment Brief
          </a>
          <span className="text-gray-400">/</span>
          <a href="#" className="text-[#0066cc] hover:text-[#004499]">
            Assessment Brief Template
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