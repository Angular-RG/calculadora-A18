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
  // *Esta es la forma recomendada por parte del equipo de Angular
  // !Un componente puede vincular propiedades, atributos y eventos
  // !a su elemento anfitrión. Esto se comporta de forma idéntica a
  // !las vinculaciones a elementos dentro de la plantilla del componente,
  // !pero se define con la hostpropiedad en el @Componentdecorador:
  host: {'(document:keyup)': 'handlerKeyboardEvent($event)'}
  // Esta es otra opcion posible
  // styles: `
  //   .is-command {
  //   @apply bg-indigo-100 bg-opacity-10 hover:bg-opacity-20 text-2xl;
  // }
  // `
})
export class CalculatorComponent {
  handleClick( key: string): void {
    console.log({ key });
  }

  // *Esta es la manera tradicional de interactuar con los dispositivos fisicos del usuario
  // *pero esta ya no es la opcion recomendable por parte del equipo de Angular.
  // !Alternativamente, puede vincularse al elemento host aplicando el decorador
  // !@HostBindingy @HostListener a los miembros de la clase.
  // @HostListener('document:keyup', ['$event'])
  // handlerKeyboardEvent( event: KeyboardEvent ): void {
  //   this.handleClick(event.key)
  // }

  handlerKeyboardEvent( event: KeyboardEvent ): void {

    this.handleClick(event.key)
  }
}
