import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  //Con esta propiedad agregamos los estilos a nuestro componente y cuando lo mandemos a llamr siempre lo respetara
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  }
})
export class CalculatorButtonComponent { }
