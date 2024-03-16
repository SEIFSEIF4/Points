export const handlePointsChange = (
  playerIndex: number,
  value: string,
  playerRoundPoints: string[]
): string[] => {
  //

  // Update the state
  const updatedPoints: string[] = [...playerRoundPoints];
  updatedPoints[playerIndex] = value.toString();
  return updatedPoints;
};

export const calculateTotalPointsForPlayer = (
  playerIndex: number,
  rounds: number,
  savedInputs: Record<number, string[]>
): number => {
  let totalPoints = 0;

  for (let round = 1; round <= rounds; round++) {
    const roundPoints = savedInputs[round]?.[playerIndex];
    totalPoints += parseInt(roundPoints) || 0;
  }

  return totalPoints;
};

// export const calculateTotalPointsForAllPlayers = (
//   rounds: number,
//   savedInputs: Record<number, string[]>,
//   players: string[]
// ): Record<number, number> => {
//   const totalPoints: Record<number, number> = {};

//   for (let round = 1; round <= rounds; round++) {
//     for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
//       const roundPoints = savedInputs[round]?.[playerIndex];
//       totalPoints[round] = totalPoints[round] + (parseInt(roundPoints) || 0);
//     }
//   }

//   return totalPoints;
// };

// export const calculateAveragePointsForPlayer = (
//   playerIndex: number,
//   rounds: number,
//   savedInputs: Record<number, string[]>
// ): number => {
//   const totalPoints = calculateTotalPointsForPlayer(
//     playerIndex,
//     rounds,
//     savedInputs
//   );
//   return totalPoints / rounds;
// };

// export const calculateAveragePointsForAllPlayers = (
//   rounds: number,
//   savedInputs: Record<number, string[]>,
//   players: string[]
// ): Record<string, number> => {
//   const totalRounds = Object.keys(savedInputs).length;

//   const averagePoints: Record<string, number> = {};

//   // Calculate the average points for each player
//   players.forEach((player) => {
//     let sum = 0;
//     for (let round = 1; round <= totalRounds; round++) {
//       const points = parseFloat(savedInputs[round]?.[players.indexOf(player)]);
//       if (!isNaN(points)) {
//         sum += points;
//       }
//     }
//     averagePoints["Avg : "] = sum / totalRounds;
//   });

//   return averagePoints;
// };

// export const calculateTotalPointsForRound = (
//   round: number,
//   savedInputs: Record<number, string[]>
// ): number => {
//   let totalPoints = 0;

//   for (let playerIndex = 0; playerIndex < 4; playerIndex++) {
//     const roundPoints = savedInputs[round]?.[playerIndex];
//     totalPoints += parseInt(roundPoints) || 0;
//   }

//   return totalPoints;
// };

// export const calculateAveragePointsForRound = (
//   round: number,
//   savedInputs: Record<number, string[]>
// ): number => {
//   const totalPoints = calculateTotalPointsForRound(round, savedInputs);
//   return totalPoints / round;
// };

// export const calculateTotalPointsForAllRounds = (
//   rounds: number,
//   savedInputs: Record<number, string[]>
// ): number => {
//   let totalPoints = 0;

//   for (let round = 1; round <= rounds; round++) {
//     totalPoints += calculateTotalPointsForRound(round, savedInputs);
//   }

//   return totalPoints;
// };

// export const calculateAveragePointsForAllRounds = (
//   rounds: number,
//   players: string[],
//   savedInputs: Record<number, string[]>
// ): number => {
//   const totalPoints = calculateTotalPointsForAllRounds(rounds, savedInputs);
//   return totalPoints / (players.length * rounds);
// };

export const determineLoser = (
  savedInputs: Record<number, string[]>,
  rounds: number,
  players: string[]
): string[] | null => {
  // Check if there are enough saved inputs to determine a Loser
  if (Object.keys(savedInputs).length < 1)
    return ["play at least one round to determine a loser"];

  const totalPoints = players.map((_, index) =>
    calculateTotalPointsForPlayer(index, rounds, savedInputs)
  );
  const maxPoints = Math.max(...totalPoints);

  // Find all players with the maximum points
  const loserIndices = totalPoints.reduce(
    (loser: number[], points: number, index: number) =>
      points === maxPoints ? [...loser, index] : loser,
    []
  );

  // Return an array of losers or null if no losers
  return loserIndices.length > 0
    ? loserIndices.map((index) => players[index])
    : null;
};

export const determineWinner = (
  savedInputs: Record<number, string[]>,
  rounds: number,
  players: string[]
): string[] | null => {
  // Check if there are enough saved inputs to determine a Winner
  if (Object.keys(savedInputs).length < 1)
    return ["play at least one round to determine a winner"];

  const totalPoints = players.map((_, index) =>
    calculateTotalPointsForPlayer(index, rounds, savedInputs)
  );
  const minPoints = Math.min(...totalPoints);

  // Find all players with the minimum points
  const winnerIndices = totalPoints.reduce(
    (winner: number[], points: number, index: number) =>
      points === minPoints ? [...winner, index] : winner,
    []
  );

  // Return an array of winners or null if no winners
  return winnerIndices.length > 0
    ? winnerIndices.map((index) => players[index])
    : null;
};

export const handleBackRound = (
  currentRound: number,
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>
): void => {
  if (currentRound === 1) return;
  setCurrentRound((prevRound) => prevRound - 1);
};

export const handleNextRound = (
  currentRound: number,
  rounds: number,
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>
): void => {
  if (currentRound === rounds) return;
  setCurrentRound((prevRound) => prevRound + 1);
};
