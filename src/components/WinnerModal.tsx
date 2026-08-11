import { AnimatePresence, motion } from "framer-motion";
import { Trophy, X } from "lucide-react";

interface WinnerModalProps {
  winner: string | null;
  onClose: () => void;
}

export default function WinnerModal({
  winner,
  onClose,
}: WinnerModalProps) {
  return (
    <AnimatePresence>
      {winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            onClick={(event) => event.stopPropagation()}
            className="relative min-w-0 w-full max-w-[calc(100%-2rem)] md:max-w-xl overflow-hidden rounded-3xl bg-white p-6 sm:p-8 md:p-7 text-center shadow-2xl dark:bg-zinc-900"
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 transition hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label="Cerrar"
            >
              <X size={22} />
            </button>

            {/* Trofeo */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 300,
              }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
            >
              <Trophy size={42} />
            </motion.div>

            {/* Título */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500"
            >
              ¡Tenemos ganador!
            </motion.p>

            {/* Ganador */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 250,
              }}
              className="mt-3 break-words text-3xl font-black text-gray-900 dark:text-white sm:text-4xl"
            >
              {winner}
            </motion.h2>

            {/* Mensaje */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-3 break-words text-3xl font-black text-gray-900 dark:text-white sm:text-4xl"
            >
              ¡La suerte ha hablado! 🎉
            </motion.p>

            {/* Botón */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={onClose}
              className="mt-7 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              Continuar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}