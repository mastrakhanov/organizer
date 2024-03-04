import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SelectorComponent } from './selector/selector.component';
import { CalendarComponent } from './calendar/calendar.component';
import { OrganizerComponent } from './organizer/organizer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [SelectorComponent, CalendarComponent, OrganizerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
