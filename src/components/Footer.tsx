export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500">

        <p>
          © {new Date().getFullYear()} Ruletazo
        </p>

        <p className="mt-2 md:mt-0">
          Desarrollado por <span className="text-zinc-300">
            <a href="https://portafolio-jasson.vercel.app"> Jasson D. Gomez </a>
          </span>
        </p>

      </div>
    </footer>
  );
}