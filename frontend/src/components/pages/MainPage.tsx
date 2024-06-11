import { Grid, GridItem } from '@chakra-ui/react';
import Layout from '../layout/Layout';
import QuizSelection from '../QuizSelection';
import QuizDetails from '../QuizDetails';
import { Quiz } from '../../data/quizzes';
import { useState } from 'react';
import WelcomePage from './WelcomePage.tsx';
import { useUser } from '../../contexts/UserContext.tsx';
import { useQuery } from '@tanstack/react-query';
import { getQuizzes } from '../../api/quizzes.ts';

const MainPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const { userName } = useUser();
  const isLogged = Boolean(userName);

  const quizResult = useQuery({ queryKey: ['quizzes'], queryFn: getQuizzes });

  console.log('Quizzes: ' + quizResult.data);
  console.log('Error ' + quizResult.error);
  const quizzes = quizResult.data || [];

  console.log('quizzes');
  console.log(quizzes);

  const setQuiz = (quizId: string) => {
    const quiz = quizzes.find((quiz) => quiz.id === quizId);
    setSelectedQuiz(quiz ?? null);
  };

  return (
    <Layout>
      <Grid templateColumns="repeat(7, 1fr)" width="100%">
        <GridItem colSpan={2} minWidth="360px">
          <QuizSelection quizzes={quizzes} onQuizSelection={setQuiz} />
        </GridItem>
        <GridItem colSpan={5} w="100%">
          {isLogged ? (
            <QuizDetails selectedQuiz={selectedQuiz} />
          ) : (
            <WelcomePage />
          )}
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default MainPage;
