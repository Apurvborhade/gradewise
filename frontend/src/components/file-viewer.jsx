"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Document, Page, pdfjs } from "react-pdf"
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`



export function FileViewer({ file, className }) {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [scale, setScale] = useState(1)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const isPdf = file.type === "application/pdf"
    const isImage = file.type.startsWith("image/")

    useEffect(() => {
        setLoading(true)
        setError(null)
        setPageNumber(1)
        setScale(1)
    }, [file])

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
        setLoading(false)
    }

    const onDocumentLoadError = (error) => {
        console.error("Error loading PDF:", error)
        setError("Failed to load PDF. Please try downloading the file instead.")
        setLoading(false)
    }

    const handlePrevPage = () => {
        setPageNumber((prev) => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        if (numPages) {
            setPageNumber((prev) => Math.min(prev + 1, numPages))
        }
    }

    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev + 0.2, 2.5))
    }

    const handleZoomOut = () => {
        setScale((prev) => Math.max(prev - 0.2, 0.5))
    }

    const toggleFullscreen = () => {
        const viewerElement = document.getElementById("file-viewer")

        if (!isFullscreen) {
            if (viewerElement?.requestFullscreen) {
                viewerElement.requestFullscreen()
                setIsFullscreen(true)
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                setIsFullscreen(false)
            }
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    if (error) {
        return (
            <div className={`flex flex-col items-center justify-center p-8 border rounded-md ${className}`}>
                <p className="text-sm text-red-500 mb-4">{error}</p>
                <Button variant="outline" asChild>
                    <a href={file.url} download={file.name}>
                        <Download className="mr-2 h-4 w-4" />
                        Download File
                    </a>
                </Button>
            </div>
        )
    }

    return (
        <div id="file-viewer" className={`flex flex-col ${className}`}>
            <div className="flex justify-between items-center p-2 bg-muted/50 border-b">
                <div className="text-sm font-medium truncate max-w-[200px]">{file.name}</div>
                <div className="flex items-center gap-1">
                    {isPdf && (
                        <>
                            <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={scale <= 0.5}>
                                <ZoomOut className="h-4 w-4" />
                                <span className="sr-only">Zoom out</span>
                            </Button>
                            <span className="text-xs">{Math.round(scale * 100)}%</span>
                            <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={scale >= 2.5}>
                                <ZoomIn className="h-4 w-4" />
                                <span className="sr-only">Zoom in</span>
                            </Button>
                        </>
                    )}
                    <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                        <span className="sr-only">{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</span>
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-muted/20 min-h-[400px] flex items-center justify-center">
                {loading && (
                    <div className="p-8">
                        <Skeleton className="h-[400px] w-full" />
                    </div>
                )}

                {!loading && isPdf && (
                    <Document
                        file={file.url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={<Skeleton className="h-[400px] w-full" />}
                        className="flex justify-center"
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="shadow-md"
                        />
                    </Document>
                )}

                {!loading && isImage && (
                    <div className="relative max-h-[600px] flex items-center justify-center p-4">
                        <Image
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            width={800}
                            height={600}
                            className="max-h-[600px] w-auto object-contain"
                            onLoad={() => setLoading(false)}
                        />
                    </div>
                )}

                {!loading && !isPdf && !isImage && (
                    <div className="flex flex-col items-center justify-center p-8">
                        <p className="text-sm text-muted-foreground mb-4">Preview not available for this file type</p>
                        <Button variant="outline" asChild>
                            <a href={file.url} download={file.name}>
                                <Download className="mr-2 h-4 w-4" />
                                Download File
                            </a>
                        </Button>
                    </div>
                )}
            </div>

            {isPdf && numPages && numPages > 1 && (
                <div className="flex items-center justify-center gap-2 p-2 bg-muted/50 border-t">
                    <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={pageNumber <= 1}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous page</span>
                    </Button>
                    <span className="text-sm">
                        Page {pageNumber} of {numPages}
                    </span>
                    <Button variant="outline" size="icon" onClick={handleNextPage} disabled={pageNumber >= numPages}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next page</span>
                    </Button>
                </div>
            )}
        </div>
    )
}

