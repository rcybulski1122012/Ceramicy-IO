import { radioAnatomy } from '@chakra-ui/anatomy';
import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle((props: StyleFunctionProps) => ({
  control: {
    width: '28px',
    height: '28px',
    p: 1,
    background: mode('gray.50 !important', 'gray.800 !important')(props),
    border: mode('none', '5px solid green.100')(props),

    _checked: {
      color: mode('primary !important', 'primary !important')(props),
    },
  },
}));

export const radioTheme = defineMultiStyleConfig({
  baseStyle,
});
