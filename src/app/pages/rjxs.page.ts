import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map, tap } from 'rxjs';

@Component({
  selector: 'rxjs',
  template: `
    <h2>RxJS</h2>
    <button (click)="increase()">+</button>
    <button (click)="decrease()">-</button>
    <p>Number: {{ counter | async }}</p>
    <p>Twice: {{ twice | async }}</p>
    <p>Twice again: {{ twice | async }}</p>
  `,
  standalone: true,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsComponent implements OnDestroy {
  public counter = new BehaviorSubject<number>(1);
  public twice: Observable<number>;
  private subsciption: Subscription;

  constructor() {
    this.subsciption = this.counter.subscribe((value) => {
      console.log('counter', value);
    });
    // with this we loose `.value`, becuase it'll be an `Observable`
    this.twice = this.counter.pipe(
      map((value) => value * 2),
      tap(console.log),
    );
  }

  public increase(): void {
    this.counter.next(this.counter.value + 1);
  }

  public decrease(): void {
    this.counter.next(this.counter.value - 1);
  }

  public ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }
}
