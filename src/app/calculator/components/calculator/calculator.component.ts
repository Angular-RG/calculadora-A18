import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

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

  private calculatorService = inject(CalculatorService);

  // *El viewChildren es similar al viewchild la diferencia es
  // *que optiene todos los componentes de nuetro dom segun se las indiquiemos
  public calculatorButtons = viewChildren( CalculatorButtonComponent );

  // Computed es propio de Angular y es quien nos ayudara a leer los signals
  public resultText = computed( () => this.calculatorService.resultText() );
  public subResultText = computed( () => this.calculatorService.subResultText() );
  public lastOperator = computed( () => this.calculatorService.lastOperator() );

  //Obtener la data del signal de forma tradicional con un Get
  // get resultText(){
  //   return this.calculatorService.resultText();
  // }

  handleClick( key: string): void {
    this.calculatorService.constructNumber(key);
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
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      Enter: '=',
      '*': 'x',
      '/': '÷'
    }

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;
    this.handleClick(keyValue);
    this.calculatorButtons().forEach( button => {
      button.keyBoardPressedStyle(keyValue);
    });

  }
}
