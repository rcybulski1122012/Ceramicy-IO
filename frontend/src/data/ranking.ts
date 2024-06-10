import {Smell} from "./quizzes.ts";


export type RankingEntry = {
  user_name: string;
  solution: Smell[][];
  score: number;
};

export const dummyRanking: RankingEntry[] = [
  {
    user_name: 'Alice',
    solution: [
      [
        { start: 4, end: 6, type: 'Incorrect typing' },
      ],
      [
        { start: 24, end: 25, type: 'Invocation Error' },
      ],
      [
        { start: 6, end: 29, type: 'Typo' },
      ]
    ],
    score: 85,
  },
  {
    user_name: 'Bob',
    solution: [
      [
          { start: 1, end: 5, type: 'Incorrect typing' },
      ],
      [
        { start: 2, end: 2, type: 'Typo' }
      ],
    ],
    score: 90,
  },
];