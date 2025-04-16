// Datos relacionados con la tabla de empleados
import { DefaultCircleIcon, SuccessCircleIcon } from "@/icons/tableIcons";
import {
  ColumnsKeyType,
  ColumnType,
  EmotionType,
  UserType,
} from "@/types/table";

export const STATUS_OPTIONS = [
  { name: "Publicada", uid: "published" },
  { name: "Pausada", uid: "paused" },
] as const;

export const STATUS_COLORS_MAP = {
  Publicada: SuccessCircleIcon,
  Pausada: DefaultCircleIcon,
};

export const INITIAL_VISIBLE_COLUMNS: ColumnsKeyType[] = [
  "name",
  "riskPercentage",
  "exitDate",
  "emotion",
  "eNPS",
  "actions",
];

export const COLUMNS: ColumnType[] = [
  { uid: "name", name: "Colaborador", sortDirection: "ascending" },
  { uid: "riskPercentage", name: "Porcentaje de riesgo" },
  { uid: "exitDate", name: "Fecha estimada de salida" },
  { uid: "emotion", name: "Emoción" },
  { uid: "eNPS", name: "eNPS" },
  { uid: "actions", name: "Detalles" },
];

const names = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Brown",
  "David Wilson",
  "Eve Martinez",
  "Frank Thompson",
  "Grace Garcia",
  "Hannah Lee",
  "Isaac Anderson",
  "Julia Roberts",
  "Liam Williams",
  "Mia White",
  "Noah Harris",
  "Olivia Martin",
  "Peyton Jones",
  "Quinn Taylor",
  "Ryan Moore",
  "Sophia Davis",
  "Marcus Lopez",
  "Uma Thomas",
  "Victoria Jackson",
  "William Green",
  "Xavier Hill",
  "Yara Scott",
  "Zoe Baker",
  "Aaron Carter",
  "Bella Brown",
  "Carter Black",
  "Daisy Clark",
  "Ethan Hunt",
  "Fiona Apple",
  "George King",
  "Harper Knight",
  "Ivy Lane",
  "Jack Frost",
  "Kylie Reed",
  "Lucas Grant",
  "Molly Shaw",
  "Nathan Ford",
  "Oliver Stone",
  "Penelope Cruz",
  "Quentin Cook",
  "Ruby Fox",
  "Sarah Miles",
  "Travis Shaw",
  "Ursula Major",
  "Vera Mindy",
  "Wesley Snipes",
  "Xena Warrior",
  "Yvette Fielding",
];

export const POSSIBLE_AREAS = [
  "Tecnología",
  "Recursos Humanos",
  "Ventas",
  "Marketing",
  "Finanzas",
  "Operaciones",
];

const COMPANIES = ["Fichap", "Google", "Microsoft", "Apple", "Amazon", "Meta"];

const LOCATIONS = [
  "Buenos Aires",
  "Córdoba",
  "Rosario",
  "Mendoza",
  "San Pablo",
  "Ciudad de México",
];

import { SeededRandom } from "@/helpers/seededRandom";

const generateMockUserData = (count: number): UserType[] => {
  const random = new SeededRandom(12345);
  const mockData: UserType[] = [];
  const emotions: EmotionType[] = [
    "Felíz",
    "Calmado",
    "Sorprendido",
    "Disgustado",
    "Confundido",
    "Triste",
    "Enojado",
    "Miedo",
  ];
  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  // Obtener fecha actual
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  for (let i = 0; i < count; i++) {
    // Usar nuestro generador con semilla para todos los valores aleatorios
    const selectedName = random.nextElement(names);

    // Generar porcentaje de riesgo aleatorio entre 10% y 90% (para tener bajo, medio y alto)
    const riskPercentage = random.nextInt(10, 91);

    // Generar fecha estimada en formato "dd Oct. yyyy" (entre 1 y 3 meses en el futuro)
    const exitMonth = month + random.nextInt(1, 4); // 1-3 meses en el futuro
    const exitDay = random.nextInt(1, 29); // Entre el día 1 y 28
    const exitDate = new Date(year, exitMonth, exitDay);
    const formattedDate = `${exitDate.getDate()} ${monthNames[exitDate.getMonth()]}. ${exitDate.getFullYear()}`;

    // Asignar emociones según el nivel de riesgo
    let emotion: EmotionType;
    if (riskPercentage < 40) {
      // Bajo riesgo: emociones positivas
      emotion = random.nextElement(["Felíz", "Calmado"]);
    } else if (riskPercentage < 70) {
      // Riesgo medio: emociones neutras
      emotion = random.nextElement(["Sorprendido", "Confundido"]);
    } else {
      // Alto riesgo: emociones negativas
      emotion = random.nextElement([
        "Disgustado",
        "Triste",
        "Enojado",
        "Miedo",
      ]);
    }

    // Generar porcentaje eNPS aleatorio entre 20% y 30%
    const eNPS = `${random.nextInt(20, 31)}%`;
    // Estos avatares son de estilo "personas" y usan un hash basado en el nombre para consistencia
    const seed = selectedName.replace(/\s+/g, "").toLowerCase();
    const avatarUrl = `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

    const user: UserType = {
      id: `AC-${342 + i}`,
      name: selectedName,
      avatar: avatarUrl,
      riskPercentage,
      exitDate: formattedDate,
      emotion,
      eNPS,
      area: random.nextElement(POSSIBLE_AREAS),
    };
    mockData.push(user);
  }

  return mockData;
};

export const users: UserType[] = generateMockUserData(100);
