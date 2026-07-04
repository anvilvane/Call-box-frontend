import { PrimaryCta } from "@/components/cta";
import { ContentList } from "@/components/content-list";
import { getAllPosts } from "@/lib/content";
import { motion } from "framer-motion";

export const metadata = {
  title: "Blog — Callbox",
  description: "Articles and guides on AI lead qualification, sales automation, and building better sales processes.",
};

export default async function BlogPage() {
  const posts = await getAllPosts("blog");

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">
        {/* Header Section */}
        <div className="relative pt-32 pb-20 border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Blog
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              Discover insights, best practices, and product updates on AI-powered lead qualification, sales automation, and building revenue-generating processes.
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            {posts.length > 0 ? (
              <ContentList posts={posts} type="blog" />
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400">No blog posts yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-24 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to automate your lead qualification?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Join leading sales teams that have switched to Callbox and increased their qualified leads by 40%.
              </p>
              <PrimaryCta>Get Started Free</PrimaryCta>
            </div>
          </div>
        </div>
    </main>
  );
}
