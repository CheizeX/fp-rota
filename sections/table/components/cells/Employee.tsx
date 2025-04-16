import React from "react";
import { Avatar } from "@fichap-team/fichapui";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

export const Employee: React.FC<AvatarProps> = ({ name, src, size = "sm" }) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Avatar
      src={src}
      name={name}
      size={size}
      showFallback
      fallback={initials}
      className="border-2 border-white/20"
      imgProps={src ? { referrerPolicy: "no-referrer" } : undefined}
    />
  );
};
