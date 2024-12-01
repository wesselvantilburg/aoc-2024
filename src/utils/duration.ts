export function duration<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();

    console.log(`Execution time: ${(end - start).toFixed(2)} ms`);
    return result;
  };
}
