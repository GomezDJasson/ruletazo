import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { List } from "lucide-react";
import { useHistory } from "./hooks/useHistory";
import { useConfetti } from "./hooks/useConfetti";
import { useSound } from "./hooks/useSound";
import History from "./components/History";
import WinnerModal from "./components/WinnerModal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wheel from "./components/Wheel";
import OptionForm from "./components/OptionForm";
import OptionList from "./components/OptionList";

function App() {
  const [options, setOptions] = useLocalStorage<string[]>(
    "ruletazo-options",
    [
      
    ]
  );

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

  const addOption = (option: string) => {
    setOptions((currentOptions) => [
      ...currentOptions,
      option,
    ]);
  };

  const removeOption = (index: number) => {
    setOptions((currentOptions) =>
      currentOptions.filter((_, i) => i !== index)
    );
  };

  const editOption = (index: number, value: string) => {
    setOptions((currentOptions) =>
      currentOptions.map((option, i) =>
        i === index ? value : option
      )
    );
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-black dark:text-gray-100">
      <main className="mx-auto max-w-6xl px-4 sm:px-6">

        <Header
          darkMode={darkMode}
          onToggleTheme={toggleDarkMode}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        <section className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">

          {/* Ruleta */}
          <div>
            <Wheel
              options={options}
              soundEnabled={soundEnabled}
              playClick={playClick}
              playTick={playTick}
              onSpinComplete={(result) => {
                addResult(result);
                setWinner(result);

                playWinner();

                setTimeout(() => {
                  celebrate();
                }, 150);
              }}
            />
          </div>

          {/* Panel */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">

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
          history={history}
          onClear={clearHistory}
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