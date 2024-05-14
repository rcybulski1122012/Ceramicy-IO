import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import QuizPage from './components/pages/quiz/QuizPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/quiz/:quizId',
    element: <QuizPage></QuizPage>,
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>
  );
}

export default App;
