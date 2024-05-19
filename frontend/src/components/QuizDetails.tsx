import {
  Text,
  Center,
  Flex,
  VStack,
  Button,
  Divider,
  Box,
} from '@chakra-ui/react';
import CodeSmellList from './CodeSmellList';
import CodeLanguageList from './CodeLanguageList';
import { Quiz } from '../data/quizzes';

type QuizDetailsProps = {
  selectedQuiz: Quiz | null;
};

function Management({ isScored, score, maxScore }) {
  if (isScored) {
    return (
      <Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-end'}
          marginBottom={'1.5rem'}
        >
          <Text fontSize={'x-large'} fontWeight={'bold'}>
            Your Score:{' '}
          </Text>
          <Text
            fontSize={'xxx-large'}
            color={score < maxScore / 2 ? 'red.50' : 'green.300'}
            fontWeight={'bold'}
          >
            {score} / {maxScore}{' '}
          </Text>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          <Button w="200px" bg="primary" p={7}>
            Try again
          </Button>
          <Button w="200px" bg="primary" p={7}>
            View Results
          </Button>
        </Box>
      </Box>
    );
  } else {
    return (
      <Button w="200px" bg="primary" p={7}>
        Start Quiz
      </Button>
    );
  }
}

const QuizDetails = ({ selectedQuiz }: QuizDetailsProps) => {
  return (
    <Center w="100%" h="100%">
      {selectedQuiz && (
        <Flex
          gap={8}
          px={6}
          py={8}
          direction={'column'}
          justify={'space-between'}
          minW="450px"
          maxW="900px"
          w="70%"
          h="750px"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)"
        >
          <Box>
            <Text fontSize={27} fontFamily="heading" fontWeight="bold">
              Quiz Name
            </Text>
            <Text fontSize={24} fontFamily="body" fontWeight="bold">
              {selectedQuiz.name}
            </Text>
          </Box>
          <Divider colorScheme="blue" size="100" h="5px" />
          <VStack align={'start'}>
            <Text fontSize={22} fontFamily="heading" fontWeight="bold">
              Code Smell types
            </Text>
            <CodeSmellList codeSmells={selectedQuiz.codeSmells} />
          </VStack>
          <VStack align={'start'}>
            <Text fontSize={22} fontFamily="heading" fontWeight="bold">
              Languages
            </Text>
            <CodeLanguageList languages={selectedQuiz.languages} />
          </VStack>
          <Divider colorScheme="blue" size="100" h="5px" />
          <Management isScored={true} score={5} maxScore={selectedQuiz.codeSmells.length}></Management>
        </Flex>
      )}
      {!selectedQuiz && (
        <Text textStyle={'h2'} color="primary">
          Select Quiz to see details here
        </Text>
      )}
    </Center>
  );
};

export default QuizDetails;
