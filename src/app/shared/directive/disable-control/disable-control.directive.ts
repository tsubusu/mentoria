import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl]'
})
export class DisableControlDirective implements OnChanges {
  /*
  Repare que o nome dessa propriedade é o mesmo nome da diretiva. Isso me permite agora, meu código voltou a compilar, porque estou usando a diretiva e ao mesmo tempo como a diretiva é o mesmo nome da propriedade, consigo com uma única marcação adicionar a diretiva e a propriedade nova que quero colocar.
  */
  @Input() appDisableControl = false;
  constructor(private ngControl: NgControl) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appDisableControl']) {
      const action = this.appDisableControl ? 'disable' : 'enable';
      this.ngControl && this.ngControl.control && this.ngControl.control[action]();
    }
  }

}
