export type ContentRoute = 'blog' | 'compare' | 'alternatives';

/**
 * Determines which content route a NeuroSEO post should be published to
 * based on its tags. Pure function — no side effects.
 */
export function routeFor(tags: string[]): ContentRoute {
  if (!Array.isArray(tags)) {
    return 'blog';
  }

  const tagsLower = tags.map(t => t.toLowerCase());

  if (tagsLower.includes('compare')) {
    return 'compare';
  }

  if (tagsLower.includes('alternatives')) {
    return 'alternatives';
  }

  return 'blog';
}
