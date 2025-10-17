"use client"

import { useEffect, useRef } from "react"

interface EmotionEffectsProps {
  emotion: string | null
  isActive: boolean
}

const EMOTION_CONFIG: Record<string, { bgColor: string; sound: string; particles: boolean }> = {
  happy: { bgColor: "from-yellow-400 via-orange-300 to-yellow-500", sound: "happy", particles: true },
  sad: { bgColor: "from-blue-900 via-blue-800 to-slate-900", sound: "sad", particles: false },
  angry: { bgColor: "from-red-700 via-red-600 to-orange-700", sound: "angry", particles: true },
  fearful: { bgColor: "from-purple-900 via-purple-800 to-slate-900", sound: "fearful", particles: true },
  disgusted: { bgColor: "from-green-800 via-green-700 to-slate-900", sound: "disgusted", particles: false },
  surprised: { bgColor: "from-orange-500 via-pink-500 to-purple-600", sound: "surprised", particles: true },
  neutral: { bgColor: "from-slate-950 via-blue-950 to-slate-950", sound: "neutral", particles: false },
}

export default function EmotionEffects({ emotion, isActive }: EmotionEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  // Play sound effect
  useEffect(() => {
    if (!emotion || !isActive) return

    const config = EMOTION_CONFIG[emotion]
    if (!config) return

    // Create and play sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    playEmotionSound(audioContext, emotion)
  }, [emotion, isActive])

  // Create particle effects
  useEffect(() => {
    if (!emotion || !isActive || !particlesRef.current) return

    const config = EMOTION_CONFIG[emotion]
    if (!config.particles) return

    createParticles(particlesRef.current, emotion)
  }, [emotion, isActive])

  // Update background color
  useEffect(() => {
    if (!containerRef.current) return

    if (emotion && isActive) {
      const config = EMOTION_CONFIG[emotion]
      containerRef.current.style.background = `linear-gradient(135deg, var(--tw-gradient-stops))`
      containerRef.current.className = `fixed inset-0 bg-gradient-to-br ${config.bgColor} transition-all duration-500 pointer-events-none`
    } else {
      containerRef.current.className = `fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 transition-all duration-500 pointer-events-none`
    }
  }, [emotion, isActive])

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 transition-all duration-500 pointer-events-none"
      />
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none overflow-hidden" />
    </>
  )
}

function playEmotionSound(audioContext: AudioContext, emotion: string) {
  const now = audioContext.currentTime

  switch (emotion) {
    case "happy":
      // Cheerful ascending notes
      playNote(audioContext, 523.25, 0.1, now) // C5
      playNote(audioContext, 659.25, 0.1, now + 0.1) // E5
      playNote(audioContext, 783.99, 0.2, now + 0.2) // G5
      break

    case "sad":
      // Descending melancholic notes
      playNote(audioContext, 392, 0.15, now) // G4
      playNote(audioContext, 349.23, 0.15, now + 0.15) // F4
      playNote(audioContext, 293.66, 0.3, now + 0.3) // D4
      break

    case "angry":
      // Harsh, dissonant tones with vibration
      playNote(audioContext, 440, 0.08, now) // A4
      playNote(audioContext, 466.16, 0.08, now + 0.08) // A#4
      playNote(audioContext, 440, 0.08, now + 0.16) // A4
      break

    case "fearful":
      // Trembling, uncertain notes
      playNote(audioContext, 587.33, 0.05, now) // D5
      playNote(audioContext, 587.33, 0.05, now + 0.08) // D5
      playNote(audioContext, 587.33, 0.1, now + 0.16) // D5
      break

    case "disgusted":
      // Guttural, unpleasant sound
      playNote(audioContext, 220, 0.2, now) // A3
      playNote(audioContext, 246.94, 0.2, now + 0.2) // B3
      break

    case "surprised":
      // Quick, bright ascending notes
      playNote(audioContext, 659.25, 0.05, now) // E5
      playNote(audioContext, 783.99, 0.05, now + 0.05) // G5
      playNote(audioContext, 987.77, 0.15, now + 0.1) // B5
      break

    case "neutral":
      // Calm, steady tone
      playNote(audioContext, 440, 0.3, now) // A4
      break
  }
}

function playNote(audioContext: AudioContext, frequency: number, duration: number, startTime: number) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = frequency
  oscillator.type = "sine"

  gainNode.gain.setValueAtTime(0.3, startTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)

  oscillator.start(startTime)
  oscillator.stop(startTime + duration)
}

function createParticles(container: HTMLDivElement, emotion: string) {
  container.innerHTML = ""

  const particleCount = emotion === "surprised" ? 50 : emotion === "happy" ? 30 : 20
  const colors = getParticleColors(emotion)

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    const size = Math.random() * 4 + 2
    const duration = Math.random() * 2 + 1
    const delay = Math.random() * 0.5

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: 0.8;
      pointer-events: none;
      animation: float-particle ${duration}s ease-out ${delay}s forwards;
      box-shadow: 0 0 ${size * 2}px currentColor;
    `

    container.appendChild(particle)
  }

  // Add animation keyframes if not already present
  if (!document.getElementById("particle-animation")) {
    const style = document.createElement("style")
    style.id = "particle-animation"
    style.textContent = `
      @keyframes float-particle {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 0.8;
        }
        100% {
          transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * -200}px) scale(0);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

function getParticleColors(emotion: string): string[] {
  const colorMap: Record<string, string[]> = {
    happy: ["#FFD700", "#FFA500", "#FFB347", "#FFEB3B"],
    sad: ["#4A90E2", "#357ABD", "#2E5C8A"],
    angry: ["#FF4444", "#FF6B6B", "#FF8C42"],
    fearful: ["#9B59B6", "#8E44AD", "#7D3C98"],
    disgusted: ["#27AE60", "#2ECC71", "#52BE80"],
    surprised: ["#FF69B4", "#FF1493", "#FFD700", "#FF8C00"],
    neutral: ["#95A5A6", "#BDC3C7", "#7F8C8D"],
  }
  return colorMap[emotion] || colorMap.neutral
}
