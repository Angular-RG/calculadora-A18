import { Injectable, signal } from '@angular/core';

const numberValids = ['0','1','2','3','4','5','6','7','8','9'];
const operatorsValids = ['+','-','*','/'];
const specialOperatorsValids = ['+/-','%','.','=','C','Backspace']

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator= signal('+');

  public constructNumber( value: string ): void {
    //Validar el Input
    if(![...numberValids, ...operatorsValids, ...specialOperatorsValids].includes(value)) return;

    // =
    if(value === '='){
      // TODO: Implementar operacion
      console.log('Calcular Resultado');
      return;
    }

    // Limpiar resultados
    if( value === 'C' ){
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Backspace
    // TODO: Implementar numeros negativos
    if( value === 'Backspace' ){
      if( this.resultText() === '0' ) return;
      if( this.resultText().length === 0 ) {
        this.resultText.set('0');
        return;
      }
      this.resultText.update(currectValue => currectValue.slice(0,-1));
      return;
    }

    //Aplicar Operadores
    if(operatorsValids.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //Limitar número de caracteres
    if(this.resultText().length >= 10){
      return;
    }

    //Validar punto decimal
    if(value === '.' && !this.resultText().includes('.')){
      if(this.resultText() === '0' || this.resultText() === ''){
        this.resultText.set('0.')
        return;
      }
      this.resultText.update( text => text + '.' );
      return;
    }

    //Manejo del cero inicial
    if(value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    //Cambiar signo
    if(value === '+/-'){
      if(this.resultText().includes('-')){
        this.resultText.update(text => text.slice(1));
        return;
      }
      this.resultText.update(text => '-' + text);
      return;
    }

    //Numeros
    if(numberValids.includes(value)) {
      if (this.resultText() === '0'){
        this.resultText.set(value);
        return;
      }
      if(this.resultText() === '-0'){
        this.resultText.set('-'+value);
        return;
      }
      this.resultText.update((text) => text + value);
      return;
    }



  }

}
