import { Grid, GridItem } from '@chakra-ui/react';
import Layout from '../layout/Layout';
import QuizSelection from '../QuizSelection';
import QuizDetails from '../QuizDetails';
import quizzes, { Quiz } from '../../data/quizzes';
import { useState } from 'react';
import WelcomePage from "./WelcomePage.tsx";

const MainPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isLogged,setIsLogged] = useState<boolean>(false);
  const setQuiz = (quizId: string) => {
    const quiz = quizzes.find((quiz) => quiz.id === quizId);
    setSelectedQuiz(quiz ?? null);
  };
  const setLogged = (hasLogged : boolean)=>{
    setIsLogged(hasLogged);
  }

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
                <WelcomePage setLogged={setLogged} />
            )}
          </GridItem>
        </Grid>
    </Layout>
  );
};

export default MainPage;
