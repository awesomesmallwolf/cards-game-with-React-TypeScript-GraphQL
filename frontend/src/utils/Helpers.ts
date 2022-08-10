export const countPerSuite = 13;

export function isAce(card: number): boolean {
  return !(card % countPerSuite);
}
