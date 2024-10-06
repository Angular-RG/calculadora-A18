import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

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

  // metodo con senales
  public isPressed = signal(false);
  //Esta es la nueva forma en la que Angular nos recomienda hacer las nuevas emisiones
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button')

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

  handleClick(): void {
    if(!this.contentValue()?.nativeElement.innerText) return;
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim())
  }

  public keyBoardPressedStyle( key: string ): void {
    if( !this.contentValue() ) return;

    const value = this.contentValue()!.nativeElement.innerText;
    if(key !== value) return;
    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
 }
