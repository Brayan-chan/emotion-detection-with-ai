"use client"

import { useEffect } from "react"

interface ScanSoundProps {
  isScanning: boolean
  emotion: string | null
}

export default function ScanSound({ isScanning, emotion }: ScanSoundProps) {
  useEffect(() => {
    if (!isScanning) return

    const playLaserSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1)

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }

    const interval = setInterval(playLaserSound, 1500)
    playLaserSound() // Play immediately

    return () => clearInterval(interval)
  }, [isScanning])

  return null
}
