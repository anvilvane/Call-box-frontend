import { getPostBySlug, getAllSlugs } from "@/lib/content";
import { ContentDetail } from "@/components/content-detail";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getAllSlugs("alternatives");
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug("alternatives", params.slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.frontmatter.title} — Callbox Alternatives`,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      image: post.frontmatter.coverImage,
      type: "article",
      publishedTime: post.frontmatter.date,
    },
  };
}

export default async function AlternativesDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug("alternatives", params.slug);

  if (!post) {
    notFound();
  }

  return <ContentDetail post={post} />;
}
