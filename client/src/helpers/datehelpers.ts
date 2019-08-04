type Order = 'asc' | 'desc';

export const compareDate = (a: Date, b: Date, order: Order): number => {
  switch (order) {
    case 'desc':
      return b.getTime() - a.getTime();
    case 'asc':
    default:
      return a.getTime() - b.getTime();
  }
};
