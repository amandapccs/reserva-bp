import {
  createContext,
  useContext,
} from "react";
import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";

import { LightTheme } from "./../themes";

interface IThemeContextData {
  themeName: "light";
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

interface IAppThemeProviderProps {
  children: React.ReactNode;
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  const themeName = "light";

  return (
    <ThemeContext.Provider value={{ themeName }}>
      <ThemeProvider theme={LightTheme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={LightTheme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
