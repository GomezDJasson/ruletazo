import { useState } from "react";
import { Plus } from "lucide-react";

interface OptionFormProps {
  onAdd: (option: string) => void;
}

export default function OptionForm({ onAdd }: OptionFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const option = value.trim();

    if (!option) return;

    onAdd(option);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Escribe una opción..."
        maxLength={40}
        className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
      />

      <button
        type="submit"
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
      >
        <Plus size={20} />

        <span className="hidden sm:inline">
          Agregar
        </span>
      </button>
    </form>
  );
}