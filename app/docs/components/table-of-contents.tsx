'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  level: number
  text: string
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h1, h2, h3'))
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1))
      }))

    setHeadings(elements)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    elements.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">On this page</p>
      <div className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block text-sm transition-colors hover:text-foreground",
              heading.level === 1 && "pl-0",
              heading.level === 2 && "pl-4",
              heading.level === 3 && "pl-8",
              activeId === heading.id
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </div>
  )
} 