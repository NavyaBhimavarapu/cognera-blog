"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LogoTransitionProps {
  isVisible: boolean
}

function generateSpiralArm(
  cx: number,
  cy: number,
  startAngle: number,
  turns: number,
  startR: number,
  endR: number,
  points: number
): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i <= points; i++) {
    const t = i / points
    const angle = startAngle + t * turns * Math.PI * 2
    const r = startR - (startR - endR) * t
    pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)])
  }
  return pts
}

export function LogoTransition({ isVisible }: LogoTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!isVisible) {
      startTimeRef.current = 0
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    const W = 220
    const H = 220
    canvas.width = W
    canvas.height = H
    const cx = W / 2
    const cy = H / 2
    const HEX_R = 96

    // Hex vertices
    const hexPts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 30)
      return [cx + HEX_R * Math.cos(a), cy + HEX_R * Math.sin(a)] as [number, number]
    })

    // Clip path — hexagon shape. Applied before drawing arms so nothing escapes
    function clipToHex() {
      ctx.beginPath()
      hexPts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
      ctx.closePath()
      ctx.clip()
    }

    // 6 arms — each starts just inside a hex vertex, winds inward
    // startR is slightly less than HEX_R so they start at the inner wall
    const ARM_COUNT = 6
    const armColors = [
      "rgba(210,136,242,",
      "rgba(140,105,225,",
      "rgba(123,108,217,",
      "rgba(195,145,248,",
      "rgba(105, 88,210,",
      "rgba(168,118,238,",
    ]

    const arms = Array.from({ length: ARM_COUNT }, (_, i) => {
      const startAngle = (Math.PI / 180) * (60 * i - 30)
      return {
        pts: generateSpiralArm(
          cx, cy,
          startAngle,
          -1.85,       // winds inward, clockwise
          HEX_R - 4,   // start just inside the hex wall
          10,          // end at center
          220
        ),
        color: armColors[i],
        startT: 0.16 + i * 0.09,
        width: i % 2 === 0 ? 1.8 : 1.3,
      }
    })

    // Dots placed along arms
    const dots: { x: number; y: number; r: number; t: number }[] = []
    arms.forEach((arm) => {
      ;[0.0, 0.22, 0.48, 0.72].forEach(frac => {
        const idx = Math.floor(frac * arm.pts.length)
        const [x, y] = arm.pts[idx]
        dots.push({ x, y, r: frac === 0 ? 3.2 : 2, t: arm.startT + frac * 0.38 })
      })
    })

    const TOTAL_DURATION = 2000

    function draw(now: number) {
      if (!startTimeRef.current) startTimeRef.current = now
      const elapsed = now - startTimeRef.current
      const globalT = Math.min(elapsed / TOTAL_DURATION, 1)

      ctx.clearRect(0, 0, W, H)

      // ── 1. Hex background fill (no clip needed) ──
      ctx.save()
      ctx.beginPath()
      hexPts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
      ctx.closePath()
      ctx.fillStyle = `rgba(15,10,40,${Math.min(globalT * 5, 0.85)})`
      ctx.fill()
      ctx.restore()

      // ── 2. Spiral arms — CLIPPED inside hex ──
      ctx.save()
      clipToHex()

      arms.forEach((arm) => {
        const armT = Math.max(0, Math.min((globalT - arm.startT) / 0.40, 1))
        if (armT <= 0) return
        const drawCount = Math.floor(armT * arm.pts.length)
        if (drawCount < 2) return

        const grad = ctx.createLinearGradient(
          arm.pts[0][0], arm.pts[0][1],
          arm.pts[arm.pts.length - 1][0], arm.pts[arm.pts.length - 1][1]
        )
        grad.addColorStop(0,   arm.color + `0.95)`)
        grad.addColorStop(0.5, arm.color + `0.65)`)
        grad.addColorStop(1,   arm.color + `0.15)`)

        ctx.beginPath()
        ctx.moveTo(arm.pts[0][0], arm.pts[0][1])
        for (let i = 1; i < drawCount; i++) {
          ctx.lineTo(arm.pts[i][0], arm.pts[i][1])
        }
        ctx.strokeStyle = grad
        ctx.lineWidth = arm.width
        ctx.lineCap = "round"
        ctx.setLineDash([])
        ctx.stroke()
      })

      // Dots — also clipped inside hex
      dots.forEach((dot) => {
        const dotT = Math.max(0, Math.min((globalT - dot.t) / 0.1, 1))
        if (dotT <= 0) return
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r * dotT, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210,136,242,${0.85 * dotT})`
        ctx.strokeStyle = `rgba(255,255,255,${0.3 * dotT})`
        ctx.lineWidth = 0.5
        ctx.fill()
        ctx.stroke()
      })

      ctx.restore() // remove hex clip

      // ── 3. Hex border — draws on top, outside clip ──
      const hexProgress = Math.min(globalT / 0.16, 1) * 6
      ctx.save()
      ctx.strokeStyle = `rgba(175,130,245,0.95)`
      ctx.lineWidth = 2.2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.setLineDash([])
      ctx.beginPath()
      for (let s = 0; s < 6; s++) {
        if (s >= hexProgress) break
        const from = hexPts[s]
        const to = hexPts[(s + 1) % 6]
        const segT = Math.min(hexProgress - s, 1)
        if (s === 0) ctx.moveTo(from[0], from[1])
        ctx.lineTo(
          from[0] + (to[0] - from[0]) * segT,
          from[1] + (to[1] - from[1]) * segT
        )
      }
      ctx.stroke()
      ctx.restore()

      // ── 4. Hex vertex nodes ──
      hexPts.forEach(([x, y], i) => {
        const nodeT = Math.max(0, Math.min((globalT - 0.1 - i * 0.02) / 0.07, 1))
        if (nodeT <= 0) return
        ctx.beginPath()
        ctx.arc(x, y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(10,8,30,${nodeT})`
        ctx.strokeStyle = `rgba(210,136,242,${0.9 * nodeT})`
        ctx.lineWidth = 1.3
        ctx.fill()
        ctx.stroke()
      })

      // ── 5. Magnifying glass at center ──
      const magT = Math.max(0, Math.min((globalT - 0.76) / 0.16, 1))
      if (magT > 0) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy + 1, 9, 0, Math.PI * 2 * magT)
        ctx.strokeStyle = `rgba(255,255,255,${0.9 * magT})`
        ctx.lineWidth = 1.8
        ctx.setLineDash([])
        ctx.stroke()
        if (magT > 0.65) {
          const hT = (magT - 0.65) / 0.35
          ctx.beginPath()
          ctx.moveTo(cx + 6.5, cy + 7)
          ctx.lineTo(cx + 6.5 + 5.5 * hT, cy + 7 + 5.5 * hT)
          ctx.strokeStyle = `rgba(255,255,255,${0.9 * hT})`
          ctx.lineWidth = 2
          ctx.lineCap = "round"
          ctx.stroke()
        }
        ctx.restore()
      }

      // ── 6. Final hex pulse ──
      const pulseT = Math.max(0, Math.min((globalT - 0.9) / 0.1, 1))
      if (pulseT > 0) {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.scale(1 + pulseT * 0.04, 1 + pulseT * 0.04)
        ctx.translate(-cx, -cy)
        ctx.beginPath()
        hexPts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
        ctx.closePath()
        ctx.strokeStyle = `rgba(210,136,242,${0.55 * (1 - pulseT)})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
      }

      if (globalT < 1) {
        animRef.current = requestAnimationFrame(draw)
      }
    }

    startTimeRef.current = 0
    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      startTimeRef.current = 0
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "#010D26" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            style={{ display: "block" }}
          />

          <div className="absolute bottom-20 flex gap-2.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#7B6CD9" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.3, 1, 0.3], scale: [0, 1, 1, 1, 1] }}
                transition={{
                  duration: 1.2,
                  delay: 0.4 + i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}