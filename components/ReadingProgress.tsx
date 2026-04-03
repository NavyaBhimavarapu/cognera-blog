"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    function handleScroll() {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return

      const pct = Math.min((scrollY / docHeight) * 100, 100)
      setProgress(pct)

      if (pct >= 100) {
        // Hide after a short delay once fully read
        setTimeout(() => setVisible(false), 600)
      } else {
        setVisible(true)
      }
    }

    if (prefersReduced) {
      // Just show/hide without animation — still useful
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px]"
      style={{ background: "rgba(123,108,217,0.12)" }}
      aria-hidden="true"
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(to right, #7B6CD9, #D288F2)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  )
}