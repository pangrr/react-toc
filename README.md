# React Table of Contents with Auto Highlight

## Usage

`handleContainer` generates one table of contents entry for each `<section />` inside the container element.

The `innerText` of the first `<h2 />` inside each `<section />` is used as the label of each entry in the table of contents.

```tsx
import useToc from "@pangrr/react-toc";

function App() {
  const { toc, activeId, handleContainer } = useToc();

  return (
    <>
      <nav>
        <ul>
          {toc.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`${id === activeId ? "text-blue-500" : ""}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <main ref={handleContainer}>
        <section>
          <h2>Section 1</h2>
          <p>Content</p>
        </section>
      </main>
    </>
  );
}
```
