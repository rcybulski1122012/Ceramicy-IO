import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import QuizPage from './components/pages/quiz/QuizPage';
import AdminPage from './components/pages/AdminPage';
import { UserProvider } from './contexts/UserContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/quiz/:quizId',
    element: <QuizPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <RouterProvider router={router}></RouterProvider>
        </UserProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
