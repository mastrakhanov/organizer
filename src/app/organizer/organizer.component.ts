import { ChangeDetectionStrategy, Component, effect, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import moment from 'moment';

import { ITask } from '../shared/models';
import { DateService } from '../shared/date.service';
import { TasksService } from '../shared/tasks.service';
import { MomentPipe } from '../shared/moment.pipe';
import { EventHandler } from '../utils/event-handler';

@Component({
  selector: 'app-organizer',
  standalone: true,
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MomentPipe, ReactiveFormsModule],
})
export class OrganizerComponent {
  protected readonly titleForm = new FormControl<string>('', { nonNullable: true, validators: Validators.required });

  protected readonly date: WritableSignal<moment.Moment> = this.dateService.date;

  protected readonly tasks = signal<ITask[]>([]);

  constructor(
    private readonly dateService: DateService,
    private readonly tasksService: TasksService
  ) {
    effect(
      () => {
        const date = this.dateService.date();

        this.tasksService
          .load(date)
          .pipe(take(1))
          .subscribe(tasks => this.tasks.set(tasks));
      },
      { allowSignalWrites: true }
    );
  }

  @EventHandler
  protected add(_event: MouseEvent): void {
    const task: ITask = {
      title: this.titleForm.value,
      date: this.dateService.date().format('DD-MM-YYYY'),
    };

    this.tasksService
      .create(task)
      .pipe(take(1))
      .subscribe({
        next: task => {
          this.tasks.update(tasks => tasks.concat(task));
          this.titleForm.reset();
        },
        error: err => console.error(err),
      });
  }

  @EventHandler
  protected remove(_event: MouseEvent, task: ITask): void {
    this.tasksService
      .remove(task)
      .pipe(take(1))
      .subscribe({
        next: () => this.tasks.update(tasks => tasks.filter(t => t.id !== task.id)),
        error: err => console.error(err),
      });
  }
}
