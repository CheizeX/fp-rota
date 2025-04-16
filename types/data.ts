/**
 * Tipos para los modelos de datos principales (supuesta backend/API)
 */

export interface Employee {
  id: string;
  name: string;
  department: string;
  gender: string;
  age: number;
  seniority: number;
  nationality: string;
  hierarchy: string;
  education: string;
  hireDate: Date;
  terminationDate?: Date;
  active: boolean;
}

export interface PersonnelEvent {
  id: string;
  employeeId: string;
  eventType: "hire" | "termination";
  date: Date;
  reason?: string;
}
