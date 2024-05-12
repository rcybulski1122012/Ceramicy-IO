import { Radio, RadioGroup, VStack, Text, Box } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { useState } from 'react';

type QuizListProps = {
  quizzes: QuizDetails[];
  onQuizSelection: (quizId: string) => void;
};

export type QuizDetails = {
  id: string;
  label: string;
};

const QuizList = ({ quizzes, onQuizSelection }: QuizListProps) => {
  const theme = useTheme();
  const [seletedQuiz, setSeletedQuiz] = useState('random');

  const isSelected = (_value: string | number) => _value == seletedQuiz;

  const onSelectedQuizChange = (quizId: string) => {
    onQuizSelection(quizId);
    setSeletedQuiz(quizId);
  };

  return (
    <RadioGroup
      width={'100%'}
      onChange={onSelectedQuizChange}
      value={seletedQuiz}
    >
      <VStack alignItems={'start'} w={'100%'}>
        {quizzes.map((quiz) => (
          <Box
            w="100%"
            borderLeftRadius={12}
            _hover={{ background: 'green.10' }}
            sx={
              isSelected(quiz.id)
                ? {
                    background: 'green.50 !important',
                    borderRight: `4px solid ${theme.colors.primary}`,
                  }
                : {}
            }
          >
            <Radio
              spacing={8}
              key={quiz.id}
              w={'100%'}
              px={5}
              py={3}
              value={`${quiz.id}`}
              _hover={{ background: 'red' }}
            >
              <Text fontFamily={'heading'} fontSize={14} fontWeight={'bold'}>
                {quiz.label}
              </Text>
            </Radio>
          </Box>
        ))}
      </VStack>
    </RadioGroup>
  );
};

export default QuizList;
