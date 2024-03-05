type Round = {
  number: number;
  result: number;
};

type Player = {
  playerName: string;
  total: number;
  rounds: Round[];
};

type Props = {};

const gameData: Player[] = [
  {
    playerName: "katana",
    total: 50,
    rounds: [
      { number: 1, result: 10 },
      { number: 2, result: 15 },
      { number: 3, result: 10 },
    ],
  },
  {
    playerName: "Mks",
    total: 45,
    rounds: [
      { number: 1, result: 12 },
      { number: 2, result: 18 },
      { number: 3, result: 15 },
    ],
  },
];

export type { Props };
export type { Round };
export type { Player };

export default gameData;
