import axios from '../axios';
import { Quiz } from '../data/quizzes';

export const getQuizzes = async (): Promise<Quiz[]> => {
  const response = await axios.get('/quiz');
  return response.data.map((quiz: any) => ({
    id: quiz.id,
    name: quiz.name,
    description: 'Checkout your code reviewing skills!',
    languages: [quiz.mainLanguage],
    codeSmells: quiz.codeSmells.smellTypes,
  })) as Quiz[];
};
