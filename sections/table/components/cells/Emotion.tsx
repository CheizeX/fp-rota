import React from "react";
import { EmotionType } from "@/types/table";
import { getEmoji } from "@/data/emotions";

interface EmotionProps {
  emotion: EmotionType;
}

export const Emotion: React.FC<EmotionProps> = ({ emotion }) => {
  const emoji = getEmoji(emotion);

  return (
    <div className="flex items-center gap-2">
      <span className="text-3xl">{emoji}</span>
      <span className="text-xs">{emotion}</span>
    </div>
  );
};
