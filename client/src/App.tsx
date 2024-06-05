import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider, AuthProvider } from "./shared/contexts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

export const App = () => {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <AppRoutes />
          </LocalizationProvider>
        </BrowserRouter>
      </AuthProvider>
    </AppThemeProvider>
  );
};
