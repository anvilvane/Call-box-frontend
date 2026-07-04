export interface FeaturedImage {
  url: string;
  alt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NeuroSeoPayload {
  title: string;
  slug: string;
  meta_title?: string;
  meta_description: string;
  excerpt: string;
  featured_image: FeaturedImage;
  faq: FaqItem[];
  tags: string[];
  status: string;
  content: string;
  content_format: 'markdown';
}

/**
 * Escapes a string for safe inclusion in YAML frontmatter.
 * Handles quotes, colons, and special characters.
 */
function escapeYamlValue(value: string): string {
  if (!value) return '""';

  // If value contains special chars, wrap in quotes and escape internal quotes
  if (/[:"'\n\r#@[\]{},&*!|><%`]/.test(value)) {
    return `"${value.replace(/"/g, '\\"')}"`;
  }

  return value;
}

/**
 * Builds a JSON-LD FAQPage schema from FAQ items.
 * Pure function — no side effects.
 */
function buildFaqSchema(faqs: FaqItem[]): object {
  if (!faqs || faqs.length === 0) {
    return {};
  }

  const mainEntity = faqs.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

/**
 * Converts a NeuroSEO payload into a complete MDX file string (frontmatter + body).
 * Pure function — no fs/network side effects.
 */
export function mapPayloadToMdx(payload: NeuroSeoPayload): string {
  const {
    title,
    meta_description,
    slug,
    tags,
    featured_image,
    faq,
    content,
  } = payload;

  // Build FAQ schema if FAQs exist
  const faqSchema = faq && faq.length > 0 ? buildFaqSchema(faq) : undefined;

  // Build frontmatter
  const frontmatterLines: string[] = [
    '---',
    `title: ${escapeYamlValue(title)}`,
    `description: ${escapeYamlValue(meta_description)}`,
    `slug: ${escapeYamlValue(slug)}`,
    `date: ${new Date().toISOString()}`,
    `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
    `coverImage: ${escapeYamlValue(featured_image.url)}`,
    `coverAlt: ${escapeYamlValue(featured_image.alt)}`,
  ];

  // Add faqSchema if it exists
  if (faqSchema && Object.keys(faqSchema).length > 0) {
    frontmatterLines.push(`faqSchema: ${JSON.stringify(faqSchema)}`);
  }

  frontmatterLines.push('---');

  // Build body: original content + FAQ section if needed
  let body = content;

  if (faq && faq.length > 0) {
    body += '\n\n## FAQ\n';
    faq.forEach(item => {
      body += `\n### ${item.question}\n\n${item.answer}\n`;
    });
  }

  return frontmatterLines.join('\n') + '\n\n' + body;
}
