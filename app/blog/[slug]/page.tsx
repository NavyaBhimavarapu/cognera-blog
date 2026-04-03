"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { notFound } from "next/navigation"
import { articles } from "@/data/articles"
import { ReadingProgress } from "@/components/ReadingProgress"

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
      {/* Reading progress bar */}
      <ReadingProgress />

      {/* Body — no top bar, just two columns */}
      <div className="flex flex-col md:flex-row flex-1">

        {/* ── LEFT: Article content ── */}
        <article className="flex-1 md:w-[70%] bg-[#F5F7FA] px-6 md:px-12 lg:px-20 py-12 md:py-16">

          {/* Back button — sits naturally at top of content */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium transition-all duration-200 group mb-10"
            style={{
              background: "#101C26",
              border: "1px solid rgba(123,108,217,0.3)",
              borderRadius: "999px",
              padding: "7px 18px 7px 14px",
              color: "#8a9bb0",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#7B6CD9"
              ;(e.currentTarget as HTMLButtonElement).style.color = "#fff"
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(123,108,217,0.3)"
              ;(e.currentTarget as HTMLButtonElement).style.color = "#8a9bb0"
            }}
          >
            <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
            Back to Blog
          </button>

          {/* Category */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#7B6CD9] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B6CD9] inline-block" />
            {article.category}
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-[#010D26] leading-[1.15] tracking-tight max-w-2xl"
          >
            {article.title}
          </motion.h1>

          {/* Excerpt — pull quote */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6 text-lg text-[#344859] leading-relaxed max-w-xl"
            style={{
              borderLeft: "3px solid #7B6CD9",
              paddingLeft: "18px",
              borderRadius: 0,
            }}
          >
            {article.excerpt}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 mb-10 h-px max-w-2xl origin-left"
            style={{ background: "linear-gradient(to right, rgba(123,108,217,0.3), transparent)" }}
          />

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl space-y-7"
          >
            {paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: i === 0 ? "18px" : "17px",
                  fontWeight: i === 0 ? 450 : 400,
                  color: i === 0 ? "#0f1e2e" : "#1a2a3a",
                  lineHeight: 1.9,
                }}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* End marker */}
          <div className="mt-16 flex items-center gap-4 max-w-2xl">
            <div className="flex-1 h-px" style={{ background: "rgba(123,108,217,0.2)" }} />
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-[#7B6CD9] opacity-60" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#7B6CD9]" />
              <div className="w-1 h-1 rounded-full bg-[#7B6CD9] opacity-60" />
            </div>
            <div className="flex-1 h-px" style={{ background: "rgba(123,108,217,0.2)" }} />
          </div>

        </article>

        {/* ── RIGHT: Sidebar ── */}
        <aside className="md:w-[30%] bg-[#101C26] px-6 md:px-8 py-10 md:py-14 flex flex-col gap-8 border-l border-[#1e2f40] md:sticky md:top-0 md:self-start md:h-screen overflow-y-auto">

          {/* Author */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7B6CD9] uppercase mb-4">
              Author
            </p>
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#270F59] flex items-center justify-center shrink-0">
                {article.author.image ? (
                  <Image
                    src={article.author.image}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-white text-base font-semibold">{initials}</span>
                )}
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-snug">
                  {article.author.name}
                </p>
                <p className="text-[#8a9bb0] text-xs mt-0.5">
                  {article.author.designation}
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#1e2f40]" />

          {/* Cover image */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7B6CD9] uppercase mb-4">
              Cover
            </p>
            <div
              className="relative w-full rounded-xl overflow-hidden flex items-center justify-center border border-[#1e2f40]"
              style={{ aspectRatio: "16/9", background: "#0A0F2C" }}
            >
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover opacity-90"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 px-4 text-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(123,108,217,0.15)",
                      border: "1px solid rgba(123,108,217,0.3)",
                    }}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#7B6CD9" strokeWidth={1.5}>
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-[#5a7080] leading-relaxed">
                    Add image URL<br />in articles.ts
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="h-px bg-[#1e2f40]" />

          {/* Article meta */}
          <div className="space-y-5">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7B6CD9] uppercase">
              Details
            </p>

            <div>
              <p className="text-[11px] text-[#5a7080] uppercase tracking-wider">Published</p>
              <p className="text-white text-sm mt-1">{article.publishedDate}</p>
            </div>

            <div>
              <p className="text-[11px] text-[#5a7080] uppercase tracking-wider">Read time</p>
              <p className="text-white text-sm mt-1">{article.readTime}</p>
            </div>

            <div>
              <p className="text-[11px] text-[#5a7080] uppercase tracking-wider">Category</p>
              <div
                className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ background: "rgba(123,108,217,0.15)" }}
              >
                <span className="w-1 h-1 rounded-full bg-[#7B6CD9]" />
                <span className="text-[#AFA9EC] text-xs font-medium">{article.category}</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#1e2f40]" />

          {/* Cognera watermark */}
          <div className="flex items-center gap-3 opacity-40 mt-auto">
            <div className="relative w-7 h-7">
              <Image
                src="/images/icon.png"
                alt="Cognera"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-white text-xs font-medium tracking-wide">Cognera</span>
          </div>

        </aside>
      </div>
    </motion.div>
  )
}