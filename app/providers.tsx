"use client";

import { FichapUIProvider } from "@fichap-team/fichapui";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextThemesProvider {...themeProps}>
      <FichapUIProvider>{children}</FichapUIProvider>
    </NextThemesProvider>
  );
}
