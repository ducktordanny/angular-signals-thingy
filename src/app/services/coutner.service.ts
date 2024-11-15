import { Injectable } from '@angular/core';
import { Observable, map, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CounterService {
  public getAutoCounter(): Observable<number> {
    let i = -1;
    return timer(0, 1000).pipe(map(() => ++i));
  }
}
