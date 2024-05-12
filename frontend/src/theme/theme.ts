import { extendTheme } from '@chakra-ui/react';
import colors from './foundations/colors';
import { fontSizes, fontWeights, fonts, textStyles } from './foundations/fonts';
import { radioTheme } from './components/Radio';


const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  fontWeights,
  textStyles,
  components: {
    Radio: radioTheme,
  },
});

export default theme;
