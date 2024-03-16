import React, { createContext, useEffect, useState } from "react";

type PlayerContextValue = {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;

  playerName: string;
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;

  playerRoundPoints: string[];
  setPlayerRoundPoints: React.Dispatch<React.SetStateAction<string[]>>;

  points: number[][];
  setPoints: React.Dispatch<React.SetStateAction<number[][]>>;
};

export const PlayerContext = createContext<PlayerContextValue | null>(null);

export default function PlayerProvider({ children }: any) {
  const [points, setPoints] = useState<number[][]>([]);
  const [playerName, setPlayerName] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [playerRoundPoints, setPlayerRoundPoints] = React.useState<string[]>(
    Array.from({ length: players.length }, () => "")
  );

  React.useEffect(() => {
    // Initialize playerRoundPoints once when players array is populated
    if (players.length > 0) {
      setPlayerRoundPoints(Array.from({ length: players.length }, () => ""));
    }
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
        playerRoundPoints,
        setPlayerRoundPoints,
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
