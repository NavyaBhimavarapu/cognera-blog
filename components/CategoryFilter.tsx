"use client"

import { motion } from "framer-motion"

export type Filter = "All" | "Insights" | "Updates" | "Engineering"

const FILTERS: Filter[] = ["All", "Insights", "Updates", "Engineering"]

interface CategoryFilterProps {
  active: Filter
  onChange: (f: Filter) => void
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-1 bg-white border border-[#e4e8ef] rounded-full px-1.5 py-1.5 shadow-sm">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors z-10 ${
            active === f ? "text-white" : "text-[#344859] hover:text-[#010D26]"
          }`}
        >
          {active === f && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-[#270F59]"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          {f}
        </button>
      ))}
    </div>
  )
}
