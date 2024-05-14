import { Text, Flex, chakra, Icon, useColorMode } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { FaUserGraduate } from 'react-icons/fa';
import { RiCodeSSlashFill } from 'react-icons/ri';
import { Switch } from '@chakra-ui/react';

const Header = () => {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      px={20}
      py={6}
      justify={'space-between'}
      align={'center'}
      borderBottom={`3px solid ${theme.colors.gray[50]}`}
    >
      <Flex align={'center'} gap={3}>
        <Icon
          as={RiCodeSSlashFill}
          fontSize={40}
          fill={theme.colors.primary}
          fontWeight={'bold'}
        />
        <Text fontFamily={'heading'} fontSize={'2xl'} fontWeight={'bold'}>
          Code
          <chakra.span color={theme.colors.secondary}>Smell</chakra.span> App
        </Text>
      </Flex>
      <Flex gap={10} align={'center'}>
        <Flex gap={4} align={'center'}>
          <Icon
            as={FaUserGraduate}
            fontSize={26}
            fill={theme.colors.secondary}
            fontWeight={'bold'}
          />
          <Text fontFamily={'heading'} fontSize={'lg'} fontWeight={'bold'}>
            Jakub Barber
          </Text>
        </Flex>
        <Switch
          size="md"
          isChecked={colorMode == 'dark'}
          onChange={toggleColorMode}
        />
      </Flex>
    </Flex>
  );
};

export default Header;
