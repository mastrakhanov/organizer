import { ChangeDetectionStrategy, Component, WritableSignal } from '@angular/core';
import moment from 'moment';

import { DateService } from '../shared/date.service';
import { MomentPipe } from '../shared/moment.pipe';
import { EventHandler } from '../utils/event-handler';

@Component({
  selector: 'app-selector',
  standalone: true,
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MomentPipe],
})
export class SelectorComponent {
  protected readonly date: WritableSignal<moment.Moment> = this.dateService.date;

  constructor(private readonly dateService: DateService) {}

  @EventHandler
  protected changeMonth(_event: MouseEvent, direction: number): void {
    this.dateService.changeMonth(direction);
  }
}
