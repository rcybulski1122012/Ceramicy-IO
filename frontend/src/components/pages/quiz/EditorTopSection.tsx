import React from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';
import Timer from './Timer';

interface EditorTopSectionProps {
  x: number;
  y: number;
  handleSubmit: () => void;
}

const EditorTopSection: React.FC<EditorTopSectionProps> = ({
  x,
  y,
  handleSubmit,
}) => {
  return (
    <HStack
      spacing={4}
      padding={4}
      width={'100%'}
      justifyContent={'space-between'}
    >
      <Timer handleSubmit={handleSubmit}/>
      <HStack>
        <Text fontSize="xl">
          {x}/{y}
        </Text>
        <Button onClick={handleSubmit} colorScheme="blue">
          Submit
        </Button>
      </HStack>
    </HStack>
  );
};

export default EditorTopSection;
