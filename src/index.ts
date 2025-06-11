import { useCallback, useRef, useState } from "react"

export default function useToc(option?: Option) {
  const {
    sectionSelector = ":scope > section",
    headingSelector = ":scope > h2,h3"
  } = option ?? {}
  const ids = new Set()
  const [toc, setToc] = useState<TableOfContentsEntry[]>([])
  const [activeSectionId, setActiveSectionId] = useState<string>()
  const intersectionObserverEntriesRef = useRef(
    new Map<string, IntersectionObserverEntry>()
  )

  const handleContentsContainer = useCallback(
    (container: HTMLElement) => {
      if (!container) return

      const sectionsWithHeading = (
        Array.from(container.querySelectorAll(sectionSelector)) as HTMLElement[]
      )
        .map((section) => ({
          section,
          heading: section.querySelector(headingSelector) as HTMLElement
        }))
        .filter(({ heading }) => heading !== null)

      const toc_ = sectionsWithHeading.map(({ section, heading }, i) => {
        let id = section.id
        if (id === "") {
          const slug = slugify(heading.innerText)
          if (!ids.has(slug)) {
            id = slug
          } else {
            id = `${slug}-${i}`
          }
          section.setAttribute("id", id)
        }
        ids.add(id)

        return {
          id,
          label: heading.innerText,
          section,
          heading
        }
      })

      const observer = new IntersectionObserver(intersectionCallback)
      toc_.forEach((e) => observer.observe(e.section))

      setToc(toc_)

      function intersectionCallback(entries: IntersectionObserverEntry[]) {
        entries.forEach((e) =>
          intersectionObserverEntriesRef.current.set(e.target.id, e)
        )
        const sortedVisibleEntries = Array.from(
          intersectionObserverEntriesRef.current.values()
        )
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              toc_.findIndex(({ id }) => a.target.id === id) -
              toc_.findIndex(({ id }) => b.target.id === id)
          )

        const firstVisibleEntry = sortedVisibleEntries[0]

        if (firstVisibleEntry) {
          setActiveSectionId(firstVisibleEntry.target.id)
        }
      }
    },
    [sectionSelector, headingSelector]
  )

  return { toc, activeSectionId, handleContentsContainer }
}

type TableOfContentsEntry = {
  label: string
  id: string
  section: HTMLElement
  heading: HTMLElement
}

type Option = {
  sectionSelector?: string
  headingSelector?: string
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
