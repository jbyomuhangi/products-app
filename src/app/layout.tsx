import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import NavBar from "@/components/NavBar";
import theme from "@/theme";
import { Box } from "@mui/material";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My App",
  description: "My App",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={clsx(geistSans.variable, geistMono.variable)}>
        <NextTopLoader />

        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                padding: "10px",
                borderBottom: "1px solid #C7C7C7",
                boxShadow: "0 2px 2px -1px #C7C7C7",
              }}
            >
              <NavBar />
            </Box>

            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
