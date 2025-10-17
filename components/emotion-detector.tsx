"use client"

import { useEffect, useRef, useState } from "react"
import * as faceapi from "@vladmandic/face-api"
import EmotionDisplay from "./emotion-display"
import CameraFeed from "./camera-feed"

interface Detection {
  expressions: Record<string, number>
  detection: any
}

export default function EmotionDetector() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [detection, setDetection] = useState<Detection | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        startDetection()
      }
    } catch (err) {
      setError("No se pudo acceder a la cámara. Verifica los permisos.")
      console.error("Camera error:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setCameraActive(false)
      setDetection(null)
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
    }
  }

  const startDetection = () => {
    detectionIntervalRef.current = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions()

        if (detections.length > 0) {
          const detection = detections[0]
          setDetection({
            expressions: detection.expressions,
            detection: detection.detection,
          })

          // Draw on canvas
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
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Camera Section */}
        <CameraFeed
          videoRef={videoRef}
          canvasRef={canvasRef}
          cameraActive={cameraActive}
          onStart={startCamera}
          onStop={stopCamera}
          error={error}
        />

        {/* Emotion Display Section */}
        <EmotionDisplay detection={detection} cameraActive={cameraActive} />
      </div>
    </div>
  )
}
