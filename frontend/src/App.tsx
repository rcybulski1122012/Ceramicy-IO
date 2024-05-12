import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';


function App() {
  return <ChakraProvider theme={theme}>
    <QuizzApp></QuizzApp>
  </ChakraProvider>
}

export default App;
