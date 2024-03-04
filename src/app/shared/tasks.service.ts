import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import moment from 'moment';

import { ITask } from '../shared/models';

interface ICreateResponse {
  name: string;
}

const URL = 'https://organizer-4d2d1-default-rtdb.firebaseio.com/tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private readonly http: HttpClient) {}

  load(date: moment.Moment): Observable<ITask[]> {
    return this.http
      .get<Record<string, ITask>>(`${URL}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => (!tasks ? [] : Object.keys(tasks).map(key => ({ ...tasks[key], id: key })))));
  }

  create(task: ITask): Observable<ITask> {
    return this.http
      .post<ICreateResponse>(`${URL}/${task.date}.json`, task)
      .pipe(map(({ name }) => ({ ...task, id: name })));
  }

  remove(task: ITask): Observable<null> {
    return this.http.delete<null>(`${URL}/${task.date}/${task.id}.json`);
  }
}
