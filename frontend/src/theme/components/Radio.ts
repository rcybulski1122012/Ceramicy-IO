import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    width: '28px',
    height: '28px',
    p: 1,
    background: 'gray.50 !important',
    border: 'none',

    _checked: {
      color: 'primary',
    },
  },
});

export const radioTheme = defineMultiStyleConfig({
  baseStyle,
});
