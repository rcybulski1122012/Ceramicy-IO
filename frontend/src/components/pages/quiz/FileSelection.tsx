import { Box, Flex, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { Quiz } from '../../../data/quizzes';

type FileSelectionProps = {
    quiz: Quiz;
    files: File[];
};

const FileSelection = ({ quiz, files }: FileSelectionProps) => {
  const theme = useTheme();

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
        {quiz.name}
      </Text>
      <Text fontFamily={'body'}>
        {quiz.description || 'No description available'}
      </Text>
      <Box px={2} w={'100%'} mt={8}>
        {/* TODO add FileList */}
      </Box>
    </Flex>
  );
};

export default FileSelection;
