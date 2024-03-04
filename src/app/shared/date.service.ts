import { Injectable, signal } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  readonly date = signal<moment.Moment>(moment());

  changeMonth(dir: number): void {
    const value = this.date().clone().add(dir, 'month');
    this.date.set(value);
  }

  changeDate(date: moment.Moment): void {
    const value = this.date().clone().set({
      date: date.date(),
      month: date.month(),
    });

    this.date.set(value);
  }
}
