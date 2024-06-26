const codeLanguageColorMapping = new Map([
  ['Python', 'blue'],
  ['Javascript', 'yellow'],
  ['Ruby', 'red'],
  ['Elixir', 'teal'],
  ['C++', 'gray'],
  ['C#', 'pink'],
]);

import { Badge, Flex, Icon } from '@chakra-ui/react';

import { FaPython } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { SiRuby } from 'react-icons/si';
import { SiCplusplus } from 'react-icons/si';
import { SiElixir } from 'react-icons/si';
import { SiCsharp } from 'react-icons/si';

const codeLanguageIconMapping = new Map([
  ['Python', FaPython],
  ['Javascript', SiJavascript],
  ['Ruby', SiRuby],
  ['Elixir', SiElixir],
  ['C++', SiCplusplus],
  ['C#', SiCsharp],
]);

type CodeLanguageBadgeProps = {
  codeLanguage: string;
};

const CodeLanguageBadge = ({ codeLanguage }: CodeLanguageBadgeProps) => {
  return (
    <Badge
      key={codeLanguage}
      p={3}
      rounded={8}
      colorScheme={codeLanguageColorMapping.get(codeLanguage)}
    >
      <Flex justify={'center'} align={'center'} gap={2}>
        {codeLanguage}
        <Icon fontSize={18} as={codeLanguageIconMapping.get(codeLanguage)} />
      </Flex>
    </Badge>
  );
};

export default CodeLanguageBadge;
