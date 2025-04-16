/**
 * Generador de datos de rotación y métricas para gráficos
 */
import {
  AddRemoveDataPoint,
  AspectData,
  ChartData,
  MetricCardData,
  RotationDataPoint,
} from "../types";
import { employeeStats } from "./employees";
import { dailyEmployeeCounts } from "./personnelEvents";

// 1. Generamos datos diarios para rotación (histórica y predictiva)
export const generateDailyRotationData = (
  year?: number
): RotationDataPoint[] => {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const startDate = new Date(currentYear, 0, 1); // 1 de enero
  const previousYear = currentYear - 1;

  // Obtenemos los datos reales de empleados por día
  const result: RotationDataPoint[] = [];

  // Si se proporciona un año, filtramos los datos para mostrar solo ese año y el anterior para comparación
  // Si no, mostramos todos los datos disponibles (desde el año pasado hasta hoy)
  const filteredData = year
    ? dailyEmployeeCounts.filter((day) => {
        const dayYear = day.date.getFullYear();
        return dayYear === year || dayYear === year - 1;
      })
    : dailyEmployeeCounts;

  // Organizamos los datos por fecha para poder comparar años
  const dataByMonthDay: Record<
    string,
    { current?: RotationDataPoint; previous?: RotationDataPoint }
  > = {};

  // Primero organizamos los datos por mes y día para facilitar la comparación entre años
  for (const dayData of filteredData) {
    const dayYear = dayData.date.getFullYear();
    const monthDay = `${dayData.date.getMonth()}-${dayData.date.getDate()}`; // Clave para agrupar mismo día de diferentes años

    // Calculamos el índice de rotación mensual anualizado (terminations * 12 / activeEmployees)
    const rotationValue =
      dayData.terminations > 0
        ? parseFloat(
            (
              ((dayData.terminations * 12) / dayData.activeEmployees) *
              100
            ).toFixed(1)
          )
        : parseFloat((Math.random() * 3 + 2).toFixed(1)); // Valor base si no hay terminaciones ese día

    // Inicializamos el registro si no existe
    if (!dataByMonthDay[monthDay]) {
      dataByMonthDay[monthDay] = {};
    }

    // Guardamos el valor según el año
    if (year && dayYear === year) {
      // Si estamos filtrando por un año específico, este es el valor actual
      dataByMonthDay[monthDay].current = {
        date: new Date(dayData.date),
        current: rotationValue,
        previous: 0, // Temporal, se actualizará después
        timeLabel: "", // Temporal
        fullDate: "", // Temporal
      };
    } else if (year && dayYear === year - 1) {
      // Si estamos filtrando y este es el año anterior, guardamos como valor previo
      dataByMonthDay[monthDay].previous = {
        date: new Date(dayData.date),
        current: rotationValue,
        previous: 0,
        timeLabel: "",
        fullDate: "",
      };
    } else if (!year && dayYear === currentYear) {
      // Si no filtramos, el año actual es el valor actual
      dataByMonthDay[monthDay].current = {
        date: new Date(dayData.date),
        current: rotationValue,
        previous: 0,
        timeLabel: "",
        fullDate: "",
      };
    } else if (!year && dayYear === previousYear) {
      // Si no filtramos, el año anterior es el valor previo
      dataByMonthDay[monthDay].previous = {
        date: new Date(dayData.date),
        current: rotationValue,
        previous: 0,
        timeLabel: "",
        fullDate: "",
      };
    }
  }

  // Ahora procesamos los datos agrupados para generar los puntos finales
  for (const [monthDay, data] of Object.entries(dataByMonthDay)) {
    // Solo procesamos si tenemos datos del año actual/seleccionado
    if (data.current) {
      const currentDate = data.current.date!;
      const dateHash = currentDate.getDate() + currentDate.getMonth() * 31;

      // Valor actual
      const current = data.current.current;

      // Valor del año anterior (real si existe, simulado si no)
      const previous = data.previous
        ? data.previous.current
        : parseFloat(((Math.sin(dateHash * 0.5 + 1) + 1) * 3 + 2).toFixed(1)); // Entre 2-8%

      // Predicción (solo para fechas futuras)
      const isPrediction = currentDate > currentDate;
      const prediction = isPrediction
        ? parseFloat(((Math.sin(dateHash * 0.3) + 1) * 4 + 3).toFixed(1)) // Entre 3-11%
        : undefined;

      // Formateamos fechas
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const yearValue = currentDate.getFullYear();
      const fullDate = `${day}/${month}/${yearValue}`;

      // Etiqueta simple para mostrar en el gráfico
      const displayDay = day;
      const displayMonth = currentDate
        .toLocaleString("es", { month: "short" })
        .substring(0, 3);
      const timeLabel = `${displayDay} ${displayMonth}`;

      result.push({
        timeLabel,
        fullDate,
        current,
        previous,
        prediction,
        date: new Date(currentDate),
      });
    }
  }

  // Ordenamos los resultados por fecha
  result.sort((a, b) => a.date!.getTime() - b.date!.getTime());

  return result;
};

// 2. Generamos datos diarios para altas y bajas, con opción de filtrado por año
export const generateDailyAddRemoveData = (
  year?: number
): AddRemoveDataPoint[] => {
  // Si se proporciona un año, filtramos los datos para mostrar solo ese año
  // Si no, mostramos todos los datos disponibles (desde el año pasado hasta hoy)
  const filteredData = year
    ? dailyEmployeeCounts.filter((day) => day.date.getFullYear() === year)
    : dailyEmployeeCounts;

  return filteredData.map((dayData) => {
    // Formateamos fechas
    const day = dayData.date.getDate().toString().padStart(2, "0");
    const month = (dayData.date.getMonth() + 1).toString().padStart(2, "0");
    const year = dayData.date.getFullYear();
    const fullDate = `${day}/${month}/${year}`;

    // Etiqueta simple para mostrar en el gráfico
    const displayDay = day;
    const displayMonth = dayData.date
      .toLocaleString("es", { month: "short" })
      .substring(0, 3);
    const timeLabel = `${displayDay} ${displayMonth}`;

    return {
      timeLabel,
      fullDate,
      increases: dayData.hires,
      decreases: -dayData.terminations, // Valores negativos para bajas
      date: new Date(dayData.date),
    };
  });
};

// Funciones auxiliares para agrupar datos por diferentes períodos de tiempo
// Agrupación semanal
const groupByWeek = <T extends { date?: Date }>(
  data: T[],
  valueReducer: (items: T[]) => Omit<T, "date" | "timeLabel">
): Array<Omit<T, "date"> & { timeLabel: string; daysCount: number }> => {
  const weeks: Record<string, T[]> = {};

  // Agrupar por semana
  for (const item of data) {
    if (!item.date) continue;

    const date = new Date(item.date);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((date.getTime() - startOfYear.getTime()) / 86400000 +
        startOfYear.getDay() +
        1) /
        7
    );

    const weekKey = `Sem ${weekNumber}`;
    if (!weeks[weekKey]) weeks[weekKey] = [];
    weeks[weekKey].push(item);
  }

  // Reducir cada semana a un solo valor
  return Object.entries(weeks).map(([weekKey, items]) => {
    const reduced = valueReducer(items);
    return {
      ...reduced,
      timeLabel: weekKey,
      daysCount: items.length,
    } as any;
  });
};

// Agrupación quincenal
const groupByBiweek = <T extends { date?: Date }>(
  data: T[],
  valueReducer: (items: T[]) => Omit<T, "date" | "timeLabel">
): Array<Omit<T, "date"> & { timeLabel: string; daysCount: number }> => {
  const biweeks: Record<string, T[]> = {};

  // Agrupar por quincena
  for (const item of data) {
    if (!item.date) continue;

    const date = new Date(item.date);
    const month = date.getMonth();
    const biweekNumber = date.getDate() <= 15 ? 1 : 2;
    const biweekKey = `${month + 1}.${biweekNumber}`;

    if (!biweeks[biweekKey]) biweeks[biweekKey] = [];
    biweeks[biweekKey].push(item);
  }

  // Reducir cada quincena a un solo valor
  return Object.entries(biweeks)
    .map(([biweekKey, items]) => {
      const [month, biweek] = biweekKey.split(".").map(Number);
      const monthName = new Date(2000, month - 1, 1)
        .toLocaleString("es", { month: "short" })
        .substring(0, 3);

      const reduced = valueReducer(items);
      return {
        ...reduced,
        timeLabel: `${monthName} Q${biweek}`,
        daysCount: items.length,
      } as any;
    })
    .sort((a, b) => {
      const aKey = a.timeLabel.split(" ");
      const bKey = b.timeLabel.split(" ");

      const months = [
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
      const aMonth = months.indexOf(aKey[0]);
      const bMonth = months.indexOf(bKey[0]);

      if (aMonth !== bMonth) return aMonth - bMonth;

      return aKey[1].localeCompare(bKey[1]);
    });
};

// Agrupación mensual
const groupByMonth = <T extends { date?: Date }>(
  data: T[],
  valueReducer: (items: T[]) => Omit<T, "date" | "timeLabel">
): Array<Omit<T, "date"> & { timeLabel: string; daysCount: number }> => {
  const months = [
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

  const monthlyData: Record<string, T[]> = {};

  // Inicializar todos los meses
  for (const month of months) {
    monthlyData[month] = [];
  }

  // Agrupar por mes
  for (const item of data) {
    if (!item.date) continue;

    const month = months[item.date.getMonth()];
    monthlyData[month].push(item);
  }

  // Reducir cada mes a un solo valor
  return months.map((month) => {
    const items = monthlyData[month];
    const reduced = valueReducer(items);
    return {
      ...reduced,
      timeLabel: month,
      daysCount: items.length,
    } as any;
  });
};

// Agrupación trimestral
const groupByQuarter = <T extends { date?: Date }>(
  data: T[],
  valueReducer: (items: T[]) => Omit<T, "date" | "timeLabel">
): Array<Omit<T, "date"> & { timeLabel: string; daysCount: number }> => {
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const quarterlyData: Record<string, T[]> = {};

  // Inicializar todos los trimestres
  for (const quarter of quarters) {
    quarterlyData[quarter] = [];
  }

  // Agrupar por trimestre
  for (const item of data) {
    if (!item.date) continue;

    const quarterIndex = Math.floor(item.date.getMonth() / 3);
    const quarter = quarters[quarterIndex];
    quarterlyData[quarter].push(item);
  }

  // Reducir cada trimestre a un solo valor
  return quarters.map((quarter) => {
    const items = quarterlyData[quarter];
    const reduced = valueReducer(items);
    return {
      ...reduced,
      timeLabel: quarter,
      daysCount: items.length,
    } as any;
  });
};

// Agrupación anual
const groupByYear = <T extends { date?: Date }>(
  data: T[],
  valueReducer: (items: T[]) => Omit<T, "date" | "timeLabel">
): Array<Omit<T, "date"> & { timeLabel: string; daysCount: number }> => {
  const yearlyData: Record<string, T[]> = {};

  // Agrupar por año
  for (const item of data) {
    if (!item.date) continue;

    const year = item.date.getFullYear().toString();
    if (!yearlyData[year]) yearlyData[year] = [];
    yearlyData[year].push(item);
  }

  // Reducir cada año a un solo valor
  return Object.entries(yearlyData).map(([year, items]) => {
    const reduced = valueReducer(items);
    return {
      ...reduced,
      timeLabel: year,
      daysCount: items.length,
    } as any;
  });
};

// Reducers específicos para cada tipo de dato
const rotationReducer = (
  items: RotationDataPoint[]
): Omit<RotationDataPoint, "date" | "timeLabel"> => {
  if (items.length === 0) {
    return {
      current: 0,
      previous: 0,
    };
  }

  const current =
    items.reduce((sum, item) => sum + item.current, 0) / items.length;
  const previous =
    items.reduce((sum, item) => sum + item.previous, 0) / items.length;

  // Solo incluimos predicción si todos los ítems tienen predicción
  const allHavePrediction = items.every(
    (item) => item.prediction !== undefined
  );
  const prediction = allHavePrediction
    ? items.reduce((sum, item) => sum + (item.prediction || 0), 0) /
      items.length
    : undefined;

  return {
    current: parseFloat(current.toFixed(1)),
    previous: parseFloat(previous.toFixed(1)),
    prediction:
      prediction !== undefined ? parseFloat(prediction.toFixed(1)) : undefined,
  };
};

const addRemoveReducer = (
  items: AddRemoveDataPoint[]
): Omit<AddRemoveDataPoint, "date" | "timeLabel"> => {
  if (items.length === 0) {
    return {
      increases: 0,
      decreases: 0,
    };
  }

  const increases = items.reduce((sum, item) => sum + item.increases, 0);
  const decreases = items.reduce((sum, item) => sum + item.decreases, 0);

  return {
    increases,
    decreases,
  };
};

// Funciones para agrupar datos por timeframe
export const groupRotationDataByTimeframe = (
  dailyData: RotationDataPoint[]
): ChartData<RotationDataPoint> => {
  return {
    weekly: groupByWeek(dailyData, rotationReducer),
    biweekly: groupByBiweek(dailyData, rotationReducer),
    monthly: groupByMonth(dailyData, rotationReducer),
    quarterly: groupByQuarter(dailyData, rotationReducer),
    yearly: groupByYear(dailyData, rotationReducer),
  };
};

export const groupAddRemoveDataByTimeframe = (
  dailyData: AddRemoveDataPoint[]
): ChartData<AddRemoveDataPoint> => {
  return {
    weekly: groupByWeek(dailyData, addRemoveReducer),
    biweekly: groupByBiweek(dailyData, addRemoveReducer),
    monthly: groupByMonth(dailyData, addRemoveReducer),
    quarterly: groupByQuarter(dailyData, addRemoveReducer),
    yearly: groupByYear(dailyData, addRemoveReducer),
  };
};

// Generar datos para aspectos de rotación
export const generateAspectData = (): AspectData => {
  const result: AspectData = {};

  // Procesar departamentos
  const departmentTotal = employeeStats.byDepartment.reduce(
    (sum, stat) => sum + stat.terminated,
    0
  );
  result.department = {
    absolute: employeeStats.byDepartment.map((stat) => ({
      label: stat.label,
      value: stat.terminated,
      percentage: stat.rotationPercentage,
    })),
    total: departmentTotal,
  };

  // Procesar género
  const genderTotal = employeeStats.byGender.reduce(
    (sum, stat) => sum + stat.terminated,
    0
  );
  result.gender = {
    absolute: employeeStats.byGender.map((stat) => ({
      label: stat.label,
      value: stat.terminated,
      percentage: stat.rotationPercentage,
    })),
    total: genderTotal,
  };

  // Procesar nacionalidad
  const nationalityTotal = employeeStats.byNationality.reduce(
    (sum, stat) => sum + stat.terminated,
    0
  );
  result.nationality = {
    absolute: employeeStats.byNationality.map((stat) => ({
      label: stat.label,
      value: stat.terminated,
      percentage: stat.rotationPercentage,
    })),
    total: nationalityTotal,
  };

  // Procesar edad
  const ageTotal = employeeStats.byAge.reduce(
    (sum, stat) => sum + stat.terminated,
    0
  );
  result.age = {
    absolute: employeeStats.byAge.map((stat) => ({
      label: stat.label,
      value: stat.terminated,
      percentage: stat.rotationPercentage,
    })),
    total: ageTotal,
  };

  // Procesar antigüedad
  const seniorityTotal = employeeStats.bySeniority.reduce(
    (sum, stat) => sum + stat.terminated,
    0
  );
  result.seniority = {
    absolute: employeeStats.bySeniority.map((stat) => ({
      label: stat.label,
      value: stat.terminated,
      percentage: stat.rotationPercentage,
    })),
    total: seniorityTotal,
  };

  // Procesar jerarquía
  const hierarchyTotal = employeeStats.byHierarchy.reduce(
    (sum, stat) => sum + stat.terminated,
    0
  );
  result.hierarchy = {
    absolute: employeeStats.byHierarchy.map((stat) => ({
      label: stat.label,
      value: stat.terminated,
      percentage: stat.rotationPercentage,
    })),
    total: hierarchyTotal,
  };

  // Procesar educación
  const educationTotal = employeeStats.byEducation.reduce(
    (sum, stat) => sum + stat.terminated,
    0
  );
  result.education = {
    absolute: employeeStats.byEducation.map((stat) => ({
      label: stat.label,
      value: stat.terminated,
      percentage: stat.rotationPercentage,
    })),
    total: educationTotal,
  };

  return result;
};

// Datos pre-generados para aspectos de rotación
export const aspectData = generateAspectData();

// Datos para las tarjetas métricas
export const generateMetricCardsData = (): MetricCardData[] => {
  // Total de empleados actuales
  const totalActiveEmployees =
    dailyEmployeeCounts[dailyEmployeeCounts.length - 1].activeEmployees;

  // Altas y bajas del último mes
  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const lastMonthEvents = dailyEmployeeCounts.filter(
    (day) => day.date >= oneMonthAgo && day.date <= currentDate
  );

  const hiresLastMonth = lastMonthEvents.reduce(
    (sum, day) => sum + day.hires,
    0
  );
  const terminationsLastMonth = lastMonthEvents.reduce(
    (sum, day) => sum + day.terminations,
    0
  );

  // Rotación promedio del último mes (anualizada)
  const rotationRate =
    terminationsLastMonth > 0
      ? parseFloat(
          (((terminationsLastMonth * 12) / totalActiveEmployees) * 100).toFixed(
            1
          )
        )
      : 4.5; // Valor por defecto

  // Tendencias (comparando con el mes anterior)
  const twoMonthsAgo = new Date(oneMonthAgo);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 1);

  const previousMonthEvents = dailyEmployeeCounts.filter(
    (day) => day.date >= twoMonthsAgo && day.date < oneMonthAgo
  );

  const hiresPrevMonth = previousMonthEvents.reduce(
    (sum, day) => sum + day.hires,
    0
  );
  const terminationsPrevMonth = previousMonthEvents.reduce(
    (sum, day) => sum + day.terminations,
    0
  );

  const totalEmployeesPrevMonth =
    totalActiveEmployees - (hiresLastMonth - terminationsLastMonth);

  const hireTrend =
    hiresPrevMonth > 0
      ? Math.round(((hiresLastMonth - hiresPrevMonth) / hiresPrevMonth) * 100)
      : 3;

  const terminationTrend =
    terminationsPrevMonth > 0
      ? Math.round(
          ((terminationsLastMonth - terminationsPrevMonth) /
            terminationsPrevMonth) *
            100
        )
      : 0;

  const employeeTrend =
    totalEmployeesPrevMonth > 0
      ? Math.round(
          ((totalActiveEmployees - totalEmployeesPrevMonth) /
            totalEmployeesPrevMonth) *
            100
        )
      : 10;

  // Rotación del mes anterior
  const prevMonthRotation =
    terminationsPrevMonth > 0
      ? parseFloat(
          (
            ((terminationsPrevMonth * 12) / totalEmployeesPrevMonth) *
            100
          ).toFixed(1)
        )
      : 4.7; // Valor por defecto

  const rotationTrend = Math.round(
    ((rotationRate - prevMonthRotation) / prevMonthRotation) * 100
  );

  // Predicción para el próximo mes (+2 puntos porcentuales para la demo)
  const predictedRotation = parseFloat((rotationRate + 2).toFixed(1));

  return [
    {
      title: "Total de empleados",
      value: totalActiveEmployees.toString(),
      trend: employeeTrend,
      from: "desde el mes anterior",
    },
    {
      title: "Altas totales",
      value: hiresLastMonth.toString(),
      trend: hireTrend,
      from: "desde el mes anterior",
    },
    {
      title: "Bajas totales",
      value: terminationsLastMonth.toString(),
      trend: terminationTrend,
      from: "desde el mes anterior",
    },
    {
      title: "Rotación prom. del mes",
      value: `${rotationRate}%`,
      trend: rotationTrend,
      from: "desde el mes anterior",
    },
    {
      title: "Predicción de rotación",
      value: `${predictedRotation}%`,
      trend: -5, // Tendencia negativa para la predicción
      from: "desde el mes anterior",
    },
  ];
};
