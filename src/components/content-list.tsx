"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PostMeta } from "@/lib/content";
import { ContentType } from "@/lib/content";

export function ContentList({
  posts,
  type,
}: {
  posts: Array<{ frontmatter: PostMeta; slug: string }>;
  type: ContentType;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map(post => (
        <motion.div key={post.slug} variants={itemVariants}>
          <Link href={`/${type}/${post.slug}`}>
            <motion.div
              whileHover={{ y: -4 }}
              className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 transition-colors hover:border-white/20 hover:bg-zinc-900/80"
            >
              {/* Cover Image */}
              <div className="relative overflow-hidden h-48 bg-zinc-800">
                <img
                  src={post.frontmatter.coverImage}
                  alt={post.frontmatter.coverAlt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <p className="text-xs text-slate-400 mb-3">
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                  {post.frontmatter.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 line-clamp-2 mb-4">
                  {post.frontmatter.description}
                </p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {post.frontmatter.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 text-xs rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
