import { Badge, Flex, Icon } from '@chakra-ui/react';

// const CodeLanguages = ['Python', 'Javascript', 'Ruby', 'Elixir', 'C++', 'C#'];

import { FaPython } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { SiRuby } from 'react-icons/si';
import { SiCplusplus } from 'react-icons/si';
import { SiElixir } from 'react-icons/si';
import { SiCsharp } from 'react-icons/si';

const codeLanguageColorMapping = new Map([
  ['Python', 'blue'],
  ['Javascript', 'yellow'],
  ['Ruby', 'red'],
  ['Elixir', 'teal'],
  ['C++', 'gray'],
  ['C#', 'pink'],
]);

const codeLanguageIconMapping = new Map([
  ['Python', FaPython],
  ['Javascript', SiJavascript],
  ['Ruby', SiRuby],
  ['Elixir', SiElixir],
  ['C++', SiCplusplus],
  ['C#', SiCsharp],
]);

type CodeLanguageListProps = {
  languages: string[];
};

const CodeLanguageList = ({ languages }: CodeLanguageListProps) => {
  return (
    <Flex gap={6} wrap={'wrap'} w={'70%'}>
      {languages.map((codeLanguage) => (
        <Badge
          p={3}
          rounded={8}
          colorScheme={codeLanguageColorMapping.get(codeLanguage)}
        >
          <Flex justify={'center'} align={'center'} gap={2}>
            {codeLanguage}
            <Icon
              fontSize={18}
              as={codeLanguageIconMapping.get(codeLanguage)}
            />
          </Flex>
        </Badge>
      ))}
    </Flex>
  );
};

export default CodeLanguageList;
