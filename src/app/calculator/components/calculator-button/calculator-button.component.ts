import { ChangeDetectionStrategy, Component, HostBinding, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  //Con esta propiedad agregamos los estilos a nuestro componente y cuando lo mandemos a llamr siempre lo respetara
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  },
  // Esta puede ser otra opcion
  // encapsulation: ViewEncapsulation.None
})
export class CalculatorButtonComponent {

  public isCommand = input(false, {
    transform: ( value: boolean | string ) =>
      typeof value === 'string' ? value === '' : value
  });

  public isDoubleSize = input(false, {
    transform: ( value: boolean | string ) =>
      typeof value === 'string' ? value === '' : value
  });

  //Este decorador tiene el acceso y todas las propiedades del host en el decorador @Component
  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  //  Este decorador tiene el acceso y todas las propiedades del host en el decorador @Component
  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }
 }
