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
import { Link } from 'react-router-dom';

type QuizDetailsProps = {
  selectedQuiz: Quiz | null;
};

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
          <Link to="quiz/1">
            <Button w="200px" bg="primary" p={7}>
              Start Quiz
            </Button>
          </Link>
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
