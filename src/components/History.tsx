import { Clock, Trash2, Trophy } from "lucide-react";
import type { HistoryItem } from "../types";

interface HistoryProps {
  history: HistoryItem[];
  onClear: () => void;
}

export default function History({
  history,
  onClear,
}: HistoryProps) {
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-100 p-2 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
            <Trophy size={22} />
          </div>

          <div>
            <h2 className="font-bold text-gray-900 dark:text-gray-100">
              Historial
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {history.length} resultado
              {history.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
          >
            <Trash2 size={16} />

            <span className="hidden sm:inline">
              Limpiar
            </span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <Clock
            size={40}
            className="text-gray-300 dark:text-zinc-700"
          />

          <p className="mt-3 font-medium text-gray-500 dark:text-gray-400">
            Aún no hay resultados
          </p>

          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Los resultados de tus giros aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-zinc-800/70"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                  {index + 1}
                </span>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-800 dark:text-gray-200">
                    {item.option}
                  </p>

                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(item.date)}
                  </p>
                </div>
              </div>

              <span className="text-lg">
                🏆
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}