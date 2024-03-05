type PlayerContextValue = {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  points: number[][];
  setPoints: React.Dispatch<React.SetStateAction<number[][]>>;
};

export const determineLoser = (
  players: string[],
  points: number[][]
): string => {
  // Implement the logic to determine the loser based on total points
  // This function could be similar to the one provided earlier
  return "ExampleLoser"; // Replace with your logic
};

export const enterPoints = (
  playerIndex: number,
  round: number,
  points: number[][],
  setPoints: React.Dispatch<React.SetStateAction<number[][]>>,
  pointsForRound: string
): void => {
  // Implement the logic to update points for a player in a round
  // This function could be similar to the one provided earlier
  const updatedPoints = [...points];
  updatedPoints[playerIndex][round - 1] = parseInt(pointsForRound);
  setPoints(updatedPoints);
};

export const addPlayer = (
  playerName: string,
  players: string[],
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>,
  points: number[][],
  setPoints: React.Dispatch<React.SetStateAction<number[][]>>
): void => {
  // Implement the logic to add a player and initialize points for that player
  // This function could be similar to the one provided earlier
  setPlayers([...players, playerName]);
  setPoints([...points, Array(5).fill(0)]);
};

const handleAddRound = () => {
  setRounds((prevRounds) => prevRounds + 1);
};

const handlePointsChange2 = (
  playerIndex: number,
  roundIndex: number,
  value: string
) => {
  setPlayers((prevPlayers) => {
    const updatedPlayers: any[] = [...prevPlayers];
    updatedPlayers[playerIndex].points[roundIndex] = parseInt(value) || 0;
    return updatedPlayers;
  });
};

const renderRoundInputs = (player: any, playerIndex: number) => (
  <View
    key={playerIndex}
    style={styles.PlayerContainer}
    className="w-1/2 p-2 mx-auto mt-2 bg-black rounded-lg"
  >
    <Text>{players[playerIndex]}</Text>
    {/*{Array.from({ length: rounds }, (_, roundIndex) => (
      <TextInput
        key={roundIndex}
        style={styles.input}
        placeholder={`Round ${player.points}`}
        // value={player.points[roundIndex]?.toString()}
        onChangeText={(text) =>
          handlePointsChange(playerIndex, roundIndex, text)
        }
      />
    ))} */}
  </View>
);
