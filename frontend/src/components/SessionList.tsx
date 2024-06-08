import { Radio, RadioGroup, VStack, Text, Box } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { useState } from 'react';

type SessionListProps = {
  sessions: SessionDetails[];
  onSessionSelection: (sessionId: string) => void;
};

export type SessionDetails = {
  id: string;
};

const SessionList = ({ sessions, onSessionSelection }: SessionListProps) => {
  const theme = useTheme();
  const [selectedSession, setSelectedSession] = useState('random');

  const isSelected = (_value: string | number) => _value == selectedSession;

  const onSelectedSessionChange = (sessionId: string) => {
    onSessionSelection(sessionId);
    setSelectedSession(sessionId);
  };

  return (
    <RadioGroup
      width={'100%'}
      height={'100%'}
      onChange={onSelectedSessionChange}
      value={selectedSession}
    >
      <VStack alignItems={'start'} w={'100%'} h={'100%'}>
        {sessions.map((session) => (
          <Box
            key={session.id}
            w="100%"
            h="100%"
            borderLeftRadius={12}
            _hover={{ background: 'green.10', color: 'black' }}
            sx={
              isSelected(session.id)
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
              key={session.id}
              w={'100%'}
              px={5}
              py={3}
              value={`${session.id}`}
              _hover={{ background: 'red' }}
            >
              <Text fontFamily={'heading'} fontSize={14} fontWeight={'bold'}>
                {session.id}
              </Text>
            </Radio>
          </Box>
        ))}
      </VStack>
    </RadioGroup>
  );
};

export default SessionList;
