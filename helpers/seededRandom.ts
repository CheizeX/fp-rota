// Este archivo contiene una clase para generar números aleatorios con una semilla fija
// Lo que garantiza que siempre se generarán los mismos "valores aleatorios"

export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Genera un número aleatorio entre 0 y 1 (similar a Math.random())
  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  // Genera un entero aleatorio entre min (inclusive) y max (exclusive)
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min) + min);
  }

  // Selecciona un elemento aleatorio de un array
  nextElement<T>(array: T[]): T {
    return array[this.nextInt(0, array.length)];
  }
}
