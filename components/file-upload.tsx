"use client"

import type React from "react"

import { Upload } from "lucide-react"
import { useCallback } from "react"

interface FileUploadProps {
  onFileLoad: (data: Uint8Array, filename: string) => void
}

export function FileUpload({ onFileLoad }: FileUploadProps) {
  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const uint8Array = new Uint8Array(arrayBuffer)
        onFileLoad(uint8Array, file.name)
      }
      reader.readAsArrayBuffer(file)
    },
    [onFileLoad],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
    >
      <input type="file" id="file-input" className="hidden" onChange={handleFileInput} accept="*" />
      <label htmlFor="file-input" className="cursor-pointer">
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg mb-2 text-foreground">Drop binary message file here</p>
        <p className="text-sm text-muted-foreground">or click to browse</p>
      </label>
    </div>
  )
}
