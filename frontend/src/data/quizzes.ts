export type Quiz = {
  id: string;
  name: string;
  description?: string;
  files?: File[];
  languages: Language[];
  codeSmells: CodeSmell[];
};

export type File = {
  id: string;
  name: string;
  content: string;
  // TODO add smells
};

export type Smell = {
  start: number;
  end: number;
  type: string;
}

type Language = 'Python' | 'Javascript' | 'Ruby' | 'Elixir' | 'C++' | 'C#';
type CodeSmell =
  | 'Comment'
  | 'Incorrect typing'
  | 'Typo'
  | 'Logic Error'
  | 'Invocation Error';

const quizzes = [
  {
    id: '1',
    name: 'Quiz 1',
    languages: ['Python', 'Javascript'],
    codeSmells: ['Comment', 'Incorrect typing'],
  },
  {
    id: '2',
    name: 'Quiz 2',
    languages: ['Ruby', 'Elixir'],
    codeSmells: ['Typo', 'Logic Error'],
  },
  {
    id: '3',
    name: 'Quiz 3',
    languages: ['C++', 'C#'],
    codeSmells: ['Comment', 'Invocation Error'],
  },
  {
    id: '4',
    name: 'Quiz 4',
    languages: ['Python', 'Elixir', 'C++'],
    codeSmells: ['Incorrect typing', 'Logic Error'],
  },
  {
    id: '5',
    name: 'Quiz 5',
    languages: ['Javascript', 'Ruby', 'C#'],
    codeSmells: ['Typo', 'Invocation Error'],
  },
  {
    id: '6',
    name: 'Quiz 6',
    languages: ['Python', 'C++'],
    codeSmells: ['Comment', 'Logic Error'],
  },
  {
    id: '7',
    name: 'Quiz 7',
    languages: ['Javascript', 'Elixir', 'C#'],
    codeSmells: ['Incorrect typing', 'Invocation Error'],
  },
  {
    id: '8',
    name: 'Quiz 8',
    languages: ['Python', 'Ruby'],
    codeSmells: ['Typo', 'Logic Error'],
  },
  {
    id: '9',
    name: 'Quiz 9',
    languages: ['Javascript', 'Elixir'],
    codeSmells: ['Comment', 'Invocation Error'],
  },
  {
    id: '10',
    name: 'Quiz 10',
    languages: ['Ruby', 'C++', 'C#'],
    codeSmells: ['Incorrect typing', 'Logic Error'],
  },
];

export default quizzes as Quiz[];
