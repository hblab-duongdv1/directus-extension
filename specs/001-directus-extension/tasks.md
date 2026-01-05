# Tasks: Directus Auto-Slug Hook Extension

**Input**: Design documents from `/specs/001-directus-extension/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Manual testing only (no automated tests required for 3-hour scope)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths follow Directus extension structure: `src/` for source code, `dist/` for build output

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create extension project structure using `npx create-directus-extension@latest` (choose "hook" type, TypeScript or JavaScript)
- [X] T002 [P] Initialize Git repository in extension directory with `.gitignore` (exclude `node_modules/`, `dist/`, `.env`)
- [X] T003 [P] Verify `package.json` contains correct extension metadata (name, version, type: "hook")

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create configuration utility module `src/utils/config.ts` to load environment variables for hook configuration
- [X] T005 [P] Create slug generation utility module `src/utils/slug.ts` with function to convert text to URL-friendly slug
- [X] T006 [P] Create duplicate detection utility in `src/utils/slug.ts` to check if slug exists and append number suffix
- [X] T007 Setup error handling pattern (try-catch blocks, graceful failures) in hook implementation

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Extension Installation and Basic Functionality (Priority: P1) 🎯 MVP

**Goal**: Extension installs successfully in Directus and appears in extensions list without errors

**Independent Test**: Install extension in Directus instance, verify it appears in extensions list, confirm no errors in logs

### Implementation for User Story 1

- [X] T008 [US1] Create basic hook structure in `src/index.ts` with empty `filter('items.create', ...)` and `filter('items.update', ...)` handlers
- [X] T009 [US1] Export default function from `src/index.ts` that returns hook configuration object
- [X] T010 [US1] Build extension using `npm run build` to generate `dist/` directory
- [X] T011 [US1] Test extension installation: copy `dist/` to Directus extensions directory or use extension loading mechanism
- [X] T012 [US1] Verify extension appears in Directus Admin UI extensions list
- [X] T013 [US1] Verify extension can be enabled/disabled without errors
- [X] T014 [US1] Verify normal Directus operations continue to work with extension installed (create/update items in test collection)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently - extension installs and runs without breaking Directus

---

## Phase 4: User Story 2 - Extension Documentation and Repository (Priority: P2)

**Goal**: Comprehensive README.md with all required sections (description, why useful, installation, usage, screenshots)

**Independent Test**: Review README.md in repository, verify all sections present and clear, follow installation instructions to verify accuracy

### Implementation for User Story 2

- [X] T015 [US2] Create `README.md` in repository root with one-paragraph description of extension functionality
- [X] T016 [US2] Add "Why it's useful" section to README.md explaining the problem it solves
- [X] T017 [US2] Add "Installation" section to README.md with step-by-step instructions
- [X] T018 [US2] Add "Usage" section to README.md with configuration examples (environment variables)
- [X] T019 [US2] Add "Configuration" section to README.md explaining environment variables or config file options
- [X] T020 [US2] Add screenshots or code examples showing extension in action (if applicable)
- [X] T021 [US2] Verify README.md is clear to someone unfamiliar with the extension
- [X] T022 [US2] Initialize GitHub repository (if not already done) and push code with meaningful commit messages
- [X] T023 [US2] Verify repository is public, accessible, and cloneable

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - extension installs and documentation is complete

---

## Phase 5: User Story 3 - Auto-Slug Generation Hook (Priority: P3)

**Goal**: Hook automatically generates URL-friendly slugs from title/name fields on items.create and items.update events

**Independent Test**: Create/update item with title/name field, verify slug field is automatically populated with URL-friendly value

### Implementation for User Story 3

- [X] T024 [US3] Implement configuration loading in `src/utils/config.ts` to read collections, source fields, and slug fields from environment variables
- [X] T025 [US3] Implement slug generation function in `src/utils/slug.ts` that converts text to URL-friendly format (lowercase, replace spaces/special chars with hyphens)
- [X] T026 [US3] Implement duplicate detection in `src/utils/slug.ts` that checks if slug exists in collection and appends number suffix (-1, -2, etc.)
- [X] T027 [US3] Implement items.create hook handler in `src/index.ts` that: reads source field, generates slug, checks for duplicates, sets slug field
- [X] T028 [US3] Implement items.update hook handler in `src/index.ts` with same logic as create handler
- [X] T029 [US3] Add graceful error handling: skip slug generation if source field is missing or empty (no errors thrown)
- [X] T030 [US3] Add collection filtering: only process items from configured collections (check collection name in hook context)
- [X] T031 [US3] Test slug generation: create item with title "Hello World!" and verify slug becomes "hello-world"
- [X] T032 [US3] Test duplicate handling: create two items with same title and verify second gets "hello-world-1" slug
- [X] T033 [US3] Test missing field handling: create item without title/name field and verify no error, slug generation skipped
- [X] T034 [US3] Test update behavior: update item title and verify slug updates accordingly (or preserves existing if configured)

**Checkpoint**: All user stories should now be independently functional - extension installs, documents, and generates slugs correctly

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T035 [P] Code cleanup and refactoring: review all code for consistency and clarity
- [X] T036 [P] Add inline code comments where logic is complex (slug generation, duplicate detection)
- [X] T037 [P] Verify all environment variable names are documented in README.md
- [X] T038 [P] Test extension with multiple collections configured
- [X] T039 [P] Verify extension handles edge cases: empty strings, very long titles, special characters
- [X] T040 Final build: run `npm run build` and verify `dist/` contains all necessary files
- [X] T041 Final commit: ensure all code is committed with meaningful commit messages
- [X] T042 Repository verification: confirm repository is public, README is complete, code is accessible

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can proceed sequentially in priority order (P1 → P2 → P3)
  - US2 (Documentation) can be worked on in parallel with US3 if needed
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1 and US3
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on utilities from Phase 2, but independent of US1/US2

### Within Each User Story

- Core implementation before testing
- Configuration before hook logic
- Basic functionality before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003)
- All Foundational tasks marked [P] can run in parallel (T005, T006)
- US2 (Documentation) can be worked on in parallel with US3 implementation
- Polish tasks marked [P] can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently - extension installs and runs
5. If time allows, proceed to US2 and US3

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Verify installation (MVP!)
3. Add User Story 2 → Test independently → Verify documentation
4. Add User Story 3 → Test independently → Verify slug generation
5. Polish → Final verification

### Time Allocation (3-hour limit)

- **Phase 1 (Setup)**: 15 minutes
- **Phase 2 (Foundational)**: 30 minutes
- **Phase 3 (US1 - Installation)**: 30 minutes
- **Phase 4 (US2 - Documentation)**: 30 minutes
- **Phase 5 (US3 - Slug Generation)**: 60 minutes
- **Phase 6 (Polish)**: 15 minutes
- **Buffer**: 15 minutes

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each phase or logical group
- Stop at any checkpoint to validate story independently
- For 3-hour limit, prioritize working code over perfect code
- If running out of time, ensure US1 (installation) is complete - this is the MVP
- Avoid: over-engineering, complex features, extensive error handling beyond requirements

