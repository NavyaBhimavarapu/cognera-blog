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
      <div className="flex flex-col md:flex-row flex-1 min-h-screen">
 
        {/* ═══════════════════════════════════════
            LEFT 70% — Article content
        ═══════════════════════════════════════ */}
        <article className="flex-1 md:w-[70%] bg-[#F5F7FA] px-6 md:px-12 lg:px-20 py-10 md:py-14">
 
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium mb-10 group"
            style={{
              background: "#101C26",
              border: "1px solid rgba(123,108,217,0.3)",
              borderRadius: "999px",
              padding: "7px 18px 7px 14px",
              color: "#8a9bb0",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = "#7B6CD9"
              ;(e.currentTarget as HTMLButtonElement).style.color = "#fff"
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(123,108,217,0.3)"
              ;(e.currentTarget as HTMLButtonElement).style.color = "#8a9bb0"
            }}
          >
            <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
            Back to Blog
          </button>
 
          {/* ── Title Box — LIGHT ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden mb-10"
            style={{
              background: "#ffffff",
              border: "1px solid #e4e8ef",
              boxShadow: "0 2px 20px rgba(123,108,217,0.08)",
            }}
          >
            {/* Left accent bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, bottom: 0, width: "4px",
              background: "linear-gradient(to bottom, #D288F2, #7B6CD9, #23518C)",
            }} />
 
            {/* Subtle orb top-right */}
            <div style={{
              position: "absolute", top: -30, right: -30,
              width: 180, height: 180, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(210,136,242,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
 
            <div className="px-8 py-8 pl-10">
              {/* Category pill */}
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4"
                style={{
                  background: "rgba(123,108,217,0.1)",
                  border: "1px solid rgba(123,108,217,0.25)",
                  color: "#7B6CD9",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#7B6CD9] inline-block" />
                {article.category}
              </span>
 
              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#010D26] leading-[1.2] tracking-tight max-w-2xl">
                {article.title}
              </h1>
 
              {/* Excerpt */}
              <p
                className="mt-4 text-[#344859] text-sm md:text-base leading-relaxed max-w-xl"
                style={{
                  borderLeft: "2px solid rgba(123,108,217,0.4)",
                  paddingLeft: "14px",
                }}
              >
                {article.excerpt}
              </p>
 
 
            </div>
          </motion.div>
 
          {/* ── Article body ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl space-y-6"
          >
            {paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: i === 0 ? "18px" : "16px",
                  fontWeight: i === 0 ? 450 : 400,
                  color: i === 0 ? "#0f1e2e" : "#1e2e3e",
                  lineHeight: 1.9,
                }}
              >
                {para}
              </p>
            ))}
          </motion.div>
 
          {/* End ornament */}
          <div className="mt-16 flex items-center gap-4 max-w-2xl">
            <div className="flex-1 h-px" style={{ background: "rgba(123,108,217,0.2)" }} />
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-[#7B6CD9] opacity-50" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#7B6CD9]" />
              <div className="w-1 h-1 rounded-full bg-[#7B6CD9] opacity-50" />
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