```mermaid
flowchart TD
    %% Workflow A: Pre-assessment (before semester)
    StartA([Start: Pre-assessment]) --> AB[Assessment Brief Creation]
    
    AB --> AB1[Module Leader creates<br/>assessment brief]
    AB1 --> AB2[Fill module info,<br/>assessment details,<br/>learning outcomes]
    AB2 --> AB3[Assign Internal<br/>Peer Reviewer]
    AB3 --> AB4{Brief complete?}
    AB4 -->|No| AB1
    AB4 -->|Yes| AB5[Submit for Peer Review]
    AB5 --> PR[Peer Review]
    
    PR --> PR1[Peer Reviewer evaluates<br/>and completes checklist]
    PR1 --> PR2[Add comments and
    recommendations]
    PR2 --> PR3{Peer Review approved?}
    PR3 -->|No - needs changes| AB1
    PR3 -->|Yes| PR4[ML & Reviewer sign off]
    PR4 --> EndA([End Pre-assessment<br/>Approved & Published])
    
    classDef start fill:#90EE90
    classDef endNode fill:#FFB6C1
    classDef brief fill:#E6F3FF
    classDef peer fill:#F0E6FF
    class StartA start
    class EndA endNode
    class AB,AB1,AB2,AB3,AB4,AB5 brief
    class PR,PR1,PR2,PR3,PR4 peer
```

```mermaid
flowchart TD
    %% Workflow B: Post-assessment (after grading)
    StartB([Start: Post-assessment]) --> SS[Sample Selection]
    
    SS --> SS1[Course Leader selects
    samples after grading]
    SS1 --> SS2[10% of submitted work<br/>Min 5, Max 15<br/>Select bottom, middle, top]
    SS2 --> SS3{Samples selected?}
    SS3 -->|No| SS1
    SS3 -->|Yes| SS4[Send to Internal Moderator
    📧 notification]
    SS4 --> IM[Internal Moderation]
    
    IM --> IM1[Internal Moderator reviews
    grades & feedback]
    IM1 --> IM2{Clarification needed?}
    IM2 -->|Yes| IM3[Send back to Module Leader
    📧 notification]
    IM3 --> IM4[Module Leader responds]
    IM4 --> IM2
    IM2 -->|No| IM5[Internal Moderator signs]
    IM5 --> IM6[Module Leader signs acknowledgement]
    IM6 --> IM7{Franchise Partner module?}
    IM7 -->|No| IM8{External moderation required?}
    IM7 -->|Yes| IMFP[Solent Moderator final
    compliance check]
    IMFP -->|Send back| IM3
    IMFP -->|Approve| IM8{External moderation required?}
    
    IM8 -->|No| EndB([End Post-assessment<br/>Process Complete])
    IM8 -->|Yes| EE[External Examiner]
    EE --> EE1[External Examiner reviews
    samples and answers questions]
    EE1 --> EE2[Provide recommendations
    and sign/date]
    EE2 --> EndB
    
    classDef start fill:#90EE90
    classDef endNode fill:#FFB6C1
    classDef sample fill:#FFF9E6
    classDef mod fill:#FFE6F0
    classDef external fill:#F0E6FF
    classDef warn fill:#FFE6E6
    class StartB start
    class EndB endNode
    class SS,SS1,SS2,SS3,SS4 sample
    class IM,IM1,IM2,IM3,IM4,IM5,IM6,IM7,IMFP mod
    class EE,EE1,EE2 external
    class IM3 warn
```
## Workflow Stages Overview

### 1. **Assessment Brief Creation** (Module Leader)
- Create and configure assessment details
- Set learning outcomes and AI guidance
- Assign internal peer reviewer
- Submit for peer review

### 2. **Peer Review** (Internal Peer Reviewer)
- Review assessment brief against quality criteria
- Complete compliance checklist
- Provide feedback and recommendations
- Sign off (both reviewer and module leader)

### 3. **Sample Selection** (Course Leader)
- Select representative student samples after grading
- Ensure 10% coverage with borderline cases
- Review is prepared for Internal Moderator
- Send to Internal Moderator with email notification

### 4. **Internal Moderation** (Internal Moderator + Module Leader + Solent Moderator)
- Internal Moderator reviews selected samples (post-grading)
- Can request clarification from Module Leader (iterative loop)
- Module Leader responds to clarification requests
- Complete moderation review with sign-offs
- If Franchise Partner module: Solent Moderator performs final compliance moderation (can approve or send back to franchise/module leader)
- Decision: Send to External Examiner or complete

### 5. **External Examiner Review** (External Examiner)
- Review assessment and student samples
- Answer structured review questions
- Provide feedback and recommendations
- Sign off and submit final report
- Download PDF for records

## Key Decision Points

- **Brief Complete?** - Ensures all required fields are filled
- **Peer Review Approved?** - Determines if brief needs revision
- **Samples Selected?** - Validates sample selection is complete
- **Clarification Needed?** - Triggers iterative communication loop
- **Franchise Partner?** - Adds Solent Moderator compliance step (approve or send back to franchise/module leader)
- **External Moderation Required?** - Routes to External Examiner or ends process
- **Review Complete?** - Final validation before submission

## Email Notifications

📧 Email notifications are sent at key handoff points:
- Sample Selection → Internal Moderator
- Request Clarification → Module Leader
- Internal Moderation → External Examiner

## Data Flow

All pages share the same `AssessmentData` state, ensuring:
- Module information propagates across all pages
- Student samples are consistent
- Sign-offs are tracked
- Clarification history is maintained

## State Read/Write Map

- Assessment Brief Creation
    - Reads: `peerReviewSignedOff`
    - Writes: `moduleTitle`, `moduleCode`, `moduleLeader`, `level`, `assessmentTitle`, `assessmentNumber`, `assessmentType`, `mustPass`, `restrictions`, `consequenceOption`, `individualGroup`, `groupMarking`, `assessmentWeighting`, `issueDate`, `handInDate`, `plannedFeedbackDate`, `modeOfSubmission`, `anonymousMarking`, `assessmentTask`, `assessmentCriteria`, `aiGuidance`, `aiPolicy`, `learningOutcomes`, `livingCV1`, `livingCV2`, `internalPeerReviewer`

- Peer Review (Module Leader / Peer Reviewer / ML Sent Back / ML Signed Off)
    - Reads: brief fields listed above
    - Writes: `peerReviewComments`, `peerReviewChecks`, `moduleLeaderComments`, `peerReviewerOverallComments`, `moduleLeaderResponseToReviewer`, `passGrade`, `aggregated`, `peerReviewSignedOff`, `peerReviewSentBack`, `moduleLeaderSignature`, `peerReviewDate`, `peerReviewerDate`

- Sample Selection
    - Reads: `moduleTitle`, `moduleCode`, `moduleLeader`, `level`, `academicYear`, `semester`
    - Writes: `internalModeratorName` (on send); optionally uses local `studentSamples`

- Internal Moderation (Moderator / ML Sent Back / ML Signed Off)
    - Reads: `studentSamples` and module info
    - Writes: `gradesAppropriate`, `additionalComments`, `moduleLeaderResponse`, `internalModeratorName`, `internalModeratorDate`, `moduleLeaderSignName`, `moduleLeaderSignDate`, `franchisePartnerName`, `franchisePartnerDate`, `isFranchisePartner`, `requiresExternalModeration`, `internalModerationComplete`, `internalModerationStatus`, `internalModerationMLResponse`
    - Solent Moderator view additionally writes: `solentModeratorComments`

- External Examiner
    - Reads: module info and samples
    - Current implementation: manages `externalExaminerSignature` and `externalExaminerDate` locally inside `FeedbackForm` (not persisted to `AssessmentData` yet); submission toggles a local `isSubmitted` state.

## Navigation Triggers

- `onNavigate('peer-review')`: From Assessment Brief to Peer Review
- `onNavigate('sample-selection')`: Top-tab navigation; flow proceeds after Peer Review
- `onNavigate('internal-moderation')`: From Sample Selection “Send to Moderator”
- `onNavigate('feedback')`: Top-tab navigation; typically after Internal Moderation

All navigation is handled by `App.tsx` via a single `currentPage` state—no URL routing.