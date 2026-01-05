# Feature Specification: Directus Extension

**Feature Branch**: `001-directus-extension`  
**Created**: 2025-12-31  
**Status**: Draft  
**Input**: User description: "Build a Directus extension"

## Clarifications

### Session 2025-12-31

- Q: What type of Directus extension are you building? → A: API Extension - Hook (runs on specific Directus events)
- Q: What problem does this hook solve or what gap does it fill? → A: Item create/update hook with data validation or transformation
- Q: Which specific hook events and functionality are you implementing? → A: items.create + items.update hooks - Auto-generate URL-friendly slugs from title/name fields
- Q: How should users configure which collections and fields the hook applies to? → A: Configuration via environment variables or config file (simple, no UI needed)
- Q: How should the hook handle duplicate slugs and missing source fields? → A: Append number suffix for duplicates (slug-1, slug-2), skip generation if source field missing

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Extension Installation and Basic Functionality (Priority: P1)

A Directus administrator installs the extension in their Directus instance and verifies it works correctly. The extension provides its core functionality without breaking existing Directus operations.

**Why this priority**: This is the MVP - the extension must install and run successfully. Without this, no other functionality matters. This demonstrates the ability to create working code that integrates with Directus.

**Independent Test**: Can be fully tested by installing the extension in a fresh Directus instance, verifying it appears in the extensions list, and confirming it performs its primary function without errors.

**Acceptance Scenarios**:

1. **Given** a Directus instance is running, **When** the extension is installed via Directus extension installation process, **Then** the extension appears in the extensions list and is enabled
2. **Given** the extension is installed and enabled, **When** a user interacts with the extension's primary feature, **Then** the extension performs its intended function correctly
3. **Given** the extension is installed, **When** normal Directus operations are performed, **Then** existing Directus functionality continues to work without errors

---

### User Story 2 - Extension Documentation and Repository (Priority: P2)

A reviewer or potential user accesses the GitHub repository and understands what the extension does, why it's useful, and how to install and use it.

**Why this priority**: Documentation is a mandatory requirement and an evaluation criterion. Clear communication demonstrates problem-solving and communication skills. Without documentation, the extension cannot be properly evaluated or used.

**Independent Test**: Can be fully tested by reviewing the README.md in the GitHub repository and verifying it contains all required sections: description, why useful, installation instructions, usage examples, and screenshots (if applicable).

**Acceptance Scenarios**:

1. **Given** a user visits the GitHub repository, **When** they read the README.md, **Then** they understand what the extension does in one clear paragraph
2. **Given** a user reads the README.md, **When** they follow the installation instructions, **Then** they can successfully install the extension
3. **Given** a user has installed the extension, **When** they follow the usage examples in the README, **Then** they can use the extension's features correctly

---

### User Story 3 - Auto-Slug Generation Hook (Priority: P3)

A Directus hook listens to items.create and items.update events and automatically generates URL-friendly slugs from title or name fields when items are created or updated.

**Why this priority**: This defines the core hook functionality. Auto-slug generation is a common need in content management - it saves users from manually creating URL-friendly identifiers and ensures consistency. This demonstrates practical problem-solving within the 3-hour constraint.

**Independent Test**: Can be fully tested by creating or updating an item with a title/name field in Directus and verifying the hook automatically generates a slug field with a URL-friendly value.

**Acceptance Scenarios**:

1. **Given** the hook is installed and configured for a collection, **When** an item is created with a title or name field, **Then** the hook automatically generates a URL-friendly slug and sets it in the slug field
2. **Given** the hook is installed, **When** an item is updated and the title/name field changes, **Then** the hook updates the slug field to match the new title/name (or preserves existing slug if configured)
3. **Given** an item has a title like "Hello World!", **When** the hook generates the slug, **Then** it produces a URL-friendly value like "hello-world"
4. **Given** a generated slug already exists in the collection, **When** the hook attempts to create a duplicate slug, **Then** it appends a number suffix (e.g., "hello-world-1", "hello-world-2") until a unique slug is found
5. **Given** an item is created or updated without a source field (title/name), **When** the hook executes, **Then** it skips slug generation gracefully without throwing an error

---

### Edge Cases

- What happens when the extension is installed in a Directus instance with conflicting extensions?
- How does the extension handle Directus version compatibility (minimum supported version)?
- What happens when the extension encounters invalid input or error conditions (e.g., missing title/name field, special characters)? → Hook skips slug generation if source field is missing; special characters are converted to URL-friendly format (e.g., "Hello World!" becomes "hello-world")
- What happens when a generated slug already exists (duplicate slug handling)? → Hook appends number suffix (slug-1, slug-2, etc.) until a unique slug is found
- How does the extension handle concurrent usage by multiple users?
- What happens when Directus is restarted - does the extension maintain state correctly?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Extension MUST install successfully in a Directus instance using standard Directus extension installation methods
- **FR-002**: Extension MUST follow Directus API Hook extension best practices
- **FR-003**: Extension MUST run successfully without breaking existing Directus functionality
- **FR-004**: Extension MUST provide its core functionality as a Hook that runs on items.create and items.update events, automatically generating URL-friendly slugs from title or name fields
- **FR-005**: Extension MUST be hosted in a public GitHub repository with a working link
- **FR-006**: Extension MUST include a README.md with: (1) one-paragraph description, (2) why it's useful, (3) installation instructions, (4) usage examples, (5) screenshots where applicable
- **FR-007**: Extension code MUST be committed with meaningful commit messages
- **FR-008**: Extension repository structure MUST be clear and organized
- **FR-009**: Extension MUST be accessible and cloneable by reviewers
- **FR-010**: Extension MUST support configuration via environment variables or config file to specify which collections and fields to use for slug generation
- **FR-011**: Extension MUST handle duplicate slugs by appending number suffixes (e.g., "slug-1", "slug-2") until a unique slug is found
- **FR-012**: Extension MUST skip slug generation gracefully (without errors) when the source field (title/name) is missing or empty

### Key Entities *(include if feature involves data)*

- **Directus Items**: Items being created or updated that trigger the hook (items.create and items.update events)
- **Source Field**: The field from which the slug is generated (typically "title" or "name" field)
- **Slug Field**: The field where the generated URL-friendly slug is stored (typically "slug" field)
- **Hook Configuration**: Configuration (via environment variables or config file) specifying which collections the hook applies to and which fields to use for source (title/name) and destination (slug)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Extension installs successfully in a Directus instance without errors (100% success rate for installation)
- **SC-002**: Extension performs its primary function correctly when used (functional correctness verified through manual testing)
- **SC-003**: README.md contains all required sections (description, why useful, installation, usage, screenshots) and is clear to someone unfamiliar with the extension
- **SC-004**: Extension development and documentation completed within 3-hour time limit
- **SC-005**: GitHub repository is public, accessible, and contains working code with proper structure
- **SC-006**: Extension follows Directus extension standards and integrates without breaking existing functionality

