"use client";

import { FC, useState, useEffect } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@fichap-team/fichapui";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/icons/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, we can show the UI
  useEffect(() => setMounted(true), []);

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    // Use theme only after mounting, default to false (dark mode) before mount
    isSelected: mounted ? theme === "light" : false,
    "aria-label": `Switch to ${mounted && theme === "light" ? "dark" : "light"} mode`,
    onChange,
  });

  // Avoid rendering the switch until mounted to prevent hydration mismatch
  if (!mounted) {
    // Render a placeholder or null during SSR/hydration
    // You can customize this placeholder if needed
    return (
      <div
        className={clsx(
          "px-px w-[36px] h-[36px]", // Adjust size to match the actual switch
          className,
          classNames?.base
        )}
      />
    );
  }

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper
          ),
        })}
      >
        {/* Render icon based on isSelected state, which is now reliable after mount */}
        {isSelected ? (
          <SunFilledIcon size={22} />
        ) : (
          <MoonFilledIcon size={22} />
        )}
      </div>
    </Component>
  );
};
