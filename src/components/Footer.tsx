export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between px-6 py-8 text-sm text-zinc-500 md:flex-row">
        <p>
          © {new Date().getFullYear()} Ruletazo
        </p>

        <p className="mt-2 md:mt-0">
          Desarrollado por{" "}
          <a
            href="https://portafolio-jasson.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-800 transition-colors hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400"
          >
            Jasson D. Gomez
          </a>
        </p>
      </div>
    </footer>
  );
}