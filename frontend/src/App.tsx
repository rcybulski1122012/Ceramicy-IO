import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import QuizPage from './components/pages/quiz/QuizPage';
import {UserProvider} from "./contexts/UserContext.tsx";

const router = createHashRouter([
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
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
