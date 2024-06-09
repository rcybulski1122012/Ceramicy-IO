import { Box, Flex, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { Quiz } from '../data/quizzes';

import { Session } from '../data/sessions';
import SessionList from './SessionList';

type SessionSelectionProps = {
  sessions: Session[];
  selectedQuiz: Quiz | null;
  onSessionSelection: (sessionId: string) => void;
};

type QuizSession = {
  id: string;
};

const SessionSelection = ({
  sessions,
  selectedQuiz,
  onSessionSelection,
}: SessionSelectionProps) => {
  // const [sessions, setSessions] = useState<Session[]>([])

  // useEffect(() => {
  //   fetch(config.backendUrl + '/api/v1/quiz/' + selectedQuiz?.id, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => setSessions(json))
  //     .catch((error) => console.error(error));
  // }, []);
  const theme = useTheme();
  const quizSessionsList = sessions.map((session) => ({
    id: session.id,
    // label: session.name,
  })) as QuizSession[];

  return (
    <Flex
      direction={'column'}
      align={'start'}
      py={6}
      px={8}
      gap={4}
      height={'100%'}
      borderRight={`3px solid ${theme.colors.gray[50]}`}
    >
      <Text fontFamily={'heading'} textStyle={'h2'}>
        Quiz {selectedQuiz?.id} Sessions
      </Text>
      <Text fontFamily={'body'}>
        Select available session to see the ranking or add a new session
      </Text>
      <Box px={2} w={'100%'} mt={8}>
        <SessionList
          sessions={quizSessionsList}
          onSessionSelection={onSessionSelection}
        />
      </Box>
    </Flex>
  );
};

export default SessionSelection;
