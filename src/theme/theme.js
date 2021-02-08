import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useGlobalContext } from '../contexts/GlobalContext';

// color palette: https://colorhunt.co/palette/167893

export default function Theme({ children }) {

  const {darkMode} = useGlobalContext(); 

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#0f4c75',
      },
      secondary: {
        main: '#1b262c',
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
}
