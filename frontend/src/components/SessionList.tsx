import { Box, Flex, Text, chakra } from '@chakra-ui/react';
import QuizList, { QuizDetails } from './QuizList';
import { useTheme } from '@emotion/react';
import { Quiz } from '../data/quizzes';

type QuizSelectionProps = {
  quizzes: Quiz[];
  onQuizSelection: (quizId: string) => void;
};

type QuizSession = {

}

const SessionList = ({ quizzes, onQuizSelection }: QuizSelectionProps) => {
  const theme = useTheme();

  const quizzSessionsList = quizzes.map((quiz) => ({
    id: quiz.id,
    label: quiz.name,
  })) as QuizSession[];

  return (
    <Flex
      direction={'column'}
      align={'start'}
      py={6}
      pr={8}
      gap={4}
      borderRight={`3px solid ${theme.colors.gray[50]}`}
    >
      <Text fontFamily={'heading'} textStyle={'h2'}>
        Available Quizzes
      </Text>
      <Text fontFamily={'body'}>
        Select quiz to test your practical knowledge. Each quiz consists of one
        or more files where your task is to find Code
        <chakra.span color={'secondary'} fontWeight={'bold'}>
          Smells
        </chakra.span>
        . Select quiz to see more details!
      </Text>
      <Box px={2} w={'100%'} mt={8}>
        <QuizList
          quizzes={quizzDetailsList}
          onQuizSelection={onQuizSelection}
        />
      </Box>
    </Flex>
  );
};

export default SessionList;