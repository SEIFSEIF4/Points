import { useState, useEffect, createContext, useContext } from "react";
import { Audio } from "expo-av";
import { useSettings } from "@/hooks/Settings-context";

type TimerContextValue = {
  timeValue: number;
  setTimeValue: (time: number) => void;
  timerRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  restartTimer: () => void;
  addExtraTime: (extraTime: number) => void;
  formatTime: (seconds: number) => string;
  playSound: () => void;
  StopSound: () => void;
  time: number;
};

export const TimerContext = createContext<TimerContextValue | null>(null);

export default function TimerProvider({ children }: any) {
  const { time, setTime } = useSettings();
  const [timeValue, setTimeValue] = useState<number>(time);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const { gameStarted, muted } = useSettings();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/alarm.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  const StopSound = async () => {
    if (sound) {
      console.log("Stopping Sound");
      await sound.stopAsync();
    }
  };

  const startTimer = () => {
    setTimeValue(time);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    if (sound) {
      StopSound();
    }
  };

  const restartTimer = () => {
    setTimeValue(time);
    setTimerRunning(false);
  };

  const addExtraTime = (extraTime: number) => {
    if (sound) {
      StopSound();
    }
    setTimeValue((prevTime) => prevTime + extraTime * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    return sound
      ? () => {
          (sound as Audio.Sound).unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    let timerInterval: any;

    if (gameStarted && timerRunning) {
      timerInterval = setInterval(() => {
        setTimeValue((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerInterval);
            setTimerRunning(false);
            if (!muted) {
              playSound();
            }
            return 0; // Add this line to ensure a number value is always returned
          }
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    // Cleanup interval on component unmount
    return () => clearInterval(timerInterval);
  }, [timerRunning]);

  return (
    <TimerContext.Provider
      value={{
        time,
        timeValue,
        setTimeValue,
        timerRunning,
        startTimer,
        stopTimer,
        restartTimer,
        addExtraTime,
        formatTime,
        playSound,
        StopSound,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
