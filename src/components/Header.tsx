import { Moon, Sun, Trophy, Volume2, VolumeX, } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Header({
  darkMode,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-indigo-600 p-3 text-white">
          <Trophy size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Ruletazo
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Decide al azar en segundos
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Sonido */}
        <button
          onClick={onToggleSound}
          className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 shadow-sm transition hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800"
          aria-label={
            soundEnabled
              ? "Desactivar sonido"
              : "Activar sonido"
          }
          title={
            soundEnabled
              ? "Desactivar sonido"
              : "Activar sonido"
          }
        >
          {soundEnabled ? (
            <Volume2 size={20} />
          ) : (
            <VolumeX size={20} />
          )}
        </button>

        {/* Tema */}
        <button
          onClick={onToggleTheme}
          className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 shadow-sm transition hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800"
          aria-label={
            darkMode
              ? "Cambiar a modo claro"
              : "Cambiar a modo oscuro"
          }
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </div>
    </header>
  );
}