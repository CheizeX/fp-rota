import { Mulish } from "next/font/google";

export const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
});
