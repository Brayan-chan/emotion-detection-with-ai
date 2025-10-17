"use client"

import { useEffect, useRef } from "react"

interface AILabHUDProps {
  emotion: string | null
  confidence: number
  isScanning: boolean
}

export default function AILabHUD({ emotion, confidence, isScanning }: AILabHUDProps) {
  const hudRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hudRef.current || !isScanning) return

    const pulse = () => {
      if (hudRef.current) {
        hudRef.current.style.opacity = "0.7"
        setTimeout(() => {
          if (hudRef.current) hudRef.current.style.opacity = "1"
        }, 300)
      }
    }

    const interval = setInterval(pulse, 1000)
    return () => clearInterval(interval)
  }, [isScanning])

  const emotionEmoji: Record<string, string> = {
    happy: "😊",
    sad: "😢",
    surprised: "😮",
    angry: "😠",
    disgusted: "🤢",
    fearful: "😨",
    neutral: "😐",
  }

  return (
    <div
      ref={hudRef}
      className="absolute inset-0 pointer-events-none font-mono text-cyan-400"
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        textShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
      }}
    >
      <div className="absolute top-4 left-4 text-xs space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span>SISTEMA ACTIVO</span>
        </div>
        <div>ID: UNKNOWN</div>
        <div>MODO: ANÁLISIS FACIAL</div>
      </div>

      <div className="absolute top-4 right-4 text-xs space-y-1 text-right">
        <div>CONFIANZA: {confidence.toFixed(0)}%</div>
        <div>EMOCIÓN: {emotion ? emotion.toUpperCase() : "ESCANEANDO..."}</div>
        <div className="text-cyan-300">{emotion && emotionEmoji[emotion]}</div>
      </div>

      <div className="absolute bottom-4 left-4 text-xs space-y-1">
        <div>RESOLUCIÓN: 1920x1080</div>
        <div>FPS: 30</div>
        <div>LATENCIA: &lt;50ms</div>
      </div>

      <div className="absolute bottom-4 right-4 text-xs space-y-1 text-right">
        <div>v1.0 AI VISION</div>
        <div>© 2025 NEURAL LAB</div>
      </div>

      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>
    </div>
  )
}
