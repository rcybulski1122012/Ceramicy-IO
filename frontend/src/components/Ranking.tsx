import { Session } from '../data/sessions';
import { Flex, Text, Button } from '@chakra-ui/react';
import {dummyRanking} from "./../data/ranking.ts"
import {Smell} from "../data/quizzes.ts";

type RankingProps = {
  session: Session | null;
  onSolutionSelect: (solution: Smell[][]) => void;
};
// TODO: show actual ranking
const Ranking = ({session, onSolutionSelect}: RankingProps) => {
  return (
    <Flex direction="column" align="start" py={6} px={8} gap={4} height="100%">
      <Text fontFamily="heading" textStyle="h2">
        Ranking
      </Text>
      <Text fontFamily="body">See how your students are doing!</Text>

      {dummyRanking
        .sort((a, b) => b.score - a.score)
        .map((quiz, index) => (
          <Flex key={index} direction="row" align="center" gap={4}>
            <Text>{quiz.user_name}</Text>
            <Text>{quiz.score}</Text>
            <Button onClick={() => onSolutionSelect(quiz.solution)}>
              View Solution
            </Button>
          </Flex>
        ))}
    </Flex>
  );
};

export default Ranking;