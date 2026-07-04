import { PrimaryCta } from "@/components/cta";
import { ContentList } from "@/components/content-list";
import { getAllPosts } from "@/lib/content";

export const metadata = {
  title: "Alternatives — Callbox",
  description: "Explore alternative approaches to lead qualification and sales automation beyond traditional methods.",
};

export default async function AlternativesPage() {
  const posts = await getAllPosts("alternatives");

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">
        {/* Header Section */}
        <div className="relative pt-32 pb-20 border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-teal-500/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Alternatives
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              Learn about different approaches to lead qualification and when each method makes sense for your sales organization.
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            {posts.length > 0 ? (
              <ContentList posts={posts} type="alternatives" />
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400">No alternative articles yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-24 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Choose the best path for your team
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Whether you&apos;re just starting out or scaling, Callbox has the right solution for your sales organization.
              </p>
              <PrimaryCta>Get Started Free</PrimaryCta>
            </div>
          </div>
        </div>
    </main>
  );
}
