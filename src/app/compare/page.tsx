import { PrimaryCta } from "@/components/cta";
import { ContentList } from "@/components/content-list";
import { getAllPosts } from "@/lib/content";

export const metadata = {
  title: "Compare — Callbox",
  description: "See how Callbox compares to other AI lead qualification and sales automation platforms.",
};

export default async function ComparePage() {
  const posts = await getAllPosts("compare");

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">
        {/* Header Section */}
        <div className="relative pt-32 pb-20 border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Compare
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              Understand how Callbox stacks up against other solutions in the market and why leading teams choose us for their sales automation needs.
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            {posts.length > 0 ? (
              <ContentList posts={posts} type="compare" />
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400">No comparison articles yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-24 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                See for yourself why Callbox is better
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Book a demo and see how Callbox stacks up against the competition with your own data.
              </p>
              <PrimaryCta>Get Started Free</PrimaryCta>
            </div>
          </div>
        </div>
    </main>
  );
}
