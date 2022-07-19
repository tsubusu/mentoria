import { Directive, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Directive({
    selector: '[appFocusTrap]'
})
export class FocusTrapDirective implements AfterViewInit {
    private firstFocusableElement!: HTMLElement;
    private lastFocusableElement!: HTMLElement;

    constructor(private elementRef: ElementRef<any>) {
    }

    //Para fazer uma consulta no DOM e eu vou fazer essa consulta só depois do AfterViewInit, porque eu tenho certeza que minha view está inicializada e os elementos do DOM vão estar lá
    //Você precisa colocar no ngAfterViewInit um seletor scss que vai pegar todo mundo que é passível de ganhar focos.
    public ngAfterViewInit(): void {
        // O meu querySelectorAll vai pegar elemento que tem tabindex, mas que não seja -1, âncoras que não estão desabilitadas, botões que não estão desabilitados, textarea que não está desabilitada, input que não está desabilitado, select que não está desabilitado, textarea que não está desabilitado. Eu acho que eu repeti textarea, vou checar. Não precisa ter dois textarea
        // Esse é um seletor poderoso, que vai pegar todos os elementos que podem ganhar foco, que não sejam uma âncora desabilitada, que não seja um botão desabilitado, que não seja uma textarea desabilitada, que não seja um input desabilitado e que não seja um select desabilitado. Então eu vou passar de novo, caso não esteja na explicação. Tem o tabindex, tem o âncora, botões, textarea e input
        const focusableElements = this.elementRef
        .nativeElement
        .querySelectorAll(`
          [tabindex]:not([tabindex="-1"]),
          a[href]:not([disabled]),
          button:not([disabled]),
          textarea:not([disabled]),
          input:not([disabled]),
          select:not([disabled])`
        ) as Array<HTMLElement>;

        this.firstFocusableElement = focusableElements[0];
        this.lastFocusableElement = focusableElements[focusableElements.length - 1];
        this.firstFocusableElement.focus();
    }

    //@HostListener me permite ouvir eventos a partir do elemento host. E o evento que eu quero ouvir é keydown e quando eu escuto esse evento, eu quero ter acesso ao $event, ou seja, o objeto do evento disparado pelo keydown
    @HostListener('keydown', ['$event'])
    public manageTab(event: KeyboardEvent): void {
        if (event.key !== 'Tab') {
            return;
        }

        if (event.shiftKey && document.activeElement === this.firstFocusableElement) {
            this.lastFocusableElement.focus();
            event.preventDefault(); //, eu não posso deixar o evento tab rolar desse keypress, eu coloco foco no elemento e cancelo, se não o tab vai para o elemento que não é para ir
        } else if (document.activeElement === this.lastFocusableElement) {
            this.firstFocusableElement.focus();
            event.preventDefault();
        } 
    }
}