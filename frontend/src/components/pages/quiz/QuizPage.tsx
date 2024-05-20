import { Grid, GridItem } from '@chakra-ui/react';
import Layout from '../../layout/Layout';
import quizzes from '../../../data/quizzes';
import FileSelection from './FileSelection';
import Editor from './Editor';

const QuizPage = () => {
  return (
    <Layout>
      <Grid templateColumns="repeat(7, 1fr)" width={'100%'}>
        <GridItem colSpan={2} minWidth={'360px'}>
          <FileSelection quiz={quizzes[0]} files={[]} />
        </GridItem>
        <GridItem colSpan={5} w="100%" p={6}>
          <Editor></Editor>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default QuizPage;
