"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { LogoTransition } from "./LogoTransition"
import type { Article } from "@/data/articles"

interface FeaturedArticleProps {
  article: Article
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const router = useRouter()
  const [transitioning, setTransitioning] = useState(false)
  const [hovered, setHovered] = useState(false)

  function handleClick() {
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

  return (
    <>
      <LogoTransition isVisible={transitioning} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer mb-16"
        style={{
          background: "#0A0F2C",
          borderLeft: "4px solid #7B6CD9",
          boxShadow: hovered
            ? "0 16px 60px rgba(123,108,217,0.22), 0 4px 16px rgba(0,0,0,0.12)"
            : "0 4px 24px rgba(0,0,0,0.1)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Shimmer line at top */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(to right, #7B6CD9, #D288F2, transparent)",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Subtle background orb */}
        <div
          style={{
            position: "absolute",
            top: -60, right: -60,
            width: 300, height: 300,
            background: "radial-gradient(circle, rgba(123,108,217,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="flex flex-col md:flex-row items-stretch min-h-[200px] md:min-h-[220px]">

          {/* Left: content */}
          <div className="flex flex-col justify-between p-8 md:p-10 flex-1 min-w-0">
            <div>
              {/* Featured label + category */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded"
                  style={{ background: "rgba(127,108,217,0.2)", color: "#AFA9EC" }}
                >
                  Featured
                </span>
                <span
                  className="text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: hovered ? "#D288F2" : "#7B6CD9", transition: "color 0.3s" }}
                >
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-2xl md:text-3xl font-bold leading-snug text-white max-w-xl"
                style={{ transition: "opacity 0.3s", opacity: hovered ? 0.95 : 1 }}
              >
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="mt-3 text-sm md:text-base text-[#8a9bb0] leading-relaxed max-w-lg line-clamp-2">
                {article.excerpt}
              </p>
            </div>

            {/* Bottom row: author + read time + CTA */}
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {/* Author avatar */}
                <div
                  className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0"
                  style={{ background: hovered ? "#6b5bc8" : "#7B6CD9", transition: "background 0.3s" }}
                >
                  {article.author.image ? (
                    <Image src={article.author.image} alt={article.author.name} fill className="object-cover" />
                  ) : (
                    <span className="text-white text-[11px] font-semibold">{initials}</span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/90">{article.author.name}</p>
                  <p className="text-[10px] text-[#8a9bb0]">{article.author.designation}</p>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-white/10 mx-1" />

                {/* Read time */}
                <div className="flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7B6CD9" strokeWidth={2.2} strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-[11px] text-[#8a9bb0]">{article.readTime}</span>
                </div>

                {/* Published date */}
                <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />
                <span className="text-[11px] text-[#8a9bb0] hidden sm:block">{article.publishedDate}</span>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-semibold transition-colors duration-300"
                  style={{ color: hovered ? "#D288F2" : "#7B6CD9" }}
                >
                  Read Article
                </span>
                <motion.span
                  animate={{ x: hovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: hovered ? "#D288F2" : "#7B6CD9" }}
                  className="text-sm"
                >
                  →
                </motion.span>
              </div>
            </div>
          </div>

          {/* Right: image area — only shown if image exists */}
          {article.image && (
            <div className="relative w-full md:w-72 shrink-0 min-h-[180px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                style={{
                  transform: hovered ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.4s ease",
                  opacity: 0.85,
                }}
              />
              {/* Fade into the dark card */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, #0A0F2C 0%, transparent 40%)",
                }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}