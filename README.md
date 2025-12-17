
  # Moderation Workflow

  This is a code bundle for Copy Design to Figma. The original project is available at https://www.figma.com/design/LopJqGSBbtyi6pGRIXJQWf/Copy-Design-to-Figma.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

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

### 4. **Internal Moderation** (Internal Moderator + Module Leader)
- Internal Moderator reviews selected samples
- Can request clarification from Module Leader (iterative loop)
- Module Leader responds to clarification requests
- Complete moderation review with sign-offs
- Optional: Franchise Partner sign-off
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
- **Franchise Partner?** - Adds additional sign-off step
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

  