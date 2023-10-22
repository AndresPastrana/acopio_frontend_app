export const findById = <T>(
  id: string,
  elements: Array<T & { id: string }>
): T | null => {
  return elements[elements.findIndex((e) => e.id === id)] || null;
};
