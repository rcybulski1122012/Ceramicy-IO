import { Grid, GridItem } from '@chakra-ui/react';
import Layout from '../layout/Layout';
import QuizSelection from '../QuizSelection';
import AddQuizzDialog from '../AddQuizzDialog';
import QuizDetails from '../QuizDetails';
import { Quiz } from '../../data/quizzes';
import { useEffect, useState } from 'react';
import SessionList from '../SessionSelection';
import Ranking from '../Ranking';
import sessions, { Session } from '../../data/sessions';
import config from '../../config';

const AdminPage = () => {
  const [quizzes, setQuizes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [quizSessions, setSelectedQuizSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetch(config.backendUrl + '/api/v1/quiz/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => setQuizes(json))
      .catch((error) => console.error(error));
  }, []);

  const setQuiz = (quizId: string) => {
    const quiz = quizzes.find((quiz) => quiz.id === quizId);

    setSelectedQuizSessions([]);
    setSelectedQuiz(quiz ?? null);
    fetch(config.backendUrl + '/api/v1/quiz/' + quizId + '/sessions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => setSelectedQuizSessions(json))
      .catch((error) => console.error(error));
  };
  // TODO: retrieve the ranking
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
            sessions={quizSessions}
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
