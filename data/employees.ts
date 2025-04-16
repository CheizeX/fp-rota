/**
 * Base de datos simulada de empleados para generar datos de rotación
 */
import { Employee } from "../types";

// Función que genera un conjunto de empleados simulados
export const generateEmployees = (count: number = 2400): Employee[] => {
  const departments = [
    "Ventas",
    "Marketing",
    "Recursos Humanos",
    "Finanzas",
    "Tecnología",
    "Operaciones",
    "Atención al Cliente",
    "Administración",
  ];

  const genders = ["Masculino", "Femenino", "No binario"];

  const nationalities = [
    "Argentina",
    "Uruguay",
    "Chile",
    "Brasil",
    "Colombia",
    "Perú",
    "México",
    "España",
    "Estados Unidos",
    "Otros",
  ];

  const hierarchies = [
    "Director",
    "Gerente",
    "Coordinador",
    "Supervisor",
    "Líder",
    "Analista Senior",
    "Analista",
    "Asistente",
    "Operario",
  ];

  const educationLevels = [
    "Primario",
    "Secundario",
    "Terciario",
    "Universitario",
    "Posgrado",
    "Doctorado",
  ];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const employees: Employee[] = [];

  for (let i = 0; i < count; i++) {
    // Generamos datos aleatorios pero determinísticos basados en el índice
    const departmentIndex = i % departments.length;
    const genderIndex = Math.floor((i / departments.length) % genders.length);
    const nationalityIndex = Math.floor(
      (i / (departments.length * genders.length)) % nationalities.length
    );

    // Datos más variados para otras propiedades
    const age = 20 + (i % 45); // Edades entre 20 y 64
    const seniority = Math.max(
      0,
      Math.min(20, Math.floor(Math.sin(i) * 10 + 5))
    ); // Entre 0 y 20 años

    // Fecha de contratación basada en la antigüedad
    const hireDate = new Date(currentDate);
    hireDate.setFullYear(currentYear - seniority);

    // Determinamos si está activo o no (para simular rotación)
    // Aproximadamente un 15% de los empleados son inactivos (han rotado)
    const active = Math.sin(i * 0.7) > -0.7;

    // Para empleados inactivos, establecemos fecha de término
    let terminationDate;
    if (!active) {
      terminationDate = new Date(hireDate);
      // La duración del empleo puede ser de hasta la antigüedad máxima
      const employmentDuration =
        Math.floor(Math.random() * (seniority * 365)) + 30; // Al menos 30 días
      terminationDate.setDate(terminationDate.getDate() + employmentDuration);

      // Si la fecha de término es mayor a hoy, ajustamos
      if (terminationDate > currentDate) {
        terminationDate = new Date(currentDate);
        terminationDate.setDate(
          terminationDate.getDate() - Math.floor(Math.random() * 365)
        ); // Último año
      }
    }

    // Nivel de educación basado en la jerarquía
    const hierarchyLevel = Math.floor((i % 100) / 10); // 0-9
    const educationLevelIndex = Math.min(
      educationLevels.length - 1,
      Math.floor((hierarchyLevel * educationLevels.length) / 10)
    );

    employees.push({
      id: `EMP${String(i + 1).padStart(6, "0")}`,
      name: `Empleado ${i + 1}`,
      department: departments[departmentIndex],
      gender: genders[genderIndex],
      age,
      seniority,
      nationality: nationalities[nationalityIndex],
      hierarchy: hierarchies[hierarchyLevel],
      education: educationLevels[educationLevelIndex],
      hireDate,
      terminationDate: active ? undefined : terminationDate,
      active,
    });
  }

  return employees;
};

// Empleados de la empresa, generados una vez y reutilizados
export const employees = generateEmployees();

// Función para obtener estadísticas de empleados por una dimensión específica
interface DimensionStats {
  label: string;
  total: number;
  active: number;
  terminated: number;
  rotationPercentage: number;
}

export const getDimensionStats = (
  dimension: keyof Employee
): DimensionStats[] => {
  const stats: Record<
    string,
    { total: number; active: number; terminated: number }
  > = {};

  // Agrupar empleados por la dimensión especificada
  for (const employee of employees) {
    const key = String(employee[dimension]);

    if (!stats[key]) {
      stats[key] = { total: 0, active: 0, terminated: 0 };
    }

    stats[key].total++;
    if (employee.active) {
      stats[key].active++;
    } else {
      stats[key].terminated++;
    }
  }

  // Convertir a array de estadísticas
  return Object.entries(stats).map(
    ([label, { total, active, terminated }]) => ({
      label,
      total,
      active,
      terminated,
      rotationPercentage:
        terminated > 0 ? Math.round((terminated / total) * 1000) / 10 : 0,
    })
  );
};

// Exportar datos para la demo
export const employeeStats = {
  byDepartment: getDimensionStats("department"),
  byGender: getDimensionStats("gender"),
  byNationality: getDimensionStats("nationality"),
  byHierarchy: getDimensionStats("hierarchy"),
  byEducation: getDimensionStats("education"),
  // Para edad y antigüedad, agrupamos en rangos
  byAge: [
    {
      label: "18-25",
      total: 0,
      active: 0,
      terminated: 0,
      rotationPercentage: 0,
    },
    {
      label: "26-35",
      total: 0,
      active: 0,
      terminated: 0,
      rotationPercentage: 0,
    },
    {
      label: "36-45",
      total: 0,
      active: 0,
      terminated: 0,
      rotationPercentage: 0,
    },
    { label: "46+", total: 0, active: 0, terminated: 0, rotationPercentage: 0 },
  ].map((range) => {
    // Calculamos datos para cada rango de edad
    const [min, max] = range.label.includes("+")
      ? [parseInt(range.label), 100]
      : range.label.split("-").map((n) => parseInt(n));

    for (const employee of employees) {
      if (employee.age >= min && employee.age <= max) {
        range.total++;
        if (employee.active) {
          range.active++;
        } else {
          range.terminated++;
        }
      }
    }

    range.rotationPercentage =
      range.terminated > 0
        ? Math.round((range.terminated / range.total) * 1000) / 10
        : 0;

    return range;
  }),
  bySeniority: [
    { label: "0-1", total: 0, active: 0, terminated: 0, rotationPercentage: 0 },
    { label: "1-3", total: 0, active: 0, terminated: 0, rotationPercentage: 0 },
    { label: "3-5", total: 0, active: 0, terminated: 0, rotationPercentage: 0 },
    {
      label: "5-10",
      total: 0,
      active: 0,
      terminated: 0,
      rotationPercentage: 0,
    },
    { label: "10+", total: 0, active: 0, terminated: 0, rotationPercentage: 0 },
  ].map((range) => {
    // Calculamos datos para cada rango de antigüedad
    const [min, max] = range.label.includes("+")
      ? [parseInt(range.label), 100]
      : range.label.split("-").map((n) => parseInt(n));

    for (const employee of employees) {
      if (employee.seniority >= min && employee.seniority <= max) {
        range.total++;
        if (employee.active) {
          range.active++;
        } else {
          range.terminated++;
        }
      }
    }

    range.rotationPercentage =
      range.terminated > 0
        ? Math.round((range.terminated / range.total) * 1000) / 10
        : 0;

    return range;
  }),
};
