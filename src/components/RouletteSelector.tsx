import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Roulette } from "../types";

interface RouletteSelectorProps {
roulettes: Roulette[];
selectedId: string;
onSelect: (id: string) => void;
onCreate: (name: string) => void;
onRename: (id: string, name: string) => void;
onDelete: (id: string) => void;
}

export default function RouletteSelector({
roulettes,
selectedId,
onSelect,
onCreate,
onRename,
onDelete,
}: RouletteSelectorProps) {
const selectedRoulette = roulettes.find(
(roulette) => roulette.id === selectedId
);

const handleCreate = () => {
const name = window.prompt("Nombre de la nueva ruleta:");


if (name?.trim()) {
  onCreate(name.trim());
}


};

const handleRename = () => {
if (!selectedRoulette) return;


const name = window.prompt(
  "Nuevo nombre para la ruleta:",
  selectedRoulette.name
);

if (name?.trim()) {
  onRename(selectedRoulette.id, name.trim());
}


};

const handleDelete = () => {
if (!selectedRoulette || roulettes.length <= 1) return;


const confirmed = window.confirm(
  `¿Eliminar la ruleta "${selectedRoulette.name}" y sus opciones?`
);

if (confirmed) {
  onDelete(selectedRoulette.id);
}


};

return ( <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"> <label
     htmlFor="roulette-selector"
     className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
   >
Tu ruleta </label>


  <div className="flex min-w-0 flex-wrap gap-2">
    <select
      id="roulette-selector"
      value={selectedId}
      onChange={(event) => onSelect(event.target.value)}
      className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100"
    >
      {roulettes.map((roulette) => (
        <option key={roulette.id} value={roulette.id}>
          {roulette.name}
        </option>
      ))}
    </select>

    <button
      type="button"
      onClick={handleCreate}
      className="rounded-xl border border-indigo-200 p-2.5 text-indigo-600 transition hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
      aria-label="Crear ruleta"
      title="Crear ruleta"
    >
      <Plus size={18} />
    </button>

    <button
      type="button"
      onClick={handleRename}
      disabled={!selectedRoulette}
      className="rounded-xl border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800"
      aria-label="Renombrar ruleta"
      title="Renombrar ruleta"
    >
      <Pencil size={18} />
    </button>

    <button
      type="button"
      onClick={handleDelete}
      disabled={roulettes.length <= 1}
      className="rounded-xl border border-red-200 p-2.5 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-500/30 dark:hover:bg-red-500/10"
      aria-label="Eliminar ruleta"
      title={
        roulettes.length <= 1
          ? "Debes conservar al menos una ruleta"
          : "Eliminar ruleta"
      }
    >
      <Trash2 size={18} />
    </button>
  </div>

  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
    Cada ruleta conserva sus propias opciones.
  </p>
</section>

);
}
