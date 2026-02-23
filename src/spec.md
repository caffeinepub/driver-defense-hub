# Specification

## Summary
**Goal:** Transform the Driver Defense Hub into a comprehensive block report and legal defense platform that guides drivers through documenting platform blocks, calculating financial losses, and generating personalized legal defenses with AI.

**Planned changes:**
- Replace calculator with block report form collecting platform, reason, driver data, and block date
- Add work history section to capture earnings, expenses, and automatically calculate ceased profits (lucros cessantes)
- Create calculation review screen with itemized financial loss breakdown and edit capability
- Enhance AI defense generator with block type selection and context-aware prompts incorporating block data, work history, and calculated losses with Brazilian law citations
- Add rich text editor for reviewing and customizing AI-generated legal defense
- Upgrade PDF export to comprehensive legal document with all sections: driver info, block details, work history, itemized calculations, legal defense, and signature fields
- Implement localStorage/IndexedDB auto-save for drafts with history view showing all saved reports
- Update dashboard with quick access cards for new block report, continue draft, view history, and stats showing total losses and defenses generated
- Revise all UI text to plain Portuguese with tooltips explaining legal terms
- Create seamless multi-step flow with progress indicator, back navigation, and save-at-any-step capability

**User-visible outcome:** Drivers can report a platform block, input their work history, review automatically calculated financial losses, generate a personalized AI legal defense with proper citations, edit the defense text, and export a complete professional legal document as PDF—all in a guided multi-step process that saves progress automatically and works offline without requiring login.
