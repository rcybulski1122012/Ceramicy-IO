import { SmellType } from '../../../data/quizzes';

export const fileUrl: string =
  'https://ceramicyio.blob.core.windows.net/ceramicyio/fd5cba52-9e67-49ab-9f0d-57c4a002eae8/quiz.py';

export const quizId: string = 'dbeafc38-19ce-4438-be88-1d47e124ada0';

export const smellTypes: SmellType[] = [
  {
    type: 'Unnecessary Comment',
    color: '#FFD700',
  },
  {
    type: 'Incorrect Typing',
    color: '#FF4500',
  },
  {
    type: 'Typo',
    color: '#FF69B4',
  },
  {
    type: 'Logic Error',
    color: '#00BFFF',
  },
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
    
# def multiply_numbers(a, b: str) -> int:  # Incorrect typing: b should be int
#    return a * int(b)
#
# def divide_numbers(a: int, b: int) -> float:
#    return a / b  # Note: This could raise a ZeroDivisionError if b is 0

def multiply_numbers(a, b: str) -> int:  # Incorrect typing: b should be int
    return a * int(b)

def divide_numbers(a: int, b: int) -> float:
    return a / b  # Note: This could raise a ZeroDivisionError if b is 0

`;
