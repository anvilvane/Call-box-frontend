import { MDXRemote } from "next-mdx-remote/rsc";
import { PostMeta } from "@/lib/content";
import { SiteNav } from "./site-nav";
import { PrimaryCta } from "./cta";
import { SiteFooter } from "./site-footer";

export async function ContentDetail({
  post,
}: {
  post: {
    frontmatter: PostMeta;
    content: string;
  };
}) {
  const mdxComponents = {
    h1: (props: any) => (
      <h1 className="text-4xl md:text-5xl font-bold text-white mt-8 mb-6" {...props} />
    ),
    h2: (props: any) => (
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-4" {...props} />
    ),
    h3: (props: any) => (
      <h3 className="text-2xl font-bold text-emerald-300 mt-8 mb-3" {...props} />
    ),
    h4: (props: any) => (
      <h4 className="text-xl font-bold text-white mt-6 mb-2" {...props} />
    ),
    p: (props: any) => (
      <p className="text-slate-300 leading-relaxed mb-4" {...props} />
    ),
    ul: (props: any) => (
      <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4 ml-4" {...props} />
    ),
    ol: (props: any) => (
      <ol className="list-decimal list-inside text-slate-300 space-y-2 mb-4 ml-4" {...props} />
    ),
    li: (props: any) => (
      <li className="text-slate-300" {...props} />
    ),
    blockquote: (props: any) => (
      <blockquote className="border-l-4 border-emerald-400 pl-4 py-2 my-4 italic text-slate-400" {...props} />
    ),
    code: (props: any) => (
      <code className="bg-zinc-800 text-emerald-300 px-2 py-1 rounded text-sm font-mono" {...props} />
    ),
    pre: (props: any) => (
      <pre className="bg-zinc-800 text-emerald-300 p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props} />
    ),
    a: (props: any) => (
      <a className="text-emerald-400 hover:text-emerald-300 underline transition-colors" {...props} />
    ),
  };

  return (
    <>
      <SiteNav />
      <main className="relative w-full overflow-hidden bg-black text-white">
        {/* Article Container */}
        <div className="relative pt-32 pb-24">
          <div className="mx-auto max-w-3xl px-6">
            {/* Cover Image */}
            <div className="mb-12 overflow-hidden rounded-2xl border border-white/10">
              <img
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.coverAlt}
                className="h-96 w-full object-cover"
              />
            </div>

            {/* Meta */}
            <div className="mb-8">
              <p className="text-sm text-slate-400 mb-4">
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>

              <h1 className="text-5xl font-bold text-white mb-4">
                {post.frontmatter.title}
              </h1>

              <p className="text-lg text-slate-300 mb-6">
                {post.frontmatter.description}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {post.frontmatter.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-sm rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Article Content */}
            <div className="prose-invert max-w-none">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* FAQ Schema (if present) */}
            {post.frontmatter.faqSchema && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(post.frontmatter.faqSchema) }}
              />
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-24 border-t border-white/10">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to transform your sales process?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Join leading sales teams using Callbox to qualify leads and close more deals.
              </p>
              <PrimaryCta>Get Started Free</PrimaryCta>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
