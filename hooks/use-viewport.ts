import { useEffect, useState } from "react";

// Vreakpoints para los diferentes tamaños
const BREAKPOINTS = {
  sm: 640, // Small
  md: 768, // Medium
  lg: 1024, // Large
  xl: 1280, // Extra large
  "2xl": 1536, // 2x Extra large
};

interface UseViewportReturn {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

/**
 * Hook personalizado para detectar el tamaño del viewport y si estamos en dispositivo móvil
 * @returns Objeto con width, height, isMobile, isTablet, isDesktop y breakpoint actual
 */
export const useViewport = (): UseViewportReturn => {
  // Estado inicial con valores por defecto
  const [viewport, setViewport] = useState<UseViewportReturn>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    breakpoint: "xs",
  });

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;

    // Función para actualizar el estado
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Determinar el breakpoint actual
      let currentBreakpoint: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" = "xs";

      if (width >= BREAKPOINTS["2xl"]) {
        currentBreakpoint = "2xl";
      } else if (width >= BREAKPOINTS.xl) {
        currentBreakpoint = "xl";
      } else if (width >= BREAKPOINTS.lg) {
        currentBreakpoint = "lg";
      } else if (width >= BREAKPOINTS.md) {
        currentBreakpoint = "md";
      } else if (width >= BREAKPOINTS.sm) {
        currentBreakpoint = "sm";
      }

      // Determinar el tipo de dispositivo
      const isMobile = width < BREAKPOINTS.md;
      const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
      const isDesktop = width >= BREAKPOINTS.lg;

      setViewport({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        breakpoint: currentBreakpoint,
      });
    };

    // Inicializar con los valores actuales
    updateViewport();

    // Configurar el listener para el cambio de tamaño
    window.addEventListener("resize", updateViewport);

    // Limpiar el listener cuando se desmonte el componente
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return viewport;
};
