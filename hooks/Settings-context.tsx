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
  isMaxPointsOn: boolean;
  setIsMaxPointsOn: Dispatch<SetStateAction<boolean>>;
  rounds: number;
  setRounds: Dispatch<SetStateAction<number>>;
  currentRound: number;
  setCurrentRound: Dispatch<SetStateAction<number>>;
  time: any;
  setTime: Dispatch<SetStateAction<number>>;
  isTimerOn: boolean;
  setITimerOn: Dispatch<SetStateAction<boolean>>;
  isLoserOn: boolean;
  setIsLoserOn: Dispatch<SetStateAction<boolean>>;
  isWhoStartOn: boolean;
  setIsWhoStartOn: Dispatch<SetStateAction<boolean>>;
  isChangePlacesOn: boolean;
  setIsChangePlacesOn: Dispatch<SetStateAction<boolean>>;
  savedInputs: string[][];
  setSavedInputs: Dispatch<SetStateAction<string[][]>>;
  gameStarted: boolean;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
  modeDouble: boolean;
  setModeDouble: Dispatch<SetStateAction<boolean>>;
  muted: boolean;
  setMuted: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
  roundsArray: number[];
};

export const SettingsContext = createContext<SettingsState | null>(null);

export default function SettingsProvider({ children }: any) {
  const [maxPoints, setMaxPoints] = useState<number>(150);
  const [isMaxPointsOn, setIsMaxPointsOn] = useState<boolean>(false);
  const [rounds, setRounds] = useState<number>(5);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [time, setTime] = useState<number>(5 * 60);
  const [isTimerOn, setITimerOn] = useState<boolean>(false);
  const [isWhoStartOn, setIsWhoStartOn] = useState<boolean>(true);
  const [isLoserOn, setIsLoserOn] = useState<boolean>(false);
  const [isChangePlacesOn, setIsChangePlacesOn] = useState<boolean>(false);
  const [roundsArray, setRoundsArray] = useState<number[]>([5]);
  const [savedInputs, setSavedInputs] = useState<string[][]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [modeDouble, setModeDouble] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);

  const reset = () => {
    setRounds(5);
    setIsWhoStartOn(true);
    setIsChangePlacesOn(false);
    setMaxPoints(150);
    setIsMaxPointsOn(false);
    setTime(5 * 60);
    setITimerOn(false);
    // setIsLoserOn(false);
  };

  useEffect(() => {
    const newRoundsArray: number[] = [];
    for (let i = 0; i < rounds; i++) {
      newRoundsArray.push(i);
    }
    setRoundsArray(newRoundsArray);
  }, [rounds]);

  useEffect(() => {}, [time]);
  return (
    <SettingsContext.Provider
      value={{
        maxPoints,
        setMaxPoints,
        isMaxPointsOn,
        setIsMaxPointsOn,
        rounds,
        setRounds,
        currentRound,
        setCurrentRound,
        time,
        setTime,
        isTimerOn,
        setITimerOn,
        isLoserOn,
        setIsLoserOn,
        isWhoStartOn,
        setIsWhoStartOn,
        isChangePlacesOn,
        setIsChangePlacesOn,
        savedInputs,
        setSavedInputs,
        gameStarted,
        setGameStarted,
        modeDouble,
        setModeDouble,
        muted,
        setMuted,
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
