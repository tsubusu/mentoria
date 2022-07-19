import { Directive, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appFocusBack]'
})
export class FocusBackDirective implements OnInit, OnDestroy {
  private lastFocusedElement!: Element | null;

  constructor() { }
  
  public ngOnInit(): void {
    //me diz qual é o elemento que está sendo focado no documento, na página naquele momento. Então antes do meu modal ser renderizado e ele ganhar foco no primeiro elemento, porque ele foi programado para isso, eu pego qual é o elemento anterior que estava com foco.
    this.lastFocusedElement = document.activeElement;
  }
  
  public ngOnDestroy(): void {
    if (this.lastFocusedElement) {
      (this.lastFocusedElement as HTMLElement).focus();
    }
  }
}
