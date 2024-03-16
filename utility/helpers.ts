export const isEmpty = (playerRoundPoints: string[]) => {
  return playerRoundPoints.every((e) => e === "");
};

export const hasErrors = (e: any, playerRoundPoints: string[]) => {
  if (isEmpty(playerRoundPoints)) return false;
  return isNaN(parseFloat(e));
};
