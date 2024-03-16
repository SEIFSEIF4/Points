import { useEffect } from "react";

// expo
import AsyncStorage from "@react-native-async-storage/async-storage";

// hooks
import { usePlayer } from "@/hooks/player-context";
import { useSettings } from "@/hooks/Settings-context";

export const usePlayerData = () => {
  const { players, setPlayers } = usePlayer();

  useEffect(() => {
    const loadPlayerData = async () => {
      try {
        const savedPlayers = await AsyncStorage.getItem("players");
        if (savedPlayers) {
          setPlayers(JSON.parse(savedPlayers));
        }
      } catch (error) {
        console.error("Error loading player data:", error);
      }
    };

    loadPlayerData();
  }, []);

  useEffect(() => {
    const savePlayerData = async () => {
      try {
        await AsyncStorage.setItem("players", JSON.stringify(players));
      } catch (error) {
        console.error("Error saving player data:", error);
      }
    };

    savePlayerData();
  }, [players]);
};

export const addPlayer = (
  players: string[],
  playerName: string,
  setPlayerName: React.Dispatch<React.SetStateAction<string>>,
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>,
  playerRoundPoints: string[],
  setPlayerRoundPoints: React.Dispatch<React.SetStateAction<string[]>>,
  currentRound: number
): void => {
  // if (playerName.trim() !== "") {
  //   setPlayers((prevPlayers) => [...prevPlayers, playerName]);
  //   setPlayerRoundPoints((prevRoundPoints) => [...prevRoundPoints, ""]);

  //   setPlayerName("");
  // }

  if (playerName.trim() !== "") {
    // Add the new player to the players array
    const updatedPlayers = [...players, playerName];

    // If the player is added after round 2, reset all previous rounds for the new player to 20
    let updatedPlayerRoundPoints = [...playerRoundPoints];
    if (currentRound > 1) {
      updatedPlayerRoundPoints = updatedPlayerRoundPoints.map(() => "20");
    }

    // Add the new player to the playerRoundPoints array with default points for each round
    updatedPlayerRoundPoints.push(
      ...Array.from({ length: playerRoundPoints.length }, () => "20")
    );

    // Update the state with the new players and their points
    setPlayers(updatedPlayers);
    setPlayerRoundPoints(updatedPlayerRoundPoints);

    // Clear the input for the player name
    setPlayerName("");
  }
};

export const deletePlayer = (
  index: number,
  players: string[],
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>,
  playerRoundPoints: string[],
  setPlayerRoundPoints: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const updatedPlayers = [...players];
  const updatedPlayerRoundPoints = [...playerRoundPoints];

  updatedPlayers.splice(index, 1);
  updatedPlayerRoundPoints.splice(index, 1);

  setPlayers(updatedPlayers);
  setPlayerRoundPoints(updatedPlayerRoundPoints);
};
