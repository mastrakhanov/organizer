import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import moment from 'moment';

import { DateService } from '../shared/date.service';
import { MomentPipe } from '../shared/moment.pipe';
import { EventHandler } from '../utils/event-handler';

interface IDay {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface IWeek {
  days: IDay[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MomentPipe],
})
export class CalendarComponent {
  protected readonly calendar = computed<IWeek[]>(() => {
    const now = this.dateService.date();

    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');

    const calendar: IWeek[] = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');

            return {
              value,
              active,
              disabled,
              selected,
            };
          }),
      });
    }

    return calendar;
  });

  constructor(private readonly dateService: DateService) {}

  @EventHandler
  protected select(_event: MouseEvent, day: moment.Moment): void {
    this.dateService.changeDate(day);
  }
}
