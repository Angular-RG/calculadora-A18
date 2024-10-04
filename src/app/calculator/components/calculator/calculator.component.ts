import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Esta es otra opcion posible
  // styles: `
  //   .is-command {
  //   @apply bg-indigo-100 bg-opacity-10 hover:bg-opacity-20 text-2xl;
  // }
  // `
})
export class CalculatorComponent { }
