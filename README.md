# React Table of Contents with Auto Highlight

![Screen Recording 2025-06-10 at 9 31 55 PM](https://github.com/user-attachments/assets/2645a508-b116-4716-b750-5b58aabfc121)

## [Demo](https://playcode.io/2419175)

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
