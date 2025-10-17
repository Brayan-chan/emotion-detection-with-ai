"use client"

import { useEffect, useRef } from "react"

interface EmotionVoiceProps {
  emotion: string | null
  isActive: boolean
}

const EMOTION_MESSAGES: Record<string, string> = {
  happy: "Parece que hoy estás de buen humor. Me alegra verte así.",
  sad: "Todo estará bien. A veces un día gris también enseña cosas valiosas.",
  angry: "Veo que estás enojado. Respira profundo, todo pasará.",
  fearful: "Detecté miedo. No te preocupes, estoy aquí para ayudarte.",
  disgusted: "Parece que algo no te agrada. Es normal tener preferencias.",
  surprised: "¡Vaya! Te sorprendiste. Eso es interesante.",
  neutral: "Te veo tranquilo. Un estado perfecto para aprender.",
}

export default function EmotionVoice({ emotion, isActive }: EmotionVoiceProps) {
  const lastEmotionRef = useRef<string | null>(null)
  const isSpeakingRef = useRef(false)

  useEffect(() => {
    if (!emotion || !isActive) return

    // Only speak if emotion changed
    if (emotion === lastEmotionRef.current) return

    lastEmotionRef.current = emotion

    // Stop any ongoing speech
    speechSynthesis.cancel()

    // Get message for emotion
    const message = EMOTION_MESSAGES[emotion] || "Detecté una emoción interesante."

    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(message)
    utterance.lang = "es-MX"
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.volume = 0.8

    // Add emotion-specific voice characteristics
    const voices = speechSynthesis.getVoices()
    const spanishVoice = voices.find((v) => v.lang.includes("es"))
    if (spanishVoice) {
      utterance.voice = spanishVoice
    }

    // Adjust pitch and rate based on emotion
    switch (emotion) {
      case "happy":
        utterance.pitch = 1.2
        utterance.rate = 1.1
        break
      case "sad":
        utterance.pitch = 0.8
        utterance.rate = 0.85
        break
      case "angry":
        utterance.pitch = 1.1
        utterance.rate = 1.2
        break
      case "surprised":
        utterance.pitch = 1.3
        utterance.rate = 1.15
        break
      case "fearful":
        utterance.pitch = 0.9
        utterance.rate = 0.9
        break
    }

    utterance.onstart = () => {
      isSpeakingRef.current = true
    }

    utterance.onend = () => {
      isSpeakingRef.current = false
    }

    // Speak the message
    speechSynthesis.speak(utterance)
  }, [emotion, isActive])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel()
    }
  }, [])

  return null
}
