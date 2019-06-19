export type NextType = "prev" | "next" | "current";

export const isSameDate = (firstDate: Date, secondDate: Date): boolean => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};

export const getMonthStart = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDay = (year: number, month: number, date: number): number => {
  return new Date(year, month, date).getDay();
};

export const calculateDate = (
  type: NextType,
  year: number,
  month: number,
  date: number
): Date => {
  switch (type) {
    case "prev":
      const prevMonth = month > 0 ? month - 1 : 11;
      const prevYear = month > 0 ? year : year - 1;
      const prevMonthStart = getDaysInMonth(prevYear, prevMonth);
      return new Date(prevYear, prevMonth, prevMonthStart - date);
    case "next":
      const nextMonth = month < 11 ? month + 1 : 1;
      const nextYear = month < 11 ? year : year + 1;
      return new Date(nextYear, nextMonth, date);
    case "current":
      return new Date(year, month, date);
    default:
      throw new Error("Please enter valid command");
  }
};
