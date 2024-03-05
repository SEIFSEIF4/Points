import React from "react";

// expo
import { useKeepAwake } from "expo-keep-awake";

//  components
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
