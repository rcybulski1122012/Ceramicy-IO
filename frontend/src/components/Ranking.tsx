import { Session } from '../data/sessions';
import { Flex, Text } from '@chakra-ui/react';

type RankingProps = {
  session: Session | null;
};
// TODO: show actual ranking
const Ranking = ({ session }: RankingProps) => {
  return (
    <Flex
      direction={'column'}
      align={'start'}
      py={6}
      px={8}
      gap={4}
      height={'100%'}
    >
      <Text fontFamily={'heading'} textStyle={'h2'}>
        Ranking for {session?.id}
      </Text>
      <Text fontFamily={'body'}>See how your students are doing!</Text>
    </Flex>
  );
};

export default Ranking;
