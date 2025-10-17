"use client"

import { useMemo } from "react"

interface Detection {
  expressions: Record<string, number>
  detection: any
}

interface EmotionDisplayProps {
  detection: Detection | null
  cameraActive: boolean
}

const EMOTION_EMOJIS: Record<string, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  fearful: "😨",
  disgusted: "🤢",
  surprised: "😲",
  neutral: "😐",
}

const EMOTION_COLORS: Record<string, string> = {
  happy: "from-yellow-500 to-orange-500",
  sad: "from-blue-600 to-blue-500",
  angry: "from-red-600 to-red-500",
  fearful: "from-purple-600 to-purple-500",
  disgusted: "from-green-600 to-green-500",
  surprised: "from-pink-600 to-pink-500",
  neutral: "from-slate-600 to-slate-500",
}

export default function EmotionDisplay({ detection, cameraActive }: EmotionDisplayProps) {
  const dominantEmotion = useMemo(() => {
    if (!detection) return null
    const emotions = Object.entries(detection.expressions)
    const sorted = emotions.sort(([, a], [, b]) => b - a)
    return sorted[0]
  }, [detection])

  const emotionBars = useMemo(() => {
    if (!detection) return []
    return Object.entries(detection.expressions)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }, [detection])

  return (
    <div className="flex flex-col gap-6">
      {/* Main Emotion Display */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
        <h2 className="text-white text-sm font-semibold uppercase tracking-wider mb-6 opacity-70">Emoción Detectada</h2>

        {cameraActive && dominantEmotion ? (
          <div className="text-center">
            <div className={`text-7xl mb-4 animate-bounce`}>{EMOTION_EMOJIS[dominantEmotion[0]] || "😐"}</div>
            <h3
              className={`text-4xl font-bold bg-gradient-to-r ${EMOTION_COLORS[dominantEmotion[0]]} bg-clip-text text-transparent mb-2`}
            >
              {dominantEmotion[0].charAt(0).toUpperCase() + dominantEmotion[0].slice(1)}
            </h3>
            <p className="text-blue-300 text-lg font-semibold">{(dominantEmotion[1] * 100).toFixed(1)}% de confianza</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-400 text-lg">
              {cameraActive ? "Acercate a la cámara..." : "Inicia la cámara para comenzar"}
            </p>
          </div>
        )}
      </div>

      {/* Emotion Bars */}
      {cameraActive && emotionBars.length > 0 && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-blue-500/30 shadow-2xl">
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 opacity-70">
            Análisis Detallado
          </h3>
          <div className="space-y-3">
            {emotionBars.map(([emotion, value]) => (
              <div key={emotion}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 text-sm font-medium capitalize">{emotion}</span>
                  <span className="text-blue-400 text-sm font-semibold">{(value * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${EMOTION_COLORS[emotion]} transition-all duration-300`}
                    style={{ width: `${value * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <p className="text-blue-200 text-sm leading-relaxed">
          <span className="font-semibold">💡 Inteligencia Artificial en Acción:</span> Esta aplicación utiliza redes
          neuronales profundas para analizar tu rostro y detectar emociones en tiempo real. ¡La IA está aprendiendo a
          reconocer patrones faciales!
        </p>
      </div>
    </div>
  )
}
