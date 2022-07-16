import { ContentChildren, Directive, HostListener, QueryList } from '@angular/core';
import { KeyboardManagerItemDirective } from './keyboard-manager-item.directive';

/*
@ContentChildren
Usado para obter uma QueryList de elementos ou diretivas do conteúdo DOM. Sempre que um elemento filho é adicionado, removido ou movido, a lista de consulta será atualizada e as alterações observáveis ​​na lista de consulta emitirão um novo valor.
*/

@Directive({
  selector: '[appKeyboardManager]'
})
export class KeyboardManagerDirective {

  constructor() { }
  //O ContentChildren vai fazer o seguinte. Busca todo mundo que é filho do elemento no qual a diretiva KeyboardManagerDirective faz parte, pega todos esses filhos e traz para mim apenas aqueles que têm a diretiva KeyboardManagedItemDirective
  //Em outras palavras, estou dizendo “injeta todo mundo da diretiva KeyboardManagedItemDirective dentro do meu KeyboardManagedDirective. E o que é uma QueryList do angular? Essa QueryList é muito bonita, essa QueryList vai ter uma lista com uma referência de todas essas diretivas que ele encontrar, no caso só temos dois botões, o button yes e o button no.
  //a beleza da QueryList é que se você tem um conteúdo dinâmico, se alguém adiciona um novo item ou você está usando ngFor para gerar dinamicamente itens, essa QueryList é atualizada dinamicamente
  @ContentChildren(KeyboardManagerItemDirective) public items!: QueryList<KeyboardManagerItemDirective>;

  /*
  Como consigo fazer esse manageKeys escutar o evento key up do elemento no qual a minha diretiva foi adicionada? Conseguimos isso através do hostListener
  */
  @HostListener('keyup', ['$event'])
  public manageKeys(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        console.log(this.items);
        this.moveFocus(ArrowDirection.RIGTH).focus();
        break;
      case 'ArrowDown':
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
      case 'ArrowLeft':
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
      case 'ArrowRight':
        this.moveFocus(ArrowDirection.RIGTH).focus();
        break;
    }
  }

  private moveFocus(direction: ArrowDirection): KeyboardManagerItemDirective {
    const items = this.items.toArray();
    const currentSelectIndex = items.findIndex(item => item.isFocused());
    const targetElementFocus = items[currentSelectIndex + direction];

    if (targetElementFocus) {
      return targetElementFocus;
    }

    return direction === ArrowDirection.LEFT 
      ? items[items.length -1]
      : items[0];
  }
}

enum ArrowDirection {
  LEFT = -1,
  RIGTH = 1
}