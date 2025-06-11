# React Table of Contents with Auto Highlight
![Screen Recording 2025-06-11 at 10 36 11 AM](https://github.com/user-attachments/assets/f1fa5687-de74-46cc-bdc2-7c77767faebf)


## [Demo](https://playcode.io/2419175)

## Usage

```tsx
import useToc from "@pangrr/react-toc"

function App() {
  // useToc options default { sectionSelector: ":scope > section", headingSelector: ":scope > h2,h3" }
  const { toc, activeSectionId, handleContentsContainer } = useToc({
    sectionSelector: ":scope > section", // Used get all section elements within the contents container element by contentsContainerElement.querySelectorAll(sectionSelector).
    headingSelector: ":scope > h2,h3" // Used to get the heading element within each section element by sectionElement.querySelect(headingSelector). If no heading element, the section element is ignored in the table of contents
  })

  return (
    <>
      <nav>
        {toc.map(({ id, label, heading }) => (
          <div
            key={id}
            style={{
              margin: "10px 0",
              paddingLeft: heading.tagName === "H3" ? "20px" : "0px"
            }}
          >
            <a
              href={`#${id}`}
              style={{ color: id === activeSectionId ? "blue" : "black" }}
            >
              {label}
            </a>
          </div>
        ))}
      </nav>
      <main ref={handleContentsContainer}>
        <section>
          <h2>Section 1</h2>
          <p>Content</p>
        </section>
        <section>
          <h3>Section 1.1</h3>
          <p>Content</p>
        </section>
        <section>
          <h2>Section 2</h2>
          <p>Content</p>
        </section>
      </main>
    </>
  )
}
```
