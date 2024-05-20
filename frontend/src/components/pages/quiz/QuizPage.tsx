import { Box, Grid, GridItem } from '@chakra-ui/react';
import Layout from '../../layout/Layout';
import quizzes from '../../../data/quizzes';
import FileSelection from './FileSelection';
import Editor from './Editor';
import Countdown from 'react-countdown';

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <Box color="red" padding="1rem">
        time is up!
      </Box>
    );
  } else {
    return (
      <Box padding="1rem">
        {hours}:{minutes}:{seconds}
      </Box>
    );
  }
};

const submitQuiz = () => {
  // TODO: submit the quiz
  console.log("the quiz should be submited now");
}

const QuizPage = () => {
  return (
    <Layout>
      <Grid templateColumns="repeat(7, 1fr)" width={'100%'}>
        <GridItem colSpan={2} minWidth={'360px'}>
          <FileSelection quiz={quizzes[0]} files={[]} />
        </GridItem>
        <GridItem colSpan={5} w="100%" p={6}>
          <Box fontSize="30">
            <Countdown
              date={Date.now() + quizzes[0].time*1000}
              renderer={renderer}
              onComplete={submitQuiz}
            ></Countdown>
          </Box>
          <Editor></Editor>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default QuizPage;
