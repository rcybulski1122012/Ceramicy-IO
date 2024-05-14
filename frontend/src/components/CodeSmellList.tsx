import { Badge, Flex } from '@chakra-ui/react';

const CodeSmellColorMapping = new Map([
  ['Comment', 'pink'],
  ['Incorrect typing', 'orange'],
  ['Typo', 'blue'],
  ['Logic Error', 'red'],
  ['Invocation Error', 'green'],
]);

type CodeSmellListProps = {
  codeSmells: string[];
};

const CodeSmellList = ({ codeSmells }: CodeSmellListProps) => {
  return (
    <Flex gap={6} wrap={'wrap'} w={'70%'}>
      {codeSmells.map((codeSmell) => (
        <Badge
          key={codeSmell}
          p={3}
          rounded={8}
          colorScheme={CodeSmellColorMapping.get(codeSmell)}
        >
          {codeSmell}
        </Badge>
      ))}
    </Flex>
  );
};

export default CodeSmellList;
