import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SettingsState = {
  maxPoints: number;
  setMaxPoints: Dispatch<SetStateAction<number>>;
  rounds: number;
  setRounds: Dispatch<SetStateAction<number>>;
  currentRound: number;
  setCurrentRound: Dispatch<SetStateAction<number>>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  isLoserOn: boolean;
  setIsLoserOn: Dispatch<SetStateAction<boolean>>;
  isWhoSTartOn: boolean;
  setIsWhoSTartOn: Dispatch<SetStateAction<boolean>>;
  isChangePlacesOn: boolean;
  setIsChangePlacesOn: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
  roundsArray: number[];
};

export const SettingsContext = createContext<SettingsState | null>(null);

export default function SettingsProvider({ children }: any) {
  const [maxPoints, setMaxPoints] = useState<number>(150);
  const [rounds, setRounds] = useState<number>(5);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [time, setTime] = useState<number>(5);
  const [isWhoSTartOn, setIsWhoSTartOn] = useState<boolean>(true);
  const [isLoserOn, setIsLoserOn] = useState<boolean>(false);
  const [isChangePlacesOn, setIsChangePlacesOn] = useState<boolean>(false);
  const [roundsArray, setRoundsArray] = useState<number[]>([5]);

  const reset = () => {
    setMaxPoints(150);
    setRounds(5);
    setTime(5);
    setIsWhoSTartOn(true);
    setIsLoserOn(false);
    setIsChangePlacesOn(false);
  };

  useEffect(() => {
    const newRoundsArray: number[] = [];
    for (let i = 0; i < rounds; i++) {
      newRoundsArray.push(i);
    }
    setRoundsArray(newRoundsArray);
  }, [rounds]);

  return (
    <SettingsContext.Provider
      value={{
        maxPoints,
        setMaxPoints,
        rounds,
        setRounds,
        currentRound,
        setCurrentRound,
        time,
        setTime,
        isLoserOn,
        setIsLoserOn,
        isWhoSTartOn,
        setIsWhoSTartOn,
        isChangePlacesOn,
        setIsChangePlacesOn,
        reset,
        roundsArray,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a PlayerProvider");
  }
  return context;
}
