# Implementation Plan: Directus Auto-Slug Hook Extension

**Branch**: `001-directus-extension` | **Date**: 2025-12-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-directus-extension/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a Directus API Hook extension that automatically generates URL-friendly slugs from title/name fields when items are created or updated. The extension listens to `items.create` and `items.update` events, transforms source field values into URL-friendly slugs, handles duplicates by appending number suffixes, and gracefully skips generation when source fields are missing. Configuration is managed via environment variables for simplicity and quick setup.

**Technical Approach**: Use Directus extension scaffolding to create a hook extension, implement slug generation logic with duplicate detection, configure via environment variables, and provide comprehensive documentation.

## Technical Context

**Language/Version**: TypeScript 5.x (or JavaScript ES2020+)  
**Primary Dependencies**: 
- `@directus/extensions-sdk` (Directus extension SDK)
- `@directus/types` (TypeScript types for Directus)
- Node.js 18+ runtime

**Storage**: N/A (extension reads/writes to Directus database via API, no local storage needed)  
**Testing**: Manual testing in Directus instance (no automated test framework required for 3-hour scope)  
**Target Platform**: Directus instance (Node.js runtime, compatible with Directus v10+)  
**Project Type**: Single project (Directus extension package)  
**Performance Goals**: Hook execution should complete in <100ms per item operation to avoid blocking Directus operations  
**Constraints**: 
- 3-hour maximum development time
- Must work with Directus v10+ (minimum supported version)
- No breaking changes to existing Directus functionality
- Simple configuration (environment variables or config file)
- Graceful error handling (no crashes on invalid input)

**Scale/Scope**: 
- Single extension package
- Configurable for multiple collections
- Handles concurrent operations (Directus handles concurrency)
- No state management required (stateless hook)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Simplicity First ✅
- **Status**: PASS
- **Rationale**: Extension focuses on single, well-defined functionality (auto-slug generation). No complex architecture or multiple features. MVP is achievable within 3 hours.

### Documentation Excellence ✅
- **Status**: PASS
- **Rationale**: README.md is a mandatory requirement (FR-006). Plan allocates time for comprehensive documentation with all required sections.

### Time Management Discipline ✅
- **Status**: PASS
- **Rationale**: Plan prioritizes core functionality (hook implementation) over optional features. Documentation and repository setup are included in time allocation. Scope is realistic for 3-hour limit.

### Extension Standards Compliance ✅
- **Status**: PASS
- **Rationale**: Extension follows Directus API Hook extension patterns using `filter()` API. Uses official Directus extension SDK and scaffolding tools. No custom patterns that could break compatibility.

### Public Repository Standards ✅
- **Status**: PASS
- **Rationale**: GitHub repository with proper structure is a mandatory requirement (FR-005, FR-008). Plan includes repository setup and commit message standards.

**Overall Constitution Compliance**: ✅ ALL PRINCIPLES SATISFIED

## Project Structure

### Documentation (this feature)

```text
specs/001-directus-extension/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification
└── README.md            # Extension documentation (in repository root)
```

### Source Code (repository root)

```text
directus-extension-auto-slug/
├── src/
│   ├── index.ts         # Main hook implementation
│   └── utils/
│       ├── slug.ts      # Slug generation utility functions
│       └── config.ts    # Configuration loading (env vars/config file)
├── package.json         # Extension metadata and dependencies
├── .gitignore           # Git ignore rules
├── tsconfig.json        # TypeScript configuration (if using TS)
├── README.md            # Extension documentation
└── dist/                # Built extension (generated, not committed)
```

**Structure Decision**: Single project structure following Directus extension conventions. Source code in `src/` directory with utilities separated for maintainability. Build output in `dist/` directory (standard for Directus extensions).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. All constitution principles are satisfied with the planned approach.

