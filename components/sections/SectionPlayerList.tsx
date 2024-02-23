import React from "react";
import { View } from "@/components/Themed";

// expo
import { useKeepAwake } from "expo-keep-awake";

// logic components
import PlayerList from "@/components/logic/PlayerList";
import {
  usePlayerData,
  deletePlayer,
} from "@/components/logic/playerFunctions";

//hooks
import { usePlayer } from "@/hooks/player-context";

const SectionPlayerList = () => {
  // useKeepAwake();

  const { players, setPlayers } = usePlayer();

  usePlayerData();

  return (
    <PlayerList
      players={players}
      deletePlayer={(index) => deletePlayer(index, players, setPlayers)}
    />
  );
};

export default SectionPlayerList;
