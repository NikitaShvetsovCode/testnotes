import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

export const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderColor: 'transparent',

            '& fieldset': {
              borderColor: 'var(--border)',
            },

            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--border)',
            },

            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--border)',
            },
          },
        },
      },
    },
  });
