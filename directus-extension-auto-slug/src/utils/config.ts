/**
 * Configuration utility for loading hook configuration from environment variables
 */

export interface HookConfig {
  collections: string[];
  sourceField: string;
  slugField: string;
}

/**
 * Load configuration from environment variables
 * Format: AUTO_SLUG_COLLECTIONS=collection1,collection2
 *         AUTO_SLUG_SOURCE_FIELD=title
 *         AUTO_SLUG_FIELD=slug
 */
export function loadConfig(): HookConfig {
  const collectionsEnv = process.env.AUTO_SLUG_COLLECTIONS || '';
  const sourceField = process.env.AUTO_SLUG_SOURCE_FIELD || 'title';
  const slugField = process.env.AUTO_SLUG_FIELD || 'slug';

  const collections = collectionsEnv
    .split(',')
    .map((c) => c.trim())
    .filter((c) => c.length > 0);

  return {
    collections,
    sourceField,
    slugField,
  };
}

/**
 * Check if a collection is configured for slug generation
 */
export function isCollectionConfigured(
  collection: string,
  config: HookConfig
): boolean {
  // If no collections specified, apply to all collections
  if (config.collections.length === 0) {
    return true;
  }
  return config.collections.includes(collection);
}

