import Image from 'next/image';

const demoPages: string[] = ['demo1022'];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul>
          {demoPages.map((page) => (
            <li key={page}>
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href={`/${page}`}
              >
                <Image
                  aria-hidden
                  src="https://nextjs.org/icons/window.svg"
                  alt="External link icon"
                  width={16}
                  height={16}
                />
                {page} →
              </a>
            </li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://mitsuura.jp/wp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          https://mitsuura.jp/wp/ →
        </a>
      </footer>
    </div>
  );
}
