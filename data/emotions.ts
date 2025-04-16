import { EmotionType } from "@/types/table";

// Define la estructura de los datos de emoción
export interface EmotionDefinition {
  emoji: string;
  label: EmotionType;
}

// Objeto con todas las emociones y sus emojis correspondientes
export const EMOTIONS: EmotionDefinition[] = [
  { emoji: "🙂", label: "Felíz" },
  { emoji: "😌", label: "Calmado" },
  { emoji: "😧", label: "Sorprendido" },
  { emoji: "😣", label: "Disgustado" },
  { emoji: "😵‍💫", label: "Confundido" },
  { emoji: "🥺", label: "Triste" },
  { emoji: "😡", label: "Enojado" },
  { emoji: "😱", label: "Miedo" },
];

// Función auxiliar para obtener el emoji correspondiente a una emoción
export const getEmoji = (emotion: EmotionType): string => {
  const found = EMOTIONS.find((e) => e.label === emotion);
  return found ? found.emoji : "😐";
};
