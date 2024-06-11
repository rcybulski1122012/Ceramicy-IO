import { Box, Flex, RadioGroup, VStack, Text, Radio } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { Quiz, File } from '../../../data/quizzes';
import { useState } from 'react';

type FileSelectionProps = {
  quiz: any;
  files: File[];
  onFileSelect: (fileId: string) => void;
};

const FileSelection = ({ quiz, files, onFileSelect }: FileSelectionProps) => {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState<string>('0');

  const isSelected = (_value: string | number) => _value == selectedFile;

  const handleFileClick = (fileId: string) => {
    setSelectedFile(fileId);
    // onFileSelect(fileContent);
  };
  
  return (
    <Flex
      direction={'column'}
      align={'start'}
      w={'100%'}
      py={6}
      pr={8}
      gap={4}
      borderRight={`3px solid ${theme.colors.gray[50]}`}
    >
      <Text fontFamily={'heading'} textStyle={'h2'}>
        {quiz.name}
      </Text>
      {/* <Text fontFamily={'body'}>
        {quiz.description || 'No description available'}
      </Text> */}
      <Box px={2} w={'100%'} mt={8}>
        <RadioGroup
          w={'100%'}
          onChange={handleFileClick}
          value={selectedFile}
        >
          <VStack alignItems={'start'} w={'100%'}>
            {files.map((file) => (
              <Box
                key={quiz.id}
                w="100%"
                borderLeftRadius={12}
                _hover={{ background: 'green.10', color: 'black' }}
                sx={
                  isSelected(file.id)
                    ? {
                        background: 'green.50 !important',
                        color: 'black',
                        fontWeight: '900 !important',
                        borderRight: `4px solid ${theme.colors.primary}`,
                      }
                    : {}
                }
              >
                <Radio
                  spacing={8}
                  key={file.id}
                  w={'100%'}
                  px={5}
                  py={3}
                  value={`${file.id}`}
                  _hover={{ background: 'red' }}
                >
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                  >
                    <Text fontFamily="heading" fontSize={14} fontWeight="bold" pr={'50%'}>
                      {file.name}
                    </Text>
                    <Text fontFamily="heading" fontSize={18} fontWeight="bold">
                      {'7' + '/' + '10'}
                    </Text>
                  </Flex>
                </Radio>
              </Box>
            ))}
          </VStack>
        </RadioGroup>
      </Box>
    </Flex>
  );
};

export default FileSelection;
