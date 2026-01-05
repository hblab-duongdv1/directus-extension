# Directus Auto-Slug Hook Extension

A Directus hook extension that automatically generates URL-friendly slugs from title or name fields when items are created or updated. This extension saves you from manually creating slugs and ensures consistent, SEO-friendly URLs across your collections.

## Why it's useful

Manually creating slugs for every item in your Directus collections is time-consuming and error-prone. This extension automatically generates URL-friendly slugs (e.g., "Hello World!" becomes "hello-world") whenever you create or update items. It handles duplicate slugs by appending number suffixes (e.g., "hello-world-1", "hello-world-2") and gracefully skips generation when source fields are missing, making your content management workflow more efficient.

## Installation

1. **Install the extension** in your Directus project:

   ```bash
   npm install directus-extension-auto-slug
   ```

   Or clone this repository and build it:

   ```bash
   git clone <repository-url>
   cd directus-extension-auto-slug
   npm install
   npm run build
   ```

2. **Copy the built extension** to your Directus extensions directory:

   ```bash
   cp -r dist /path/to/directus/extensions/hooks/auto-slug
   ```

3. **Restart your Directus instance** to load the extension.

4. **Enable the extension** in the Directus Admin UI:
   - Go to Settings → Extensions
   - Find "Auto Slug Hook" in the list
   - Toggle it to enabled

## Configuration

Configure the extension using environment variables in your Directus `.env` file:

```env
# Collections to apply slug generation (comma-separated, leave empty for all collections)
AUTO_SLUG_COLLECTIONS=articles,posts,pages

# Source field name (default: "title")
AUTO_SLUG_SOURCE_FIELD=title

# Slug field name (default: "slug")
AUTO_SLUG_FIELD=slug
```

### Configuration Options

- **AUTO_SLUG_COLLECTIONS**: Comma-separated list of collection names. If not set or empty, the extension applies to all collections.
- **AUTO_SLUG_SOURCE_FIELD**: The field name from which to generate the slug (default: `title`). Common values: `title`, `name`, `heading`.
- **AUTO_SLUG_FIELD**: The field name where the generated slug will be stored (default: `slug`).

## Usage

Once installed and configured, the extension works automatically:

1. **Create a new item** with a title or name field:
   - The extension automatically generates a slug and populates the slug field
   - Example: Title "Hello World!" → Slug "hello-world"

2. **Update an existing item**:
   - If the title/name field changes, the slug updates automatically
   - Duplicate slugs are handled by appending number suffixes

3. **Duplicate handling**:
   - If a slug already exists, the extension appends `-1`, `-2`, etc.
   - Example: "hello-world" → "hello-world-1" → "hello-world-2"

4. **Missing fields**:
   - If the source field is missing or empty, slug generation is skipped gracefully
   - No errors are thrown, the operation continues normally

### Example

```javascript
// Creating an item with title "My First Post!"
// Results in:
{
  "title": "My First Post!",
  "slug": "my-first-post"  // Automatically generated
}

// If "my-first-post" already exists:
{
  "title": "My First Post!",
  "slug": "my-first-post-1"  // Automatically appended with suffix
}
```

## Requirements

- Directus v10.0.0 or higher
- Node.js 18+ (for building the extension)

## License

MIT

# directus-extension
