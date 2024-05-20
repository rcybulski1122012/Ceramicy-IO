import { SmellType } from '../../../data/quizzes';

export const fileUrl: string =
  'https://ceramicyio.blob.core.windows.net/ceramicyio/bb9b2561-4cb6-41b0-8d70-0c906fc3afce/quiz.py';

export const quizId: string = '4b9bb894-1a68-4557-bcd3-c574edc442b7';

export const smellTypes: SmellType[] = [
  {
    type: 'Unnecesary Comment',
    color: '#FFD700',
  },
  {
    type: 'Incorrect typing',
    color: '#FF4500',
  },
  {
    type: 'Typo',
    color: '#FF69B4',
  },
  //   {
  //     type: 'Logic Error',
  //     color: '#00BFFF',
  //   },
  //   {
  //     type: 'Invocation Error',
  //     color: '#FF6347',
  //   },
];
export const filename: string = 'quiz.py';
export const language: string = 'python';
export const code: string = `
def add_numbers(a: int, b: int) -> int:
# This function adds two numbers
return a + b

def subtrct_numbers(a: int, b: int) -> int:
# Subtract b from a and returns the result
return a - b

def multiply_numbers(a, b: str) -> int:  # Incorrect typing: b should be int
return a * int(b)

def divide_numbers(a: int, b: int) -> float:
return a / b  # Note: This could raise a ZeroDivisionError if b is 0
`;
