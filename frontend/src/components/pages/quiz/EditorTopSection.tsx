import React from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';

const Timer = () => {
  // Placeholder Timer component
  return <Text fontSize={'xl'}>00:00:00</Text>;
};

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
      <Timer />
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
