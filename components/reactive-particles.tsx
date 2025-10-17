"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  color: string
}

interface ReactiveParticlesProps {
  emotion: string | null
  isActive: boolean
}

export default function ReactiveParticles({ emotion, isActive }: ReactiveParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number

    const getEmotionConfig = (emotion: string | null) => {
      const configs: Record<string, any> = {
        happy: {
          colors: ["#FFD700", "#FFA500", "#FF69B4", "#00FF00"],
          speed: 3,
          size: 4,
          spawnRate: 8,
          gravity: 0.1,
          description: "Partículas de colores alegres",
        },
        sad: {
          colors: ["#4169E1", "#1E90FF", "#87CEEB"],
          speed: 1,
          size: 3,
          spawnRate: 5,
          gravity: 0.3,
          description: "Lluvia cayendo lentamente",
        },
        surprised: {
          colors: ["#FF6347", "#FFD700", "#00FF00", "#FF1493"],
          speed: 5,
          size: 5,
          spawnRate: 15,
          gravity: 0.05,
          description: "Explosión de puntos",
        },
        angry: {
          colors: ["#FF0000", "#DC143C", "#FF4500"],
          speed: 4,
          size: 4,
          spawnRate: 10,
          gravity: 0.2,
          description: "Partículas rojas intensas",
        },
        neutral: {
          colors: ["#22D3EE", "#06B6D4"],
          speed: 1.5,
          size: 2,
          spawnRate: 3,
          gravity: 0.05,
          description: "Partículas suaves",
        },
        disgusted: {
          colors: ["#9ACD32", "#7FFF00", "#32CD32"],
          speed: 2,
          size: 3,
          spawnRate: 6,
          gravity: 0.15,
          description: "Partículas verdes",
        },
        fearful: {
          colors: ["#9932CC", "#8B008B", "#FF00FF"],
          speed: 3.5,
          size: 3,
          spawnRate: 7,
          gravity: 0.25,
          description: "Partículas púrpuras",
        },
      }
      return emotion ? configs[emotion] || configs.neutral : configs.neutral
    }

    const spawnParticles = (config: any) => {
      if (!isActive) return

      for (let i = 0; i < config.spawnRate; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = config.speed * (0.5 + Math.random())

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.3,
          vx: Math.cos(angle) * speed * (Math.random() - 0.5) * 2,
          vy: Math.sin(angle) * speed + config.speed * 0.5,
          size: config.size * (0.5 + Math.random()),
          life: 1,
          maxLife: 200 + Math.random() * 100,
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
        })
      }
    }

    const updateParticles = (config: any) => {
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 1
        p.vy += config.gravity
        p.x += p.vx
        p.y += p.vy

        return p.life > 0 && p.y < canvas.height
      })
    }

    const drawParticles = () => {
      particlesRef.current.forEach((p) => {
        const alpha = p.life / p.maxLife
        ctx.fillStyle = p.color.replace(")", `, ${alpha})`).replace("rgb", "rgba")
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = () => {
      timeRef.current++

      // Fondo oscuro
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const config = getEmotionConfig(emotion)

      // Spawn nuevas partículas cada frame
      if (timeRef.current % 2 === 0) {
        spawnParticles(config)
      }

      updateParticles(config)
      drawParticles()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [emotion, isActive])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}
