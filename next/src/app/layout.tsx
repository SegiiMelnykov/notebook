'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Box, Container } from '@mui/material';
import Footer from '@/components/layouts/main/footer';
import Header from '@/components/layouts/main/header';
// Providers
import Providers from '@/providers';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {}, []);
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
            <Header />
            <Container
              className={inter.className}
              sx={{
                flexGrow: 1,
                pt: { xs: 8, md: 10 },
              }}
            >
              {children}
            </Container>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
