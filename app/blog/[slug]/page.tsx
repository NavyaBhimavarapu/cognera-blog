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
      <ReadingProgress />

      {/* Two-column layout — right dark bg extends full height via absolute fill */}
      <div className="flex flex-col md:flex-row flex-1 min-h-screen">

        {/* ── LEFT: Article content ── */}
        <article className="flex-1 md:w-[70%] bg-[#F5F7FA] px-6 md:px-12 lg:px-20 py-12 md:py-16">

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

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#7B6CD9] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B6CD9] inline-block" />
            {article.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-[#010D26] leading-[1.15] tracking-tight max-w-2xl"
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6 text-lg text-[#344859] leading-relaxed max-w-xl"
            style={{
              borderLeft: "3px solid #7B6CD9",
              paddingLeft: "18px",
            }}
          >
            {article.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 mb-10 h-px max-w-2xl origin-left"
            style={{ background: "linear-gradient(to right, rgba(123,108,217,0.3), transparent)" }}
          />

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

        {/* ── RIGHT: Full-height dark column ── */}
        <div className="md:w-[30%] relative">

          {/* This absolutely-positioned div fills the entire column height with dark bg */}
          <div className="hidden md:block absolute inset-0 bg-[#101C26] border-l border-[#1e2f40]" />

          {/* Sticky sidebar content sits on top */}
          <aside className="relative md:sticky md:top-0 md:h-screen overflow-y-auto px-6 md:px-8 py-10 md:py-14 flex flex-col gap-8 bg-[#101C26] md:bg-transparent border-l border-[#1e2f40] md:border-0">

            {/* Author Card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #0d1829 0%, #131f30 100%)",
                border: "1px solid #1e2f40",
              }}
            >
              <div
                className="relative w-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #1a1040 0%, #0f1e35 100%)",
                  minHeight: "180px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(123,108,217,0.28) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "2px",
                    background: "linear-gradient(to right, transparent, #7B6CD9, #D288F2, transparent)",
                  }}
                />
                <div
                  className="relative rounded-full overflow-hidden flex items-center justify-center my-8"
                  style={{
                    width: 100,
                    height: 100,
                    border: "3px solid rgba(123,108,217,0.55)",
                    boxShadow: "0 0 32px rgba(123,108,217,0.35), 0 0 8px rgba(123,108,217,0.2)",
                    background: "#270F59",
                    zIndex: 1,
                    flexShrink: 0,
                  }}
                >
                  {article.author.image ? (
                    <Image
                      src={article.author.image}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-white text-3xl font-semibold">{initials}</span>
                  )}
                </div>
              </div>

              <div className="px-5 pb-6 text-center">
                <p className="text-white font-bold text-base leading-snug">
                  {article.author.name}
                </p>
                <p
                  className="text-xs mt-1 font-medium tracking-wide"
                  style={{ color: "#AFA9EC" }}
                >
                  {article.author.designation}
                </p>
                <div className="mt-4 flex justify-center">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(123,108,217,0.15)",
                      border: "1px solid rgba(123,108,217,0.25)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B6CD9]" />
                    <span className="text-[#AFA9EC] text-[11px] font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Details */}
            <div className="space-y-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7B6CD9] uppercase">
                Article Details
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[#5a7080] uppercase tracking-wider">Published</p>
                  <p className="text-white text-sm">{article.publishedDate}</p>
                </div>
                <div className="h-px bg-[#1e2f40]" />
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[#5a7080] uppercase tracking-wider">Read time</p>
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="11" height="11" viewBox="0 0 24 24"
                      fill="none" stroke="#7B6CD9" strokeWidth={2.2} strokeLinecap="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <p className="text-white text-sm">{article.readTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#1e2f40]" />

            {/* Cognera watermark */}
            <div className="flex items-center gap-3 opacity-40 mt-auto">
              <div className="relative w-7 h-7">
                <Image src="/images/icon.png" alt="Cognera" fill className="object-contain" />
              </div>
              <span className="text-white text-xs font-medium tracking-wide">Cognera</span>
            </div>

          </aside>
        </div>

      </div>
    </motion.div>
  )
}