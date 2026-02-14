export function weightedRandom(items: { alias: string, src:string, weight: number }[]): [string, number] {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  const cursor = Math.random() * total;
  let sum = 0;
  for (const item of items) {
    sum += item.weight;
    if (cursor < sum) return [item.alias, Number(item.alias)];
  }
  return [items[items.length - 1].alias, Number(items[items.length - 1].alias)];
}
