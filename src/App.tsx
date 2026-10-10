import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useHistory } from "./hooks/useHistory";
import { useConfetti } from "./hooks/useConfetti";
import { useSound } from "./hooks/useSound";
import type { Roulette } from "./types";
import History from "./components/History";
import WinnerModal from "./components/WinnerModal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wheel from "./components/Wheel";
import OptionForm from "./components/OptionForm";
import OptionList from "./components/OptionList";
import RouletteSelector from "./components/RouletteSelector";

const ROULETTES_KEY = "ruletazo-roulettes";
const SELECTED_ROULETTE_KEY = "ruletazo-selected-roulette";


function isRouletteArray(
  value: unknown
): value is Roulette[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (roulette) =>
        typeof roulette === "object" &&
        roulette !== null &&
        typeof roulette.id === "string" &&
        roulette.id.length > 0 &&
        typeof roulette.name === "string" &&
        Array.isArray(roulette.options) &&
        roulette.options.every(
          (option: unknown) =>
            typeof option === "string"
        )
    )
  );
}

function getInitialRoulettes(): Roulette[] {
try {
const savedRoulettes = localStorage.getItem(ROULETTES_KEY);

if (savedRoulettes !== null) {
  const parsed: unknown = JSON.parse(savedRoulettes);

  if (Array.isArray(parsed) && parsed.length > 0) {
    return parsed as Roulette[];
  }
}

// Migrar las opciones guardadas por la versión anterior.
const savedOptions = localStorage.getItem("ruletazo-options");
const parsedOptions: unknown = savedOptions
  ? JSON.parse(savedOptions)
  : [];

const options = Array.isArray(parsedOptions)
  ? parsedOptions.filter(
      (option): option is string => typeof option === "string"
    )
  : [];

return [
  {
    id: crypto.randomUUID(),
    name: "Mi ruleta",
    options,
  },
];

} catch {
return [
{
id: crypto.randomUUID(),
name: "Mi ruleta",
options: [],
},
];
}
}

function App() {
const [roulettes, setRoulettes] = useLocalStorage<Roulette[]>(
ROULETTES_KEY,
getInitialRoulettes(),
isRouletteArray
);


const [selectedRouletteId, setSelectedRouletteId] = useState(() => {
  const savedId = localStorage.getItem(SELECTED_ROULETTE_KEY);

  return roulettes.some((roulette) => roulette.id === savedId)
    ? savedId!
    : roulettes[0].id;
});

const selectedRoulette =
roulettes.find((roulette) => roulette.id === selectedRouletteId) ??
roulettes[0];

const options = selectedRoulette?.options ?? [];

useEffect(() => {
  if (selectedRoulette) {
    localStorage.setItem(
      SELECTED_ROULETTE_KEY,
      selectedRoulette.id
    );
  }
}, [selectedRoulette]);

// Tema
const [darkMode, setDarkMode] = useState(() => {
const savedTheme = localStorage.getItem("ruletazo-theme");


if (savedTheme) {
  return savedTheme === "dark";
}

return window.matchMedia("(prefers-color-scheme: dark)").matches;


});

useEffect(() => {
const root = document.documentElement;


if (darkMode) {
  root.classList.add("dark");
  localStorage.setItem("ruletazo-theme", "dark");
} else {
  root.classList.remove("dark");
  localStorage.setItem("ruletazo-theme", "light");
}


}, [darkMode]);

const toggleDarkMode = () => {
setDarkMode((current) => !current);
};

const updateSelectedOptions = (
update: (currentOptions: string[]) => string[]
) => {
if (!selectedRoulette) return;


setRoulettes((currentRoulettes) =>
  currentRoulettes.map((roulette) =>
    roulette.id === selectedRoulette.id
      ? { ...roulette, options: update(roulette.options) }
      : roulette
  )
);


};

const addOption = (option: string) => {
updateSelectedOptions((currentOptions) => [
...currentOptions,
option,
]);
};

const removeOption = (index: number) => {
updateSelectedOptions((currentOptions) =>
currentOptions.filter((_, i) => i !== index)
);
};

const editOption = (index: number, value: string) => {
updateSelectedOptions((currentOptions) =>
currentOptions.map((option, i) =>
i === index ? value : option
)
);
};

const createRoulette = (name: string) => {
const newRoulette: Roulette = {
id: crypto.randomUUID(),
name,
options: [],
};


setRoulettes((currentRoulettes) => [
  ...currentRoulettes,
  newRoulette,
]);

setSelectedRouletteId(newRoulette.id);


};

const renameRoulette = (id: string, name: string) => {
setRoulettes((currentRoulettes) =>
currentRoulettes.map((roulette) =>
roulette.id === id ? { ...roulette, name } : roulette
)
);
};

const deleteRoulette = (id: string) => {
if (roulettes.length <= 1) return;

const remainingRoulettes = roulettes.filter(
  (roulette) => roulette.id !== id
);

setRoulettes(remainingRoulettes);

if (selectedRouletteId === id) {
  setSelectedRouletteId(remainingRoulettes[0].id);
}

};

const {
history,
addResult,
clearHistory,
} = useHistory();

const [winner, setWinner] = useState<string | null>(null);
const { celebrate } = useConfetti();

const {
soundEnabled,
toggleSound,
playClick,
playTick,
playWinner,
} = useSound();

return ( <div className="min-h-screen bg-slate-50 text-gray-900 transition-colors duration-300 dark:bg-black dark:text-gray-100"> <main className="mx-auto max-w-6xl px-4 sm:px-6"> <Header
       darkMode={darkMode}
       onToggleTheme={toggleDarkMode}
       soundEnabled={soundEnabled}
       onToggleSound={toggleSound}
     />

    <section className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      {/* Ruleta */}
      <div className="min-w-0">
        <Wheel
          options={options}
          soundEnabled={soundEnabled}
          playClick={playClick}
          playTick={playTick}
          onSpinComplete={(result) => {
            addResult(
              result,
              selectedRoulette?.id,
              selectedRoulette?.name,
              roulettes[0]?.id
            );

            setWinner(result);
            playWinner();

            setTimeout(() => {
              celebrate();
            }, 150);
          }}
        />
      </div>

      {/* Opciones de la ruleta seleccionada */}
      <aside className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900 lg:max-h-[calc(100vh-140px)]">

        <RouletteSelector
          roulettes={roulettes}
          selectedId={selectedRoulette?.id ?? ""}
          onSelect={setSelectedRouletteId}
          onCreate={createRoulette}
          onRename={renameRoulette}
          onDelete={deleteRoulette}
        />

        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
            <List size={22} />
          </div>

          <div>
            <h2 className="font-bold text-gray-900 dark:text-gray-100">
              Tus opciones
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {options.length} opciones
            </p>
          </div>
        </div>

        <OptionForm onAdd={addOption} />

        <OptionList
          options={options}
          onRemove={removeOption}
          onEdit={editOption}
        />
      </aside>
    </section>

    <History
      history={history.filter(
        (item) =>
          item.rouletteId === selectedRoulette?.id ||
          (
            !item.rouletteId &&
            selectedRoulette?.id === roulettes[0]?.id
          )
      )}
      onClear={() =>
        clearHistory(
          selectedRoulette?.id,
          roulettes[0]?.id
        )
      }
    />

    <WinnerModal
      winner={winner}
      onClose={() => setWinner(null)}
    />

    <Footer />
  </main>
</div>

);
}

export default App;
