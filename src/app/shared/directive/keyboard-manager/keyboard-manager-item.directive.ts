import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appKeyboardManagerItem]'
})
export class KeyboardManagerItemDirective {
  @Output() public focused = new EventEmitter<void>();

  //construtor(private elementRef: ElementRef<HTMLElement>), criei minha diretiva, só preciso importar. Esse elementRef é o cara que é um wrapper, ele embrulha o elemento do DOM original gerenciado por ele
  constructor(private elementRef: ElementRef<HTMLElement>) { }

  //A manipulação do DOM vai estar confinada na diretiva. Então vou chegar e vou criar o método public focus(): void {, que quando for chamado vai chamar this.elementRef.nativeElement.focus()
  public focus(): void {
    this.elementRef.nativeElement.focus();

    //Vou criar uma @Output() public focused, que é quando ganhar o foco, esse cara vai ser um new EventEmitter<void>, ele não vai me retornar nada, só vai emitir, e qual o momento em que sabemos que o elemento está ganhando focus? Dentro da nossa camada do método focus
    this.focused.emit();
  }

  //public isFocused(): boolean, e vou retornar. Como sei se o elemento está focado ou se não está focado? Vou dar return this.elementRef.nativeElement, vou comparar se o nativeElement, que é o elemento do DOM que está sendo gerenciado por essa diretiva é igual ao document.activeElement, do documento
  public isFocused(): boolean {
    return this.elementRef.nativeElement === document.activeElement;
  }
}