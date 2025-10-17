"use client"

import { useEffect, useRef } from "react"

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number

    const drawCircuits = (time: number) => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(34, 211, 238, 0.15)"
      ctx.lineWidth = 1

      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        for (let x = 0; x < canvas.width; x += 20) {
          const y = i + Math.sin((x + time * 0.001) * 0.01) * 5
          ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        for (let y = 0; y < canvas.height; y += 20) {
          const x = i + Math.cos((y + time * 0.001) * 0.01) * 5
          ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      ctx.fillStyle = "rgba(34, 211, 238, 0.3)"
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.0001 + i) * canvas.width) / 2 + canvas.width / 2
        const y = (Math.cos(time * 0.0001 + i * 0.5) * canvas.height) / 2 + canvas.height / 2
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(drawCircuits)
    }

    drawCircuits(0)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}
