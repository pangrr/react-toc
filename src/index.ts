import { useCallback, useRef, useState } from "react";

export default function useToc() {
  const [toc, setToc] = useState<{ label: string; id: string }[]>([]);
  const [activeId, setActiveId] = useState<string>();
  const intersectionObserverEntriesRef = useRef(
    new Map<string, IntersectionObserverEntry>()
  );

  const handleContainer = useCallback((containerElement: HTMLElement) => {
    if (!containerElement) return;

    const sections = Array.from(containerElement.querySelectorAll("section"));
    const observer = new IntersectionObserver(intersectionCallback);

    sections.forEach((e, i) => e.setAttribute("id", i.toString()));
    sections.forEach((e) => observer.observe(e));

    setToc(
      sections.map((section) => ({
        label: section.querySelector("h2")?.innerText ?? "undefined",
        id: section.id,
      }))
    );

    function intersectionCallback(entries: IntersectionObserverEntry[]) {
      entries.forEach((e) =>
        intersectionObserverEntriesRef.current.set(e.target.id, e)
      );
      const sortedVisibleEntries = Array.from(
        intersectionObserverEntriesRef.current.values()
      )
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) =>
            sections.findIndex(({ id }) => a.target.id === id) -
            sections.findIndex(({ id }) => b.target.id === id)
        );

      const firstVisibleEntry = sortedVisibleEntries[0];

      if (firstVisibleEntry) {
        setActiveId(firstVisibleEntry.target.id);
      }
    }
  }, []);

  return { toc, activeId, handleContainer };
}
