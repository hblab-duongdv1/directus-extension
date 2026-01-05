<!--
Sync Impact Report:
- Version change: N/A → 1.0.0 (initial constitution)
- Modified principles: N/A (new document)
- Added sections: All sections (initial creation)
- Removed sections: N/A
- Templates requiring updates:
  ✅ plan-template.md - Constitution Check section references this file
  ✅ spec-template.md - No direct references, but principles apply to all specs
  ✅ tasks-template.md - No direct references, but principles apply to all tasks
  ⚠ pending - No command templates found, will verify if created later
- Follow-up TODOs: None
-->

# Project Constitution

**Version:** 1.0.0  
**Ratified:** 2025-12-31  
**Last Amended:** 2025-12-31

## Purpose

This constitution defines the non-negotiable principles and governance rules for the Directus Extension project. All development decisions, code reviews, and architectural choices must align with these principles.

## Principles

### Simplicity First

All extensions MUST prioritize working, functional code over complex incomplete features. Simple solutions that solve real problems are preferred over elaborate architectures that remain unfinished. Every feature MUST be independently testable and deliverable as a minimum viable product (MVP).

**Rationale:** The assignment explicitly states "Simple + working + well-documented beats complex + incomplete." Time constraints (3 hours) require focused, achievable scope. Working code demonstrates problem-solving ability more effectively than ambitious but incomplete solutions.

### Documentation Excellence

Every extension MUST include a comprehensive README.md with: (1) a clear one-paragraph description of what the extension does, (2) explanation of why it's useful, (3) step-by-step installation instructions, (4) usage examples, and (5) screenshots where applicable. Documentation MUST be written for someone unfamiliar with the extension.

**Rationale:** Clear communication is an explicit evaluation criterion. The README is the primary interface for reviewers and potential users. Well-documented extensions demonstrate communication skills and make the extension actually usable.

### Time Management Discipline

All development work MUST respect the 3-hour maximum time limit. Planning phases MUST allocate time for: research (if needed), implementation, testing, documentation, and GitHub repository setup. If scope exceeds available time, features MUST be prioritized and lower-priority items deferred or removed.

**Rationale:** Time constraints are non-negotiable (3 hours max). Effective time management demonstrates planning and prioritization skills. Completing a smaller scope well is preferable to starting many features incompletely.

### Extension Standards Compliance

All code MUST follow Directus extension best practices for the chosen extension type (API: Hooks/Endpoints/Operations, or Frontend: Interfaces/Displays/Layouts/Panels/Modules). Extensions MUST run successfully in a Directus instance without breaking existing functionality. Code MUST reference official Directus documentation and follow established patterns.

**Rationale:** Extensions must integrate properly with Directus. Following official patterns ensures compatibility, maintainability, and demonstrates ability to learn and apply unfamiliar technology quickly—a key evaluation criterion.

### Public Repository Standards

The extension MUST be hosted in a public GitHub repository with a working link. Repository structure MUST be clear and organized. Code MUST be committed with meaningful commit messages. The repository MUST be accessible and cloneable by reviewers.

**Rationale:** Public GitHub repository with link is a mandatory submission requirement. Clean repository structure and commit history demonstrate professionalism and make the code review process efficient.

## Governance

### Amendment Procedure

Constitution amendments require: (1) identification of the principle or governance rule to modify, (2) justification for the change, (3) update to this document with version increment per versioning policy, (4) propagation of changes to dependent templates and documentation, and (5) update of the Sync Impact Report at the top of this file.

### Versioning Policy

Version numbers follow semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Backward incompatible changes to principles or governance (e.g., removing a principle, fundamentally changing amendment procedure)
- **MINOR**: Addition of new principles or significant expansion of existing principles
- **PATCH**: Clarifications, wording improvements, typo fixes, or non-semantic refinements that don't change meaning

Version changes MUST be documented in the Sync Impact Report at the top of this file.

### Compliance Review

Before finalizing any feature implementation, all work MUST be validated against this constitution. The Constitution Check section in implementation plans MUST be completed and pass before proceeding. Any violations MUST be explicitly justified in the Complexity Tracking section of the plan, or the work MUST be adjusted to comply.
