/**
 * Slug generation utilities
 */

/**
 * Convert text to URL-friendly slug
 * - Convert to lowercase
 * - Replace spaces and special characters with hyphens
 * - Remove multiple consecutive hyphens
 * - Trim hyphens from start and end
 */
export function generateSlug(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, hyphens
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate unique slug by appending number suffix if duplicate exists
 * @param baseSlug - Base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  if (!baseSlug) {
    return '';
  }

  // If slug doesn't exist, return as-is
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  // Try appending number suffix until we find a unique slug
  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
}

