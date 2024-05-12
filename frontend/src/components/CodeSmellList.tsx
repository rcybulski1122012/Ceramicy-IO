import { Badge, Flex } from '@chakra-ui/react';

// const CodeSmells = [
//   'Comment',
//   'Incorrect typing',
//   'Typo',
//   'Logic Error',
//   'Invocation Error'
// ];

const CodeSmellColorMapping = new Map([
  ['Comment', 'red'],
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
