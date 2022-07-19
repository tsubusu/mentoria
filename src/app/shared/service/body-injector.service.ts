import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyInjectorService {

  //ApplicationRef => Quando injetado nos fornece uma referência para a instância da aplicação que esta carregada no navegador.
  constructor(private appRef: ApplicationRef) { }

  //é um método que eu vou passar para ele um ComponentRef, que eu não sei qual é, pode ser qualquer tipo de ComponentRef, vou importar no core. Pode ser de um modal, se depois eu quiser adicionar outro elemento dinamicamente que não é um modal, não importa, por isso que o tipo é <any>
  //É o stackBeforeAppRoot que eu passo o componentRef e é ele que vai adicionar esse ComponentRef antes do meu app-root. Então como é que vai ser a implementação dele? Eu preciso no final, um elemento do DOM, para que eu possa adicionar antes de app-root. Essa parte é a mais nervosa o código, então o que eu vou fazer? Eu vou isolar essa parte, por enquanto, vou criar um método privado, private createDomElement():, ele vai me retornar um HTMLElement, qualquer um, que é um fragmento do DOM e o createDomElement vai retornar null por enquanto
  //stackBeforeAppRoot passa um componentRef, dele eu tenho que pegar o elemento do DOM, do domElement e elemento do DOM, que está ligado com todo o mecanismo de detecção do Angular, com o framework do Angular, eu quero adicioná-lo antes do app-root. Não importa onde eu vou adicioná-lo, porque o Angular tem uma referência para ele e ele vai continuar controlando isso
  public stackBeforeAppRoot(componentRef: ComponentRef<any>): void {
    const domElement = this.createDomElement(componentRef);
    //document.body.querySelector e vou pedir para pegar o app-root. Então nessa linha eu tenho uma referência para o elemento do DOM <app-root></app-root>
    const appRoot = document.body.querySelector('app-root');

    //document.body.insertBefore(), inserir antes, esse elemento do DOM que e o meu modal, insere ele antes de quem? app-root
    document.body.insertBefore(domElement, appRoot);
  }

  //Eu estou dentro do meu createDomElement, então eu vou passar o meu componentRef para ele também. Então qual é o primeiro passo que temos que fazer? Eu vou chegar para o meu this.appRef, que a minha aplicação do Angular está rodando e vou falar assim, “Camarada, anexa dentro de você uma view nova que eu estou criando
  //componentRef é um wraper que dentro dele eu tenho a instância da classe modalComponent e também tenho o hostview, que é o *template associado aquele componente
  private createDomElement(componentRef: ComponentRef<any>): HTMLElement {
    //então vou chegar para o ApplicationRef e vou pedir para ele attachView. Quem é a view que eu quero atachar? É o componentRef? Não! Muita atenção
    //O componentRef é um wraper que tem dentro dele a instância do meu componente, ou seja, a classe, a instanciada do meu componente modalComponent. Só que ele também tem a hostview, que é o template desse componente. O que eu quero atachar na view é a view do meu componente
    this.appRef.attachView(componentRef.hostView);
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>)// Se você ver que o EmbededViewRef<c> extends ViewRef{. Então o polimorfismo pode ser tratado como um ViewRef e se eu volto para o meu hostView ele é um ViewRef
                        .rootNodes[0] as HTMLElement; //.rootNodes [0] as HTMLElement;. Então isso é o elemento do DOM que eu vou retornar, domElement
                        //hostview é uma coisa genérica, esse tipo view. Por debaixo dos panos, rodando em run time, tem uma implementação para ele rodando em run time
                        //a implementação dele rodando em run time é o que chamamos de embeddedViewRef
                        //Eu preciso tratar o hostView com EmbeddedViewRef por quê? Porque o hostView não me dá acesso ao nó que representa ele no DOM
    return domElement;
  }
}
