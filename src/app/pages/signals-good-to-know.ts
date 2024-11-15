import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CounterService } from '../services/coutner.service';
import { isEqual } from 'lodash';

@Component({
  selector: 'signals-good-to-know',
  template: `
    <h2>Signals good to know</h2>
    <button (click)="increase()">+</button>
    <button (click)="decrease()">-</button>
    <p>Number: {{ counter() }}</p>
    <p>Twice: {{ twice() }}</p>
    ---
    <p>To signal: {{ autoCounter() }}</p>
    <button (click)="setToSame()">Set to same</button>
  `,
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsGoodToKnowComponent implements OnInit {
  // 1. Computed returns a readonly value
  public counter: WritableSignal<number> = signal(1);
  public twice: Signal<number> = computed(() => this.counter() * 2);

  public autoCounter: Signal<number | undefined>;

  constructor(
    counterService: CounterService,
    //private injector: Injector,
  ) {
    // 2. Create signal from Observable
    this.autoCounter = toSignal(counterService.getAutoCounter());
    // 3. Use cases https://angular.dev/guide/signals#use-cases-for-effects
    effect(() => {
      console.log(`Counter: ${this.counter()}, twice: ${this.twice()}.`);
      // 4. What if we don't want to trigger the effect on every auto count?
      console.log(`Auto counter: ${untracked(this.autoCounter)}`);
    });
  }

  public ngOnInit(): void {
    // 5. effect outside of constructor https://angular.dev/guide/signals#injection-context
    //effect(
    //  () => {
    //    console.log('ngOnInit');
    //    this.counter();
    //  },
    //  { injector: this.injector },
    //);
  }

  public increase(): void {
    this.counter.set(this.counter() + 1);
  }

  public decrease(): void {
    this.counter.set(this.counter() - 1);
  }

  // 6. Alternative solution for 5.
  public gimmeLogonTwiceChange = effect(() => {
    this.twice();
    console.log('LOG');
  });

  // 7. equality funcitons and change triggers
  public randomArray = signal(['kiskacsa'], { equal: isEqual });

  public setToSame(): void {
    //this.counter.set(1);
    const newArray = ['kiskacsa'];
    this.randomArray.set(newArray);
  }

  //public setToSameEffect = effect(() => {
  //  //this.counter();
  //  this.randomArray();
  //  console.log('TRIGGER');
  //});

  // 8. effect cleanup
  public cleanupExampleEffect = effect((onCleanup) => {
    const count = this.counter();
    const timeout = setTimeout(() => {
      console.log(`delayed counter change log: ${count}`);
    }, 1000);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
