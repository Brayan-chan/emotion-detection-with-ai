"use client"

import { useEffect, useRef, useState } from "react"
import EmotionDisplay from "./emotion-display"
import CameraFeed from "./camera-feed"
import EmotionEffects from "./emotion-effects"
import EmotionVoice from "./emotion-voice"

export interface Detection {
  expressions: Record<string, number>
  detection: any
}

interface EmotionDetectorProps {
  onEmotionChange?: (emotion: string | null) => void
  onCameraChange?: (active: boolean) => void
}

export default function EmotionDetector({ onEmotionChange, onCameraChange }: EmotionDetectorProps) {
  const videoRef = useRef<HTMLVideoElement>(null!)
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const [detection, setDetection] = useState<Detection | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dominantEmotion, setDominantEmotion] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const faceapiRef = useRef<any>(null)

  const startCamera = async () => {
    try {
      setError(null)
      
      // Cargar face-api dinámicamente si no está cargado
      if (!faceapiRef.current) {
        faceapiRef.current = await import("@vladmandic/face-api")
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        onCameraChange?.(true)
        startDetection()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo acceder a la cámara")
      console.error("Camera error:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setCameraActive(false)
      onCameraChange?.(false)
      setDetection(null)
      setDominantEmotion(null)
      setConfidence(0)
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
    }
  }

  const startDetection = () => {
    detectionIntervalRef.current = setInterval(async () => {
      if (videoRef.current && canvasRef.current && faceapiRef.current) {
        const faceapi = faceapiRef.current
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions()

        if (detections.length > 0) {
          const detection = detections[0]
          setDetection({
            expressions: detection.expressions as unknown as Record<string, number>,
            detection: detection.detection,
          })

          const emotions = Object.entries(detection.expressions)
          const sorted = emotions.sort(([, a], [, b]) => (b as number) - (a as number))
          setDominantEmotion(sorted[0][0])
          onEmotionChange?.(sorted[0][0])
          setConfidence(Math.round((sorted[0][1] as number) * 100))

          const displaySize = {
            width: videoRef.current.width,
            height: videoRef.current.height,
          }
          faceapi.matchDimensions(canvasRef.current, displaySize)
          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          canvasRef.current.getContext("2d")?.clearRect(0, 0, displaySize.width, displaySize.height)
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
        } else {
          setDetection(null)
          setDominantEmotion(null)
          onEmotionChange?.(null)
          setConfidence(0)
        }
      }
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
      stopCamera()
    }
  }, [])

  return (
    <>
      <EmotionEffects emotion={dominantEmotion} isActive={cameraActive} />
      <EmotionVoice emotion={dominantEmotion} isActive={cameraActive} />

      <div className="w-full max-w-4xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <CameraFeed
            videoRef={videoRef}
            canvasRef={canvasRef}
            cameraActive={cameraActive}
            onStart={startCamera}
            onStop={stopCamera}
            error={error}
            emotion={dominantEmotion}
            confidence={confidence}
          />

          {/* Emotion Display Section */}
          <EmotionDisplay detection={detection} cameraActive={cameraActive} />
        </div>
      </div>
    </>
  )
}
