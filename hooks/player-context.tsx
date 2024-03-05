import React, { createContext, useEffect, useState } from "react";

type PlayerContextValue = {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;

  playerName: string;
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;
  points: number[][];
  setPoints: React.Dispatch<React.SetStateAction<number[][]>>;
};

export const PlayerContext = createContext<PlayerContextValue | null>(null);

export default function PlayerProvider({ children }: any) {
  const [points, setPoints] = useState<number[][]>([]);
  const [playerName, setPlayerName] = useState<string>("");

  const [players, setPlayers] = useState<string[]>([]);
  // "Seif Elesllam","Nedal","Mks","Islam",

  useEffect(() => {
    const initializePoints = () => {
      const roundsLength = 4;
      const initialPoints: number[][] = Array.from(
        { length: players.length },
        () => Array.from({ length: roundsLength }).fill(0) as number[]
      );
      setPoints(initialPoints);
    };

    initializePoints();
  }, [players]);

  return (
    <PlayerContext.Provider
      value={{
        players,
        setPlayers,
        points,
        setPoints,
        playerName,
        setPlayerName,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = React.useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
