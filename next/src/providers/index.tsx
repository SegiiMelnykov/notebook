'use client';

import '@/locales/i18n';
// Providers
import { store } from '@/store';
import { Provider as ReduxProvider } from 'react-redux';
import { SettingsProvider, SettingsDrawer } from '@/components/settings';
import { LocalizationProvider } from '@/locales';
import ThemeProvider from '@/theme';
import MotionLazy from '@/components/animate/motion-lazy';
import SnackbarProvider from '@/components/snackbar/snackbar-provider';
import ProgressBar from '@/components/progress-bar';
import { useEffect } from 'react';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {}, []);
  if (typeof window === 'undefined') return;
  return (
    <ReduxProvider store={store}>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light', // 'light' | 'dark'
          themeDirection: 'ltr', //  'rtl' | 'ltr'
          themeContrast: 'default', // 'default' | 'bold'
          themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
          themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
          themeStretch: false,
        }}
      >
        <LocalizationProvider>
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <SettingsDrawer />
                <ProgressBar />
                {children}
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </LocalizationProvider>
      </SettingsProvider>
    </ReduxProvider>
  );
}
