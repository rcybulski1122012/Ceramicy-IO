import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex direction={'column'} height={'100vh'} width={'100vw'}>
      <Header />
      <Flex flexGrow={1} px={20} direction="column">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
