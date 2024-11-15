import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';

@Component({
  selector: 'signal',
  template: `
    <h2>Signals</h2>
    <button (click)="increase()">+</button>
    <button (click)="decrease()">-</button>
    <p>Number: {{ counter() }}</p>
    <p>Twice: {{ twice() }}</p>
    <p>Twice again 1: {{ twice() }}</p>
    <p>Twice again 2: {{ twice() }}</p>
  `,
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsComponent {
  public counter = signal(1);
  public twice = computed(() => this.counter() * 2);

  constructor() {
    effect(() => {
      console.log(this.counter());
      console.log(this.twice());
    });
  }

  public increase(): void {
    this.counter.set(this.counter() + 1);
  }

  public decrease(): void {
    this.counter.set(this.counter() - 1);
  }
}
