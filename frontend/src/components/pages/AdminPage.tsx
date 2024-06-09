import { Grid, GridItem } from '@chakra-ui/react';
import Layout from '../layout/Layout';
import QuizSelection from '../QuizSelection';

import quizzes, { Quiz } from '../../data/quizzes';
import { useState } from 'react';
import SessionList from '../SessionSelection';
import Ranking from '../Ranking';
import sessions, { Session } from '../../data/sessions';
import AddQuizzDialog from '../AddQuizzDialog';

const AdminPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  // TODO: retrieve quizes from backend
  const setQuiz = (quizId: string) => {
    const quiz = quizzes.find((quiz) => quiz.id === quizId);
    setSelectedQuiz(quiz ?? null);
  };
  // TODO: retrieve
  const setSession = (sessionId: string) => {
    const session = sessions.find((session) => session.id == sessionId);
    setSelectedSession(session ?? null);
  };

  return (
    <Layout>
      <AddQuizzDialog />
      <Grid templateColumns="repeat(9, 1fr)" width={'100%'}>
        <GridItem colSpan={3}>
          <QuizSelection quizzes={quizzes} onQuizSelection={setQuiz} />
        </GridItem>
        <GridItem colSpan={3} w="100%" h="100%">
          <SessionList
            sessions={sessions}
            selectedQuiz={selectedQuiz}
            onSessionSelection={setSession}
          ></SessionList>
        </GridItem>
        <GridItem colSpan={3} w="100%" h="100%">
          <Ranking session={selectedSession} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default AdminPage;
