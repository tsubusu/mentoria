import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector, TemplateRef } from '@angular/core';
import { BodyInjectorService } from '@shared/service/body-injector.service';
import { ModalComponent } from '../modal.component';

@Injectable()
export class ModalService {
  /*
    O método open de ModalService é o responsável pela criação de ModalComponent. Seu retorno será um ModalRef, uma referência para o componente criado que permite o desenvolvedor fechá-lo. Uma instância de ModalRef possui apenas o método close.
    A API pública do nosso modal terá apenas dois métodos, facilitando assim seu entendimento e uso por parte de outros desenvolvedores.
  */


  /*
    Eu não preciso colocar o this porque agora pega o componentFactoryResolver. E esse resolveComponentFactory vai me retornar uma fábrica para criar ModalComponent. Para efeito de cache, eu poderia chamar a linha componentFactoryResolver.resolverComponentFactory(ModalComponent); dentro do open, mas toda hora dentro do open eu ia pedir para ele criar uma fábrica e criar um ModalComponent, uma fábrica e criar um ModalComponent
    Então eu vou cachear o retorno dessa linha, eu vou colocar em uma variável privada da minha classe, que eu vou chamar de componentFactory, eu vou chamar ComponentFactory e ele vai ser do tipo ModalComponent
    componentFactoryResolver não é a fábrica que vai criar o componente dinamicamente para você, ele é um construtor de fábrica para o componente que você passar como parâmetro no resolveComponentFactory. Aí sim, é o componentFactory que está aqui, que se eu pedir para ele, só sabe criar o quê? ModalComponent
    ComponentFactoryResolver => Ele é capaz de criar fábricas responsáveis pela criação dinâmica de componentes. Cada fábrica criada pode criar quantos componentes daquele tipo de fábrica.


    O ComponentRef é um artefato com Angular que encapsula uma instância do componente criado dinamicamente. Já ModalRef é uma criação nossa que encapsula um ComponentRef possuindo apenas o método close sem export a referência para o desenvolvedor cliente da nossa API.
  */
  private componentFactory!: ComponentFactory<ModalComponent>;

  constructor(componentFactoryResolver: ComponentFactoryResolver,
      private injector: Injector,
      private bodyInjectorService: BodyInjectorService
    ) { 
    this.componentFactory = componentFactoryResolver.resolveComponentFactory(ModalComponent);
  }

  public open(config: ModalConfig): ModalRef {
    const componentRef = this.createComponentRef();

    //o retorno desse ModalRef eu vou guardar em uma variável chamada componentRef. Se você olhar o tipo que ele está te dando, o retorno de create é um componentRef. Nesse momento eu tenho criado no angular o componente, mas ele ainda não faz parte do DOM, ele está desatachado, ele está desconectado do DOM
    //componentRef.instance.modalConfig.templateRef;
    //componentRef.instance essa é a instância do componente que está sendo criado. Tanto isso é verdade, que se eu der dot, ele mostrou o modalConfig, title e templateRef. Porque essa instance é o meu modal.component, ele tem a propriedade config

    //Então por isso que ele não retorna diretamente a instância que queremos trabalhar. Então está aqui. E por falar aonde eu quero adicionar esse componentRef, eu preciso passar o que para ele como parâmetro primeiro? Eu posso dizer para ele que o documentRefInstance vai receber um config
    componentRef.instance.modalConfig = config;
    console.log(componentRef.instance);
    console.log('open called');

    this.bodyInjectorService.stackBeforeAppRoot(componentRef);

    //Sabemos que o componentRef é um wraper, que dentro dele tem um ModalComponent. Então é verdade que a propriedade instance é a instância de ModalComponent. E através de componentRef.destroy que eu destruo esse componente. Se esse componente estiver na view, a view é destruída junto com ele
    //Então o que está faltando eu fazer agora? É passar o meu componentRef no construtor do meu modal
    return new ModalRef(componentRef);
  }

  private createComponentRef(): ComponentRef<ModalComponent> {
    //this.componentFactory.create() e pedir para ele criar para mim uma componentRef, uma referência para o componente, que dentro dele vai ter uma instância de modal para que eu possa trabalhar com ele
    //Só que esse método create, se você olhar os parâmetros, ele precisa de um injector. Por quê? Porque essa fábrica que está preparada para criar dinamicamente um componentRef, uma referência que contenha a instância do componente que eu quero trabalhar para que ele funcione, ele precisa injetar esse componente. Então o meu create precisa de uma referência do injector do angular para funcionar
    //Agora o meu create vai pegar carona nesse injector, ele vai usar a injeção de dependência internamente, porque o injector é o responsável por injeção no angular. Para que é esse componente?
    //” Não é isso que eu quero, galera. Eu quero tirar isso dinamicamente, não faz sentido. Por isso que o create depende de um injector para saber de onde ele vai pegar esse componente.    
    return this.componentFactory.create(this.injector);
  }
}

// ModalConfig. Ele não diz respeito só ao modal.service, ele vai ser usado pelo modal.service, pelo modal.component, ou seja, não é algo que só pertence ao modal.service, então para importar esse ModalConfig, estou tendo que importa-lo do módulo modal.service. Eu não quero ter essa dependência, mesmo que seja só para importar o ModalConfig do modal.service
// Fica uma regra para vocês. Se essa interface só faz sentido ser acessada dentro de modal.service, você declara dentro de modal.service e não coloca o export. Porque só faz sentido se eu usar dentro do modal.service. Mas se faz sentido ser usada de fora, você vai pegar o export interface ModalConfig { e vai criar dentro de modal, eu vou criar uma outra pasta que eu vou chamar de interfaces. E todas as interfaces desse componente eu vou criar aqui dentro, eu vou criar o modal-config.ts
// não farei pois estou com preguiça
export interface ModalConfig {
  templateRef: TemplateRef<any>;
  title: string;
}

export class ModalRef {
  //vou ter o meu construtor e agora na hora que eu chamar o close, quem eu vou chamar? Pedir para fechar o meu modal, destruir? É o componentRef que eu passei como parâmetro. Por isso que o nosso ModalRef era importante
  constructor(private componentRef: ComponentRef<ModalComponent>) {
  }

  public close(): void {
    console.log('close called');
    //Quando eu chamo esse método destroy do componentRef, significa que ele vai chamar o destroy do meu componente. Então esse componentRef é um wraper da instância do componente que queremos trabalhar, mas para que eu possa pegar ele, eu quero exibir em determinado lugar da view, então você pega o componentRef e exibe no determinado lugar da view. “Quero destruir ele”, você chama o componentRef, que automaticamente quando você chamar o destroy, esse componente que você adicionou na view em algum lugar da sua página vai ser destruído
    this.componentRef.destroy();
  }
}
