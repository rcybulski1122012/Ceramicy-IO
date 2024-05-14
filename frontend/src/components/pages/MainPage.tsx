import { Grid, GridItem } from '@chakra-ui/react';
import Layout from '../layout/Layout';
import QuizSelection from '../QuizSelection';
import QuizDetails from '../QuizDetails';
import quizzes, { Quiz } from '../../data/quizzes';
import { useState } from 'react';

const MainPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const setQuiz = (quizId: string) => {
    const quiz = quizzes.find((quiz) => quiz.id === quizId);
    setSelectedQuiz(quiz ?? null);
  };

  return (
    <Layout>
      <Grid templateColumns="repeat(7, 1fr)" width={'100%'}>
        <GridItem colSpan={2} minWidth={'360px'}>
          <QuizSelection quizzes={quizzes} onQuizSelection={setQuiz} />
        </GridItem>
        <GridItem colSpan={5} w="100%">
          <QuizDetails selectedQuiz={selectedQuiz} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default MainPage;
