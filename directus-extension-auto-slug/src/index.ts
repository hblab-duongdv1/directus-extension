import { loadConfig, isCollectionConfigured } from './utils/config.js';
import { generateSlug, generateUniqueSlug } from './utils/slug.js';

export default ({ filter }: any) => {
  const config = loadConfig();

  /**
   * Hook handler for items.create event
   * Automatically generates slug from source field when item is created
   */
  filter('items.create', async (input: any, meta: any, context: any) => {
    const { collection } = meta;
    const { database } = context;
    try {
      // Check if collection is configured for slug generation
      if (!isCollectionConfigured(collection, config)) {
        return input;
      }

      // Get source field value
      const sourceValue = input[config.sourceField];

      // Skip if source field is missing or empty
      if (!sourceValue || (typeof sourceValue === 'string' && sourceValue.trim() === '')) {
        return input;
      }

      // Generate base slug
      const baseSlug = generateSlug(String(sourceValue));

      // Skip if slug generation resulted in empty string
      if (!baseSlug) {
        return input;
      }

      // Check for existing slugs in the collection
      // Query existing items to check for duplicate slugs
      const existingItems = await database(collection)
        .select(config.slugField)
        .whereNotNull(config.slugField);

      const existingSlugs = existingItems.map((item: any) => item[config.slugField] || '');

      // Generate unique slug
      const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

      // Set slug field
      input[config.slugField] = uniqueSlug;

      return input;
    } catch (error) {
      // Graceful error handling - log error but don't break the operation
      console.error(`[auto-slug] Error generating slug for ${collection}:`, error);
      return input;
    }
  });

  /**
   * Hook handler for items.update event
   * Automatically updates slug from source field when item is updated
   */
  filter('items.update', async (input: any, meta: any, context: any) => {
    const { collection, keys } = meta;
    const { database } = context;
    try {
      // Check if collection is configured for slug generation
      if (!isCollectionConfigured(collection, config)) {
        return input;
      }

      // Get source field value
      const sourceValue = input[config.sourceField];

      // Skip if source field is missing or empty
      if (!sourceValue || (typeof sourceValue === 'string' && sourceValue.trim() === '')) {
        return input;
      }

      // Generate base slug
      const baseSlug = generateSlug(String(sourceValue));

      // Skip if slug generation resulted in empty string
      if (!baseSlug) {
        return input;
      }

      // Get existing items to check for duplicate slugs (excluding current item)
      const existingItems = await database(collection)
        .select(config.slugField)
        .whereNotNull(config.slugField)
        .whereNotIn('id', Array.isArray(keys) ? keys : [keys]);

      const existingSlugs = existingItems.map((item: any) => item[config.slugField] || '');

      // Generate unique slug
      const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

      // Set slug field
      input[config.slugField] = uniqueSlug;

      return input;
    } catch (error) {
      // Graceful error handling - log error but don't break the operation
      console.error(`[auto-slug] Error updating slug for ${collection}:`, error);
      return input;
    }
  });
};

