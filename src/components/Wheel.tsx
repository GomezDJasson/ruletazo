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

  const tickIntervalRef = useRef<number | null>(null);
  const spinTimeoutRef = useRef<number | null>(null);

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
   * Limpieza del timeout si el componente se desmonta
   * mientras la ruleta está girando.
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
   * No intentamos calcular segmentos si la ruleta está vacía.
   */
  const slice = options.length > 0 ? 360 / options.length : 0;

  const spinWheel = () => {
    if (isSpinning || options.length < 2) return;

    if (soundEnabled) {
      playClick();
    }

    setIsSpinning(true);

    /*
     * Elegimos aleatoriamente el ganador.
     */
    const winnerIndex = Math.floor(Math.random() * options.length);

    /*
     * Ángulo central del segmento ganador.
     *
     * Cada segmento comienza en:
     * index * slice
     *
     * Por lo tanto, su centro está en:
     * index * slice + slice / 2
     */
    const winnerAngle = winnerIndex * slice + slice / 2;

    /*
     * Normalizamos la rotación actual entre 0 y 360.
     */
    const currentRotation =
      ((rotation % 360) + 360) % 360;

    /*
     * Queremos que el centro del segmento ganador
     * termine exactamente debajo del indicador superior.
     *
     * El indicador está en 0°.
     */
    const correction =
      (360 - ((currentRotation + winnerAngle) % 360)) % 360;

    /*
     * Cinco vueltas completas antes de llegar
     * al segmento ganador.
     */
    const extraSpins = 5 * 360;

    const targetRotation =
      rotation + extraSpins + correction;

    setRotation(targetRotation);

    /*
     * Esperamos exactamente lo mismo que dura
     * la animación de Framer Motion.
     */
    spinTimeoutRef.current = window.setTimeout(() => {
      const selectedWinner = options[winnerIndex];

      onSpinComplete(selectedWinner);
      setIsSpinning(false);
      spinTimeoutRef.current = null;
    }, 4500);
  };

  /*
   * Estado vacío.
   */
  if (options.length === 0) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <div className="mb-4 text-6xl">
          🎡
        </div>

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
    <div className="flex min-w-0 flex-col items-center py-10">

      {/* Indicador */}
      <div className="relative z-10 text-4xl leading-none sm:text-5xl">
        ▼
      </div>

      {/* Ruleta */}
      <div className="relative -mt-1 min-w-0 w-full max-w-[500px]">
        <motion.div
          animate={{ rotate: rotation }}
          transition={{
            duration: 4.5,
            ease: [0.12, 0.8, 0.25, 1],
          }}
          className="w-full"
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-auto w-full max-w-[500px] drop-shadow-2xl"
          >
            {options.map((option, index) => {
              const startAngle = index * slice;
              const endAngle = startAngle + slice;

              // Ángulo central del segmento
              const textAngle = startAngle + slice / 2;

              /*
              * El texto comienza cerca del centro
              * y se extiende hacia el borde.
              */
              const textRadius = 95;

              const textPosition = polarToCartesian(
                CENTER,
                CENTER,
                textRadius,
                textAngle
              );

              /*
              * Reducimos el tamaño cuando existen
              * muchas opciones.
              */
              const textSize =
                options.length <= 8
                  ? 18
                  : options.length <= 12
                    ? 16
                    : options.length <= 20
                      ? 14
                      : 11;

              /*
              * IMPORTANTE:
              *
              * polarToCartesian() considera 0° hacia arriba,
              * mientras que SVG considera 0° hacia la derecha.
              *
              * Por eso debemos restar 90°.
              */
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
                    fill={
                      wheelColors[
                        index % wheelColors.length
                      ]
                    }
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
                    transform={`
                      rotate(
                        ${textRotation}
                        ${textPosition.x}
                        ${textPosition.y}
                      )
                    `}
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
              strokeWidth="5"
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

      {/* Botón */}
      <button
        onClick={spinWheel}
        disabled={isSpinning || options.length < 2}
        className="mt-10 rounded-xl bg-indigo-600 px-10 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSpinning
          ? "Girando..."
          : options.length < 2
            ? "Agrega otra opción"
            : "Girar"}
      </button>
    </div>
  );
}
