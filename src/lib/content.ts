import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export type ContentType = 'blog' | 'compare' | 'alternatives';

export interface PostMeta {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  faqSchema?: object;
}

export interface Post {
  frontmatter: PostMeta;
  content: string;
  slug: string;
}

function getContentDir(type: ContentType): string {
  return path.join(process.cwd(), 'content', type);
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function getAllPosts(type: ContentType): Promise<Post[]> {
  const dir = getContentDir(type);

  try {
    const files = await fs.readdir(dir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async file => {
        const filePath = path.join(dir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: body } = matter(content);
        const slug = file.replace('.mdx', '');

        return {
          frontmatter: data as PostMeta,
          content: body,
          slug,
        };
      })
    );

    // Sort by date descending
    return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  } catch (error) {
    console.error(`Error reading content from ${dir}:`, error);
    return [];
  }
}

export async function getPostBySlug(type: ContentType, slug: string): Promise<Post | null> {
  const dir = getContentDir(type);
  const filePath = path.join(dir, `${slug}.mdx`);

  if (!(await fileExists(filePath))) {
    return null;
  }

  const content = await fs.readFile(filePath, 'utf-8');
  const { data, content: body } = matter(content);

  return {
    frontmatter: data as PostMeta,
    content: body,
    slug,
  };
}

export async function getAllSlugs(type: ContentType): Promise<string[]> {
  const dir = getContentDir(type);

  try {
    const files = await fs.readdir(dir);
    return files.filter(file => file.endsWith('.mdx')).map(file => file.replace('.mdx', ''));
  } catch (error) {
    console.error(`Error reading slugs from ${dir}:`, error);
    return [];
  }
}
