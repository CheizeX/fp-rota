"use client";

import { COLORS } from "@/config/colors";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

interface GaugeMeterProps {
  value: number;
  label?: string;
  showEmoji?: boolean;
  size?: "sm" | "md" | "lg";
  customEmoji?: string;
  colorClass?: string;
}

export default function GaugeMeter({
  value = 73,
  label = "Alto",
  showEmoji = true,
  size = "lg",
  customEmoji,
  colorClass,
}: GaugeMeterProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = useMemo(() => theme === "dark", [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));

  // Calculate rotation angle for the needle (from -90 to 90 degrees)
  // 0% -> -90deg (left), 100% -> 90deg (right)
  const needleRotation = -90 + (180 * clampedValue) / 100;

  // Determine emoji based on value
  const getEmoji = () => {
    if (customEmoji) return customEmoji;
    if (clampedValue < 30) return "🙂";
    if (clampedValue < 60) return "😐";
    if (clampedValue < 80) return "😠";
    return "😡";
  };

  // Determine text color based on value
  const getColorClass = () => {
    if (colorClass) return colorClass;
    if (clampedValue < 30) return "text-success-600";
    if (clampedValue < 60) return "text-warning-600";
    if (clampedValue < 80) return "text-danger-600";
    return "text-danger-600";
  };

  // Determine size classes
  const sizeClasses = {
    sm: "w-64 h-40",
    md: "w-80 h-50",
    lg: "w-96 h-60",
  };

  // Determine font size based on component size
  const fontSizeClass = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  // Determine emoji size based on component size
  const emojiSizeClass = {
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-5xl",
  };

  if (!mounted) {
    return (
      <div
        className={`${sizeClasses[size]} bg-gray-100 rounded-lg animate-pulse`}
      ></div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Gauge background */}
        <svg
          className="w-full h-full"
          viewBox="0 0 200 120" // Adjusted viewBox height to better fit the arc + needle pivot
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%">
              <stop offset="0%" stopColor="#39E489" />
              <stop offset="50%" stopColor="#FFC700" />
              <stop offset="100%" stopColor="#FE3D2E" />
            </linearGradient>
          </defs>

          {/* Gauge background (gray track) */}
          {/* Arc starts at (20, 100) ends at (180, 100), center (100, 100), radius 80 */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={isDarkMode ? COLORS.LINE_DARK : COLORS.LINE_LIGHT}
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Colored gauge based on value */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="251.2" // Circumference of semi-circle = pi * r = pi * 80 = ~251.2
            strokeDashoffset={251.2 - (251.2 * clampedValue) / 100}
          />
        </svg>

        {/* Emoji and Text in center */}
        {showEmoji && (
          <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
            <span className={`${emojiSizeClass[size]} mx-auto`}>
              {getEmoji()}
            </span>
            <p className={`font-bold ${fontSizeClass[size]} mt-1`}>
              {clampedValue}%{" "}
              <span className={`${getColorClass()} font-light`}>{label}</span>
            </p>
          </div>
        )}

        {/* Needle */}
        <motion.div
          className="absolute w-full h-full top-0 left-0"
          style={{
            // Rotate around the center of the arc's base (100, 100) in viewBox coords
            // ViewBox height is 120, so 100 is at 100/120 = 83.33% from the top
            transformOrigin: "50% 83.33%",
          }}
          initial={{ rotate: -90 }} // Start pointing left
          animate={{ rotate: needleRotation }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
          {/* Arrowhead */}
          <div
            className="absolute "
            style={{
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: `12px solid ${isDarkMode ? COLORS.TEXT_WHITE : COLORS.TEXT_BLACK}`,
              left: "calc(50% - 0px)",
              bottom: "calc(10% + 50%)",
            }}
          ></div>
        </motion.div>
      </div>
    </div>
  );
}
