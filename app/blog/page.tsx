"use client"

import { useState } from "react"
import { BlogHeader } from "@/components/BlogHeader"
import { CategoryFilter, type Filter } from "@/components/CategoryFilter"
import { BlogCard } from "@/components/BlogCard"
import { FeaturedArticle } from "@/components/FeaturedArticle"
import { articles, type Category } from "@/data/articles"

const SECTION_ORDER: Category[] = ["Insights", "Updates", "Engineering"]

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All")

  // Featured article: first article overall (or first in filtered category)
  const filteredArticles =
    activeFilter === "All"
      ? articles
      : articles.filter((a) => a.category === activeFilter)

  const featuredArticle = filteredArticles[0]
  const remainingArticles = filteredArticles.slice(1)

  return (
    <main className="min-h-screen bg-[#F5F7FA]">

      {/* Animated header */}
      <BlogHeader />

      {/* Filter tabs */}
      <div className="flex justify-center mt-8 px-4">
        <CategoryFilter active={activeFilter} onChange={setActiveFilter} />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-24 mt-12 max-w-6xl">

        {/* Featured article — always first */}
        {featuredArticle && (
          <FeaturedArticle article={featuredArticle} />
        )}

        {/* Article sections */}
        {activeFilter === "All" ? (
          SECTION_ORDER.map((category) => {
            // Exclude the featured article from appearing again
            const group = articles
              .filter((a) => a.category === category)
              .filter((a) => a.slug !== featuredArticle?.slug)

            if (group.length === 0) return null

            return (
              <section key={category} className="mb-16">

                {/* Section heading */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#e4e8ef]" />
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7B6CD9]/30 bg-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7B6CD9]" />
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#7B6CD9] uppercase">
                      {category}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#e4e8ef]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {group.map((article, i) => (
                    <BlogCard key={article.slug} article={article} index={i} />
                  ))}
                </div>

              </section>
            )
          })
        ) : (
          /* Filtered view — remaining articles after featured */
          remainingArticles.length > 0 ? (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#e4e8ef]" />
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7B6CD9]/30 bg-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7B6CD9]" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#7B6CD9] uppercase">
                    {activeFilter}
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#e4e8ef]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {remainingArticles.map((article, i) => (
                  <BlogCard key={article.slug} article={article} index={i} />
                ))}
              </div>
            </section>
          ) : null
        )}

      </div>
    </main>
  )
}