"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { LogoTransition } from "./LogoTransition"
import type { Article } from "@/data/articles"

interface BlogCardProps {
  article: Article
  index: number
}

export function BlogCard({ article, index }: BlogCardProps) {
  const router = useRouter()
  const [transitioning, setTransitioning] = useState(false)
  const [hovered, setHovered] = useState(false)

  function handleReadArticle() {
    setTransitioning(true)
    setTimeout(() => {
      router.push(`/blog/${article.slug}`)
    }, 1600)
  }

  const initials = article.author.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  // Alternate: even-indexed cards slide from left, odd from right
  const slideFrom = index % 2 === 0 ? -40 : 40

  return (
    <>
      <LogoTransition isVisible={transitioning} />

      <motion.div
        initial={{ opacity: 0, x: slideFrom }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: (index % 2) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex rounded-2xl overflow-hidden border border-[#e4e8ef] min-h-[240px] cursor-pointer"
        style={{
          boxShadow: hovered
            ? "0 8px 40px rgba(123,108,217,0.18), 0 2px 8px rgba(0,0,0,0.06)"
            : "0 1px 4px rgba(0,0,0,0.05)",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0px)",
        }}
        onClick={handleReadArticle}
      >
        {/* ── LEFT: dark panel ── */}
        <div
          className="flex flex-col justify-between p-6 md:p-7 flex-1 min-w-0 relative overflow-hidden"
          style={{
            background: hovered
              ? "linear-gradient(135deg, #131f2e 0%, #101C26 100%)"
              : "#101C26",
            transition: "background 0.3s ease",
          }}
        >
          {/* Hover shimmer line at top */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(to right, #7B6CD9, #D288F2, #7B6CD9)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />

          <div>
            {/* Category */}
            <span
              className="text-xs font-semibold tracking-widest uppercase transition-colors duration-300"
              style={{ color: hovered ? "#D288F2" : "#7B6CD9" }}
            >
              {article.category}
            </span>

            {/* Title */}
            <h2 className="mt-2 text-lg md:text-xl font-semibold text-white leading-snug">
              {article.title}
            </h2>

            {/* Excerpt */}
            <p className="mt-2 text-sm text-[#8a9bb0] leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          {/* Read Article */}
          <div className="mt-5 flex items-center gap-2 w-fit">
            <span
              className="text-sm font-medium transition-colors duration-300"
              style={{ color: hovered ? "#D288F2" : "#7B6CD9" }}
            >
              Read Article
            </span>
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm"
              style={{ color: hovered ? "#D288F2" : "#7B6CD9" }}
            >
              →
            </motion.span>
          </div>
        </div>

        {/* ── RIGHT: light panel ── */}
        <div
          className="flex flex-col justify-between p-5 w-44 md:w-52 shrink-0 border-l"
          style={{
            background: hovered ? "#fafbff" : "#ffffff",
            borderColor: hovered ? "#d8d4f5" : "#e4e8ef",
            transition: "background 0.3s ease, border-color 0.3s ease",
          }}
        >
          {/* Cover image */}
          <div
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center border"
            style={{
              background: hovered ? "#ede9fc" : "#f0f2f5",
              borderColor: hovered ? "#c4b8f0" : "#e4e8ef",
              transition: "background 0.3s ease, border-color 0.3s ease",
            }}
          >
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                style={{
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.4s ease",
                }}
              />
            ) : (
              <div className="flex flex-col items-center gap-1 text-[#b0bbc8]">
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[9px] tracking-wide text-center px-1 leading-tight">
                  Add image URL<br />in articles.ts
                </span>
              </div>
            )}
          </div>

          {/* Author */}
          <div className="mt-4 flex items-center gap-2.5">
            <div
              className="relative w-9 h-9 rounded-full overflow-hidden flex items-center justify-center shrink-0 transition-colors duration-300"
              style={{ background: hovered ? "#6b5bc8" : "#7B6CD9" }}
            >
              {article.author.image ? (
                <Image
                  src={article.author.image}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-white text-xs font-semibold">{initials}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#010D26] truncate">
                {article.author.name}
              </p>
              <p className="text-[10px] text-[#6b7a8d] truncate leading-tight mt-0.5">
                {article.author.designation}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}