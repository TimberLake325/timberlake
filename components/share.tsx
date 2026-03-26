"use client"

import { useState } from "react"
import { LucideShare2 } from "lucide-react"

type ShareProps = {
    link: string
    title?: string
}

const Share = ({ link, title = 'Share' }: ShareProps) => {
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || document.title,
                    url: link,
                })
            } catch (error) {
                console.error("Failed to share: ", error )
            }
        } else {
            try {
                await navigator.clipboard.writeText(link)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (error) {
                console.error("Failed to copy")
            }
        }
    }

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 px-4 py-2 rounded-full transition-all border border-primary/10"
        >
            <LucideShare2 size={14} />
            {copied ? "Copied!" : title}
        </button>
    )
}

export default Share