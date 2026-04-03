"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

export function BlogHeader() {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <header className="relative py-16 md:py-24 overflow-hidden bg-[#F5F7FA]">

      {/* Orb 1 — lavender top-left */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420, height: 420,
          background: "#D288F2",
          filter: "blur(100px)",
          opacity: 0.22,
          top: -140, left: -100,
        }}
        animate={{ x: [0, 32, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — violet top-right */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 360, height: 360,
          background: "#7B6CD9",
          filter: "blur(90px)",
          opacity: 0.2,
          top: -80, right: -80,
        }}
        animate={{ x: [0, -24, 0], y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 3 — navy bottom-center */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 260, height: 260,
          background: "#23518C",
          filter: "blur(80px)",
          opacity: 0.12,
          bottom: -80, left: "45%",
        }}
        animate={{ x: [0, 20, 0], y: [0, -24, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Decorative thin lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-full h-px"
          style={{
            top: "30%",
            background: "linear-gradient(to right, transparent, rgba(123,108,217,0.2), transparent)",
          }}
        />
        <div
          className="absolute w-full h-px"
          style={{
            top: "70%",
            background: "linear-gradient(to right, transparent, rgba(210,136,242,0.15), transparent)",
          }}
        />
      </div>

      {/* Ghost BLOG text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[10rem] md:text-[15rem] font-black tracking-tighter leading-none"
          style={{
            background: "linear-gradient(135deg, #7B6CD9 0%, #D288F2 60%, #23518C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.08,
          }}
        >
          BLOG
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
            className="mb-5"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16">
              {/* Soft glow ring behind logo */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-50%",
                  background: "radial-gradient(circle, rgba(210,136,242,0.3) 0%, transparent 65%)",
                }}
              />
              {/* Real logo — shown when image loads */}
              {!logoFailed && (
                <Image
                  src="/images/icon.png"
                  alt="Cognera"
                  fill
                  className="object-contain z-10 relative"
                  onError={() => setLogoFailed(true)}
                />
              )}
              {/* Fallback — only shown when image actually fails */}
              {logoFailed && (
                <div className="absolute inset-0 rounded-full border-2 border-[#7B6CD9]/60 flex items-center justify-center bg-white/50 z-10">
                  <span className="text-[#7B6CD9] text-sm font-bold">C</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center gap-3 mb-3"
          >
            <div className="w-8 h-px bg-[#7B6CD9]/40" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#7B6CD9] uppercase">
              Cognera Journal
            </span>
            <div className="w-8 h-px bg-[#7B6CD9]/40" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#010D26] leading-[1.1]"
          >
            Blogs of{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7B6CD9 0%, #D288F2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cognera
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4 text-sm md:text-base text-[#344859] opacity-70 max-w-lg leading-relaxed"
          >
            Exploring digital analytics and privacy-first data solutions
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center mt-8 divide-x divide-[#7B6CD9]/20"
          >
            {[
              { value: "8", label: "Articles" },
              { value: "3", label: "Categories" },
              { value: "4", label: "Authors" },
            ].map((stat, i) => (
              <div key={i} className="px-6 text-center first:pl-0 last:pr-0">
                <p className="text-2xl font-bold text-[#270F59]">{stat.value}</p>
                <p className="text-[10px] tracking-widest text-[#344859]/60 uppercase mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </header>
  )
}