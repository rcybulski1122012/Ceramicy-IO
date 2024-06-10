import { Grid, GridItem } from '@chakra-ui/react';
import Layout from '../layout/Layout';
import QuizSelection from '../QuizSelection';
import quizzes, {Quiz, Smell} from '../../data/quizzes';
import { useState } from 'react';
import SessionList from '../SessionSelection';
import Ranking from '../Ranking'
import sessions, { Session } from '../../data/sessions';
import AnswerDisplay from "../AnswerDisplay.tsx";

const AdminPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [selectedSolution, setSelectedSolution] = useState<Smell[][]|null>(null);
// TODO: retrieve quizes from backend
  const setQuiz = (quizId: string) => {
    const quiz = quizzes.find((quiz) => quiz.id === quizId);
    setSelectedQuiz(quiz ?? null);
  };
// TODO: retrieve
  const setSession = (sessionId: string) => {
    const session = sessions.find( session => session.id == sessionId)
    setSelectedSession(session ?? null);
  }

  return (
    <Layout>
      {selectedSolution ? (
        <AnswerDisplay
          initialSolution={selectedSolution}
          onBack={() => setSelectedSolution(null)}
        />
      ) : (
        <Grid templateColumns="repeat(9, 1fr)" width="100%">
          <GridItem colSpan={3}>
            <QuizSelection quizzes={quizzes} onQuizSelection={setQuiz} />
          </GridItem>
          <GridItem colSpan={3} w="100%" h="100%">
            <SessionList
              sessions={sessions}
              selectedQuiz={selectedQuiz}
              onSessionSelection={setSession}
            />
          </GridItem>
          <GridItem colSpan={3} w="100%" h="100%">
            <Ranking session={selectedSession} onSolutionSelect={setSelectedSolution} />
          </GridItem>
        </Grid>
      )}
    </Layout>
  );
};

export default AdminPage;