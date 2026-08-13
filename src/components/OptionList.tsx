import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";

interface OptionListProps {
  options: string[];
  onRemove: (index: number) => void;
  onEdit: (index: number, value: string) => void;
}

export default function OptionList({
  options,
  onRemove,
  onEdit,
}: OptionListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditValue(options[index]);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const saveEditing = (index: number) => {
    const value = editValue.trim();

    if (!value) return;

    onEdit(index, value);
    cancelEditing();
  };

  return (
    <div className="options-scroll mt-6 space-y-2 lg:max-h-[calc(100vh-390px)] lg:overflow-y-auto lg:pr-2">
      {options.map((option, index) => (
        <div
          key={`${option}-${index}`}
          className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          {editingIndex === index ? (
            <div className="flex items-center gap-2 p-3">
              <input
                type="text"
                value={editValue}
                onChange={(event) =>
                  setEditValue(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    saveEditing(index);
                  }

                  if (event.key === "Escape") {
                    cancelEditing();
                  }
                }}
                autoFocus
                maxLength={40}
                className="min-w-0 flex-1 rounded-lg border border-indigo-300 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-100 dark:border-indigo-500/50 dark:bg-zinc-800 dark:text-white dark:focus:ring-indigo-500/20"
              />

              <button
                onClick={() => saveEditing(index)}
                className="rounded-lg p-2 text-green-600 transition hover:bg-green-50 dark:hover:bg-green-500/10"
                aria-label="Guardar"
              >
                <Check size={18} />
              </button>

              <button
                onClick={cancelEditing}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 dark:hover:bg-zinc-800"
                aria-label="Cancelar"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                  {index + 1}
                </span>

                <span className="truncate font-medium text-gray-700 dark:text-gray-200">
                  {option}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => startEditing(index)}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-500 dark:hover:bg-indigo-500/10"
                  aria-label={`Editar ${option}`}
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => onRemove(index)}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                  aria-label={`Eliminar ${option}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}