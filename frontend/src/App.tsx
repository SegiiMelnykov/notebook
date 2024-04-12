import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SettingsProvider, SettingsDrawer } from "src/components/settings";
import ThemeProvider from "src/theme";
import MotionLazy from "src/components/animate/motion-lazy";
import SnackbarProvider from "src/components/snackbar/snackbar-provider";
import ProgressBar from "src/components/progress-bar";
import { useScrollToTop } from "src/hooks/use-scroll-to-top";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";
import Router from "src/routes/sections";
import "src/locales/i18n";

// editor
import "react-quill/dist/quill.snow.css";

export default function App() {
  useScrollToTop();

  return (
    <ReduxProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider
          defaultSettings={{
            themeMode: "light", // 'light' | 'dark'
            themeDirection: "ltr", //  'rtl' | 'ltr'
            themeContrast: "default", // 'default' | 'bold'
            themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <SettingsDrawer />
                <ProgressBar />
                <Router />
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </ReduxProvider>
  );
}
