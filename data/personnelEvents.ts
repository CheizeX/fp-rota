/**
 * Genera eventos de personal (contrataciones y bajas) a partir de los datos de empleados
 */
import { PersonnelEvent } from "../types";

// Función para generar eventos de contratación y terminación basados en empleados
export const generatePersonnelEvents = (): PersonnelEvent[] => {
  const events: PersonnelEvent[] = [];
  const currentDate = new Date();

  // Usamos un periodo de análisis de 2 años
  const startDate = new Date(currentDate);
  startDate.setFullYear(currentDate.getFullYear() - 1); // Desde el año pasado

  // Razones de terminación para simulación
  const terminationReasons = [
    "Renuncia voluntaria",
    "Mejor oferta laboral",
    "Relocalización",
    "Descontento con la posición",
    "Problemas personales",
    "Restructuración",
    "Bajo desempeño",
    "Fin de contrato",
    "Jubilación",
    "Despido",
  ];

  // Para cada mes del año actual y anterior, genera altas y bajas distribuidas
  const totalMonths = 24; // 2 años x 12 meses

  // Distribuir eventos artificialmente a lo largo de los meses
  for (let i = 0; i < totalMonths; i++) {
    // Determina el año y mes específico (relativo a la fecha actual)
    const targetDate = new Date(currentDate);
    targetDate.setMonth(targetDate.getMonth() - (totalMonths - 1 - i));

    // Año de este lote de eventos
    const year = targetDate.getFullYear();
    // Mes de este lote de eventos (0-11)
    const month = targetDate.getMonth();

    // Para cada mes, genera entre 10-30 altas
    const hiresCount = Math.floor(Math.random() * 20) + 10;

    for (let j = 0; j < hiresCount; j++) {
      const day = Math.floor(Math.random() * 28) + 1; // Día aleatorio del mes
      const hireDate = new Date(year, month, day);

      // Crea un ID único para este empleado
      const employeeId = `EMP-${year}-${month}-${j}`;

      events.push({
        id: `HIRE-${employeeId}`,
        employeeId,
        eventType: "hire",
        date: hireDate,
      });
    }

    // Para cada mes, genera entre 5-15 bajas
    const terminationsCount = Math.floor(Math.random() * 10) + 5;

    for (let j = 0; j < terminationsCount; j++) {
      const day = Math.floor(Math.random() * 28) + 1; // Día aleatorio del mes
      const terminationDate = new Date(year, month, day);

      // Crea un ID único para este empleado (diferente de las altas)
      const employeeId = `EMP-TERM-${year}-${month}-${j}`;

      // Seleccionar una razón aleatoria para la baja
      const reasonIndex = Math.floor(Math.random() * terminationReasons.length);

      events.push({
        id: `TERM-${employeeId}`,
        employeeId,
        eventType: "termination",
        date: terminationDate,
        reason: terminationReasons[reasonIndex],
      });
    }
  }

  // Ordenar eventos por fecha
  events.sort((a, b) => a.date.getTime() - b.date.getTime());

  return events;
};

// Eventos generados para reutilizar
export const personnelEvents = generatePersonnelEvents();

// Función para agrupar eventos por fecha
export type EventsGroupedByDate = {
  date: Date;
  hires: number;
  terminations: number;
};

export const getEventsGroupedByDay = (
  startDate: Date = new Date(new Date().getFullYear() - 1, 0, 1), // Desde el 1 de enero del año anterior
  year?: number // Parámetro opcional para filtrar por año específico
): EventsGroupedByDate[] => {
  const result: Record<string, EventsGroupedByDate> = {};

  // Inicializamos los días desde el año pasado hasta hoy
  const endDate = new Date();
  let currentDay = new Date(startDate);

  // Si se especifica un año, ajustamos las fechas para cubrir solo ese año
  if (year) {
    startDate.setFullYear(year, 0, 1); // 1 de enero del año especificado
    currentDay = new Date(startDate);

    // Si el año especificado es el actual, el final es hoy
    // Si no, es el 31 de diciembre de ese año
    if (year === new Date().getFullYear()) {
      // Fin es la fecha actual
    } else {
      endDate.setFullYear(year, 11, 31); // 31 de diciembre del año especificado
    }
  }

  while (currentDay <= endDate) {
    const dateKey = currentDay.toISOString().split("T")[0];
    result[dateKey] = {
      date: new Date(currentDay),
      hires: 0,
      terminations: 0,
    };
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // Filtramos los eventos por año si se especifica
  const eventsToProcess = year
    ? personnelEvents.filter((e) => e.date.getFullYear() === year)
    : personnelEvents;

  // Contamos los eventos para cada día
  for (const event of eventsToProcess) {
    const dateKey = event.date.toISOString().split("T")[0];
    if (result[dateKey]) {
      if (event.eventType === "hire") {
        result[dateKey].hires++;
      } else {
        result[dateKey].terminations++;
      }
    }
  }

  // Convertimos a array y ordenamos por fecha
  return Object.values(result).sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
};

// Exportar datos diarios (sin filtro de año)
export const dailyEvents = getEventsGroupedByDay();

// Calcular la cantidad total de empleados activos para cada día
export interface DailyEmployeeCount {
  date: Date;
  activeEmployees: number;
  hires: number;
  terminations: number;
  netChange: number;
}

export const getDailyEmployeeCounts = (year?: number): DailyEmployeeCount[] => {
  // Si se especifica un año, empezamos desde el 1 de enero de ese año
  // Si no, desde el 1 de enero del año anterior
  const startDate = year
    ? new Date(year, 0, 1)
    : new Date(new Date().getFullYear() - 1, 0, 1);

  // Obtenemos datos diarios filtrados por año si se especifica
  const dailyData = getEventsGroupedByDay(startDate, year);

  // Calculamos el número inicial de empleados activos al inicio del periodo
  // Para simplificar, usaremos un número base arbitrario al inicio del periodo
  const initialActiveEmployees = 2000;

  // Calculamos el recuento diario
  const result: DailyEmployeeCount[] = [];
  let runningTotal = initialActiveEmployees;

  for (const day of dailyData) {
    // Actualizamos el total con los cambios del día
    const netChange = day.hires - day.terminations;
    runningTotal += netChange;

    result.push({
      date: day.date,
      activeEmployees: runningTotal,
      hires: day.hires,
      terminations: day.terminations,
      netChange,
    });
  }

  return result;
};

// Datos sin filtrar por año por defecto
export const dailyEmployeeCounts = getDailyEmployeeCounts();
