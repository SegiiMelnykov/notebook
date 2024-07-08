export default function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]; // Create a new array to avoid modifying the original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at i and j
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
