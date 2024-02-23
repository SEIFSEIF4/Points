import React, { createContext, useState } from "react";

type PlayerContextValue = {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
};

export const PlayerContext = createContext<PlayerContextValue | null>(null);

export default function PlayerProvider({ children }: any) {
  const [players, setPlayers] = useState<string[]>([
    "Player 1",
    "Player 3",
    "Player 2",
    "player 4",
  ]);

  return (
    <PlayerContext.Provider value={{ players, setPlayers }}>
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
