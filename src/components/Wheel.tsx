import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { describeArc, polarToCartesian } from "../utils/wheel";
import { wheelColors } from "../utils/colors";

interface WheelProps {
  options: string[];
  soundEnabled: boolean;
  playClick: () => void;
  playTick: () => void;
  onSpinComplete: (winner: string) => void;
}

const SIZE = 500;
const RADIUS = 240;
const CENTER = SIZE / 2;

export default function Wheel({
  options,
  soundEnabled,
  playClick,
  playTick,
  onSpinComplete,
}: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinOptions, setSpinOptions] = useState<string[] | null>(null);

  const tickIntervalRef = useRef<number | null>(null);
  const spinTimeoutRef = useRef<number | null>(null);

  /*
   * Durante el giro usamos una copia de las opciones
   * para que los segmentos no cambien a mitad de la animación.
   */
  const displayedOptions =
    isSpinning && spinOptions !== null ? spinOptions : options;

  const slice =
    displayedOptions.length > 0 ? 360 / displayedOptions.length : 0;

  /*
   * Sonido de la ruleta mientras gira.
   */
  useEffect(() => {
    if (!isSpinning || !soundEnabled) {
      if (tickIntervalRef.current !== null) {
        clearTimeout(tickIntervalRef.current);
        tickIntervalRef.current = null;
      }

      return;
    }

    let delay = 90;

    const tick = () => {
      playTick();

      delay = Math.min(delay + 12, 220);
      tickIntervalRef.current = window.setTimeout(tick, delay);
    };

    tick();

    return () => {
      if (tickIntervalRef.current !== null) {
        clearTimeout(tickIntervalRef.current);
        tickIntervalRef.current = null;
      }
    };
  }, [isSpinning, soundEnabled, playTick]);

  /*
   * Limpieza de los temporizadores al desmontar el componente.
   */
  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current !== null) {
        clearTimeout(spinTimeoutRef.current);
      }

      if (tickIntervalRef.current !== null) {
        clearTimeout(tickIntervalRef.current);
      }
    };
  }, []);

  /*
   * Iniciar giro.
   */
  const spinWheel = () => {
    if (isSpinning || options.length < 2) return;

    // Guardamos las opciones exactas de este giro.
    const optionsAtSpin = [...options];
    const spinSlice = 360 / optionsAtSpin.length;

    setSpinOptions(optionsAtSpin);
    setIsSpinning(true);

    if (soundEnabled) {
      playClick();
    }

    // Elegimos al ganador usando la copia guardada.
    const winnerIndex = Math.floor(
      Math.random() * optionsAtSpin.length
    );

    // Centro del segmento ganador.
    const winnerAngle = winnerIndex * spinSlice + spinSlice / 2;

    // Normalizamos la rotación actual entre 0 y 360.
    const currentRotation = ((rotation % 360) + 360) % 360;

    // Calculamos cuánto falta para alinear el ganador
    // con el indicador superior.
    const correction =
      (360 - ((currentRotation + winnerAngle) % 360)) % 360;

    // Cinco vueltas completas antes de detenerse.
    const extraSpins = 5 * 360;
    const targetRotation = rotation + extraSpins + correction;

    setRotation(targetRotation);

    // La animación dura 4,5 segundos.
    spinTimeoutRef.current = window.setTimeout(() => {
      const selectedWinner = optionsAtSpin[winnerIndex];

      onSpinComplete(selectedWinner);

      setIsSpinning(false);
      setSpinOptions(null);
      spinTimeoutRef.current = null;
    }, 4500);
  };

  /*
   * Estado vacío.
   */
  if (displayedOptions.length === 0) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <div className="mb-4 text-6xl">🎡</div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Tu ruleta está vacía
        </h2>

        <p className="mt-2 max-w-sm text-gray-500 dark:text-gray-400">
          Agrega algunas opciones para comenzar a jugar.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col items-center py-10 lg:py-4">
      {/* Indicador */}
      <div className="relative z-10 text-4xl leading-none sm:text-5xl">
        ▼
      </div>

      {/* Ruleta */}
      <div
        className="relative -mt-1 min-w-0 w-full max-w-[500px] aspect-square"
        onClick={spinWheel}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            spinWheel();
          }
        }}
        role="button"
        tabIndex={options.length < 2 || isSpinning ? -1 : 0}
        aria-label={
          options.length < 2
            ? "Agrega otra opción para girar la ruleta"
            : "Girar la ruleta"
        }
        aria-disabled={options.length < 2 || isSpinning}
      >
        <motion.div
          animate={{ rotate: rotation }}
          transition={{
            duration: 4.5,
            ease: [0.12, 0.8, 0.25, 1],
          }}
          className={`absolute inset-0 origin-center ${
            options.length < 2 || isSpinning
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-full w-full drop-shadow-2xl"
          >
            {displayedOptions.map((option, index) => {
              const startAngle = index * slice;
              const endAngle = startAngle + slice;
              const textAngle = startAngle + slice / 2;
              const textRadius = 95;

              const textPosition = polarToCartesian(
                CENTER,
                CENTER,
                textRadius,
                textAngle
              );

              const textSize =
                displayedOptions.length <= 8
                  ? 18
                  : displayedOptions.length <= 12
                    ? 16
                    : displayedOptions.length <= 20
                      ? 14
                      : 11;

              let textRotation = textAngle - 90;
              let textAnchor: "start" | "end" = "start";

              if (textRotation > 90 || textRotation < -90) {
                textRotation += 180;
                textAnchor = "end";
              }

              return (
                <g key={`${option}-${index}`}>
                  {/* Segmento */}
                  <path
                    d={describeArc(
                      CENTER,
                      CENTER,
                      RADIUS,
                      startAngle,
                      endAngle
                    )}
                    fill={wheelColors[index % wheelColors.length]}
                    stroke="white"
                    strokeWidth={3}
                  />

                  {/* Texto */}
                  <text
                    x={textPosition.x}
                    y={textPosition.y}
                    fill="white"
                    fontSize={textSize}
                    fontWeight="600"
                    textAnchor={textAnchor}
                    dominantBaseline="middle"
                    transform={`rotate(${textRotation} ${textPosition.x} ${textPosition.y})`}
                    className="pointer-events-none select-none"
                  >
                    {option}
                  </text>
                </g>
              );
            })}

            {/* Centro de la ruleta */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r="35"
              fill="white"
              stroke="#4f46e5"
              strokeWidth={5}
              className="dark:fill-zinc-900"
            />

            <circle
              cx={CENTER}
              cy={CENTER}
              r="10"
              fill="#4f46e5"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
