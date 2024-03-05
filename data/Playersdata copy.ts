export type Round = {
  RoundNumber: number;
  RoundTotal: number;
};

export interface Category {
  PlayerName: string;
  Total: number;
  Rounds: Round[];
}

export type Data = Category[];

const points: Data = [
  {
    PlayerName: "Seif Elesllam",
    Total: 10,
    Rounds: [{ RoundNumber: 2, RoundTotal: 20 }],
  },
  {
    PlayerName: "Elesllam",
    Total: 12,
    Rounds: [{ RoundNumber: 1, RoundTotal: 20 }],
  },
  {
    PlayerName: "Mks",
    Total: 32,
    Rounds: [{ RoundNumber: 1, RoundTotal: 20 }],
  },
  {
    PlayerName: "Nada",
    Total: 28,
    Rounds: [{ RoundNumber: 1, RoundTotal: 28 }],
  },
];

export default points;
