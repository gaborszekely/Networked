import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "month" })
export class MonthPipe implements PipeTransform {
  transform(month: number): string {
    const calendarMonths: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return calendarMonths[month];
  }
}
