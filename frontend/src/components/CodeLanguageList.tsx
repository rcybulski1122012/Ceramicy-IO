import { Flex } from '@chakra-ui/react';
import CodeLanguageBadge from './CodeLanguageBadge';

type CodeLanguageListProps = {
  languages: string[];
};

const CodeLanguageList = ({ languages }: CodeLanguageListProps) => {
  return (
    <Flex gap={6} wrap={'wrap'} w={'70%'}>
      {languages.map((codeLanguage) => (
        <CodeLanguageBadge codeLanguage={codeLanguage} />
      ))}
    </Flex>
  );
};

export default CodeLanguageList;
