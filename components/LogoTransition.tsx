"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LogoTransitionProps {
  isVisible: boolean
}

export function LogoTransition({ isVisible }: LogoTransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "#010D26" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Outer slowly rotating ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 260, height: 260,
              border: "1px solid rgba(123,108,217,0.3)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner counter-rotating ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 200, height: 200,
              border: "1px solid rgba(210,136,242,0.2)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Logo with pulse */}
          <motion.div
            className="relative w-20 h-20"
            animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/icon.png"
              alt="Cognera"
              fill
              className="object-contain"
            />
            {/* Fallback if logo not yet added */}
            <div className="absolute inset-0 rounded-full border-2 border-[#7B6CD9] flex items-center justify-center">
              <span className="text-[#7B6CD9] text-2xl font-bold">C</span>
            </div>
          </motion.div>

          {/* Loading dots */}
          <div className="absolute bottom-24 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#7B6CD9]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
