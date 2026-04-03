"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { notFound } from "next/navigation"
import { articles } from "@/data/articles"

interface ArticlePageProps {
  params: { slug: string }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const router = useRouter()
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) notFound()

  const initials = article.author.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const paragraphs = article.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* ── Top bar ── */}
      <div className="bg-[#F5F7FA] border-b border-[#e4e8ef] px-4 md:px-8 py-3 sticky top-0 z-20 backdrop-blur-sm">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-[#344859] hover:text-[#270F59] transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">
            ←
          </span>
          Back to Blog
        </button>
      </div>

      {/* ── Body: 70% light | 30% dark ── */}
      <div className="flex flex-col md:flex-row flex-1">

        {/* ════════════════════════════
            LEFT 70% — Article content
        ════════════════════════════ */}
        <article className="flex-1 md:w-[70%] bg-[#F5F7FA] px-6 md:px-12 lg:px-20 py-10 md:py-14">

          {/* Category label */}
          <span className="text-xs font-semibold tracking-widest text-[#7B6CD9] uppercase">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-[#010D26] leading-tight">
            {article.title}
          </h1>

          {/* Excerpt — styled as a pull quote */}
          <p className="mt-5 text-base text-[#344859] leading-relaxed border-l-2 border-[#7B6CD9] pl-4 opacity-80">
            {article.excerpt}
          </p>

          {/* Cover image */}
          <div className="mt-8 relative w-full aspect-video rounded-2xl overflow-hidden bg-[#e4e8ef] flex items-center justify-center border border-[#dde3ec]">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#b0bbc8]">
                <svg
                  width="44" height="44"
                  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={1}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-sm tracking-wide">
                  Cover image — add URL in data/articles.ts
                </span>
              </div>
            )}
          </div>

          {/* Article body */}
          <div className="mt-10 space-y-5 max-w-2xl">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-base text-[#1a2a3a] leading-[1.9]">
                {para}
              </p>
            ))}
          </div>
        </article>

        {/* ════════════════════════════
            RIGHT 30% — Sidebar
        ════════════════════════════ */}
        <aside className="md:w-[30%] bg-[#101C26] px-6 md:px-8 py-10 md:py-14 flex flex-col gap-8 border-l border-[#1e2f40] md:sticky md:top-[49px] md:self-start md:min-h-[calc(100vh-49px)]">

          {/* Author */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7B6CD9] uppercase mb-4">
              Author
            </p>

            {/* Author photo */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#270F59] flex items-center justify-center mb-3">
              {article.author.image ? (
                <Image
                  src={article.author.image}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-white text-xl font-semibold">
                  {initials}
                </span>
              )}
            </div>

            {/* Author name */}
            <p className="text-white font-semibold text-base leading-snug">
              {article.author.name}
            </p>

            {/* Author designation */}
            <p className="text-[#8a9bb0] text-sm mt-0.5">
              {article.author.designation}
            </p>
          </div>

          <div className="h-px bg-[#1e2f40]" />

          {/* Article meta */}
          <div className="space-y-5">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7B6CD9] uppercase">
              Details
            </p>

            <div>
              <p className="text-[11px] text-[#5a7080] uppercase tracking-wider">
                Published
              </p>
              <p className="text-white text-sm mt-1">{article.publishedDate}</p>
            </div>

            <div>
              <p className="text-[11px] text-[#5a7080] uppercase tracking-wider">
                Read time
              </p>
              <p className="text-white text-sm mt-1">{article.readTime}</p>
            </div>

            <div>
              <p className="text-[11px] text-[#5a7080] uppercase tracking-wider">
                Category
              </p>
              <p className="text-white text-sm mt-1">{article.category}</p>
            </div>
          </div>

          <div className="h-px bg-[#1e2f40]" />

          {/* Cognera logo watermark at bottom */}
          <div className="flex items-center gap-3 opacity-40 mt-auto">
            <div className="relative w-7 h-7">
              <Image
                src="/images/cognera-logo.png"
                alt="Cognera"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-white text-xs font-medium tracking-wide">
              Cognera
            </span>
          </div>
        </aside>
      </div>
    </motion.div>
  )
}
