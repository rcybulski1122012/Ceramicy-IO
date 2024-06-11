import {
  Button,
  Icon,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  chakra,
} from '@chakra-ui/react';
import CodeLanguageBadge from './CodeLanguageBadge';
import { Tooltip } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';
import { FormEvent } from 'react';
import { parseJsonFile } from '../shared/loadJson';
import { QuizCreatePayload } from '../api/quizzSubmit';

const codeLanguages = ['Python', 'Javascript', 'Ruby', 'Elixir', 'C++', 'C#'];

type QuizzAddFormProps = {
  onFormSubmit: (file: File, quizData: QuizCreatePayload) => void;
};

const QuizzAddForm = ({ onFormSubmit }: QuizzAddFormProps) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const values = {
      name: data.get('quizName') as string,
      mainLanguage: data.get('mainLanguage') as string,
      zipFile: data.get('zipFile') as File,
      jsonFile: data.get('jsonFile') as File,
    };

    const codeSmells = await parseJsonFile(values.jsonFile);
    onFormSubmit(values.zipFile, {
      name: values.name,
      mainLanguage: values.mainLanguage,
      fileUrls: [],
      codeSmells,
    } as QuizCreatePayload);
  };
  return (
    <chakra.form onSubmit={handleSubmit}>
      <Flex direction="column" gap="30px">
        <FormControl>
          <FormLabel>Quizz Name</FormLabel>
          <Input type="text" name="quizName"></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Main Language</FormLabel>
          <RadioGroup name="mainLanguage">
            <Stack direction="row" gap={'20px'} wrap={'wrap'}>
              {codeLanguages.map((codeLanguage) => (
                <Radio value={codeLanguage}>
                  <CodeLanguageBadge codeLanguage={codeLanguage} />
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="zip-file">
            <Flex alignItems={'center'} gap="8px">
              <Text>Project code</Text>
              <Tooltip
                hasArrow
                placement="right"
                arrowSize={10}
                label={'We accept either zip files'}
              >
                <span>
                  <Icon as={FaInfoCircle} fill={'secondary'}></Icon>
                </span>
              </Tooltip>
            </Flex>
          </FormLabel>
          <Input
            colorScheme="secondary"
            type="file"
            id="zip-file"
            name="zipFile"
            accept=".zip"
            variant={'flushed'}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="json-file">
            <Flex alignItems={'center'} gap="8px">
              <Text>Code Smell Specification</Text>
              <Tooltip
                hasArrow
                placement="right"
                arrowSize={10}
                label={
                  'We accept JSON file that matches codeSmell definition criteria'
                }
              >
                <span>
                  <Icon as={FaInfoCircle} fill={'secondary'}></Icon>
                </span>
              </Tooltip>
            </Flex>
          </FormLabel>
          <Input
            colorScheme="secondary"
            type="file"
            id="json-file"
            name="jsonFile"
            accept=".json"
            variant={'flushed'}
          ></Input>
        </FormControl>
        <Button
          type="submit"
          alignSelf={'flex-end'}
          p="26px"
          width={'30%'}
          bg="secondary"
          _hover={{ bg: 'primary' }}
        >
          Add Quizz
        </Button>
      </Flex>
    </chakra.form>
  );
};

export default QuizzAddForm;
