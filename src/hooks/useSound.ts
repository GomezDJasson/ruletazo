import { useCallback, useEffect, useRef, useState } from "react";

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("ruletazo-sound");
    return saved !== "off";
  });

  const audioContextRef = useRef<AudioContext | null>(null);

  const activeOscillatorsRef = useRef<Set<OscillatorNode>>(
    new Set()
  );

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    return audioContextRef.current;
  }, []);

  const stopAllSounds = useCallback(() => {
    activeOscillatorsRef.current.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        // El oscilador puede haber terminado ya.
      }
    });

    activeOscillatorsRef.current.clear();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "ruletazo-sound",
      soundEnabled ? "on" : "off"
    );

    if (!soundEnabled) {
      stopAllSounds();
    }
  }, [soundEnabled, stopAllSounds]);

  const playTone = useCallback(
    (
      frequency: number,
      duration: number,
      volume: number,
      type: OscillatorType = "sine"
    ) => {
      if (!soundEnabled) return;

      const context = getAudioContext();

      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = type;

      oscillator.frequency.setValueAtTime(
        frequency,
        context.currentTime
      );

      gain.gain.setValueAtTime(
        volume,
        context.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + duration
      );

      oscillator.connect(gain);
      gain.connect(context.destination);

      activeOscillatorsRef.current.add(oscillator);

      oscillator.onended = () => {
        activeOscillatorsRef.current.delete(oscillator);
      };

      oscillator.start();
      oscillator.stop(
        context.currentTime + duration
      );
    },
    [soundEnabled, getAudioContext]
  );

  const playClick = useCallback(() => {
    playTone(700, 0.06, 0.08, "square");
  }, [playTone]);

  const playTick = useCallback(() => {
    playTone(900, 0.045, 0.045, "square");
  }, [playTone]);

  const playWinner = useCallback(() => {
    if (!soundEnabled) return;

    const context = getAudioContext();

    const notes = [
      { frequency: 523.25, delay: 0 },
      { frequency: 659.25, delay: 0.12 },
      { frequency: 783.99, delay: 0.24 },
      { frequency: 1046.5, delay: 0.38 },
    ];

    notes.forEach(({ frequency, delay }) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(
        frequency,
        context.currentTime + delay
      );

      gain.gain.setValueAtTime(
        0.0001,
        context.currentTime + delay
      );

      gain.gain.exponentialRampToValueAtTime(
        0.12,
        context.currentTime + delay + 0.02
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + delay + 0.45
      );

      oscillator.connect(gain);
      gain.connect(context.destination);

      activeOscillatorsRef.current.add(oscillator);

      oscillator.onended = () => {
        activeOscillatorsRef.current.delete(oscillator);
      };

      oscillator.start(
        context.currentTime + delay
      );

      oscillator.stop(
        context.currentTime + delay + 0.45
      );
    });
  }, [soundEnabled, getAudioContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((current) => !current);
  }, []);

  return {
    soundEnabled,
    toggleSound,
    playClick,
    playTick,
    playWinner,
  };
}