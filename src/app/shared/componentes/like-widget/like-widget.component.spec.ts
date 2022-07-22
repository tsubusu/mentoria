import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

fdescribe('LikeWidgetComponent', () => {
  let component: LikeWidgetComponent;
  let fixture: ComponentFixture<LikeWidgetComponent>;

  //Antes de cada teste...
  beforeEach(async () => {
    //Cria um módulo para o meu teste, um módulo que declare o componente que eu quero testar.
    //Suas configurações são as mesmas que um componente comum, ver o modulo do componente para verificar oq ele espera ser usado
    await TestBed.configureTestingModule({
      //le é praticamente idêntico ao módulo, se eu tenho o módulo, eu tenho o declarations: quem vai fazer parte desse declaration? O (LikeWidgetComponent) sabemos que o LikeWidgetComponent tem template, tem ts
      //Foi substituido por imports:[LikeWidgetModule] porém é a abordagem correta para TEST FIRST
      //declarations: [ LikeWidgetComponent ] ,
      //providers: [UniqueIdService],
      //imports: [FontAwesomeModule]

      imports: [LikeWidgetModule] //para testes legados
    })
      // compileComponents ele retorna uma Promise, ele retornando uma Promise, eu posso fazer a await esperar essa Promise ifser resolvida, mas para que isso aqui aconteça eu tenho que estar aqui dentro desse bloco async
      .compileComponents();
    //compileComponents ele está dizendo assim, “Oh TestBed, na hora que você for trabalhar com esse likeWidgetComponent eu vou esperar esse componente ser compilado, resolver o template dele, gerar o componente, e quando estiver tudo pronto eu vou deixar o teste continuar.”
    //compileComponents, ele vai aguardar a compilação do seu componente do ts mais o template, porque o Angular por debaixo dos panos

    //wrapper, é um cara que embrulha o componente que foi criado e te dá um monte de funções, um monte de métodos utilitários que você vai usar durante o teste
    //fixture, ou seja, é tudo aquilo, é toda fixture, criada para te permitir testar o componente
    //ixture é para tudo aquilo que vai te ajudar a revisar o teste, toda a burocracia. E esse cara aqui é um ComponentFixture< do tipo, usando a generic LikeWidgetComponent>
    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;

    //Sem ele os ciclos de vidas não são ativados como ex: OnInit
    //Caso não funcione corretamente utilizar diretamente no teste quando for necessario ativar algum ciclo de vida.
    //porque não usar? porque você não vai ter chance de passar valores para as inputs properties do seu componente, antes que o ngOnInit dispare outras etapas do ciclo de vida de Angular.
    //fixture.detectChanges();
  });

  //Teste para verificar se o component esta OK
  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  //it('Should auto generate ID when id input property is missing', () => {
  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });


  //it('Should NOT generate ID when id input property is present', () => {
  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someID = 'someID';
    component.id = someID;
    fixture.detectChanges();
    expect(component.id).toBe(someID);
  });

  //Teste de Output()
  // texto antes de refatorar should trigger emission when called
  it(`#${LikeWidgetComponent.prototype.like.name}
  should trigger (@Output liked) when called`, done => {
    //para disparar o ciclo de vida lá do Angular, o ngOnInit vai ser disparado
    fixture.detectChanges();
    //Output() por debaixo dos panos esse cara é um observable.
    component.liked.subscribe(() => {
      //preparar uma ação, toda vez que o liked for disparado e quem é que vai disparar essa emissão aqui, quando eu chamar o método like, porque o método like é o cara que chega no liked.emit();, quando esse cara aqui é disparado, o subscribe() aqui automaticamente vai ser chamado e eu posso executar um código
      //Um código para testar se o meu teste está passando ou não, então eu vou fazer aqui, expect() eu não estou esperando nada, só vou dizer que expect(true).toBeTrue();
      expect(true).toBeTrue();
      done(); // done ele ajuda a você realizar os tipos testes assíncronos, e por aí vai, só que o nosso escopo aqui é bem pequeno, nós não vamos usar o done para resolver problemas mais sérios de coisas assíncronas.
    });

    //O teste só passará quando o like for executado e por consequencia executar o subscribe acima.
    component.like();
  });

  //Teste de Output()2
  //Eu vou introduzir agora, bem cedo, um recurso muito poderoso de testes, que não é exclusivo do Angular, está dentro do Jasmine, que é um cara que ele vai espionar para nós, ele vai se infundir com o código que escrevemos, para saber se esse método, emit da minha output property, é chamado ou não
  it(`#${LikeWidgetComponent.prototype.like.name}
  should trigger emission when called`, () => {
    // O spy é um cara que ele vai fazer o seguinte ele vai possuir essa função, esse método emit, vai substituir o método emit com ele, mas pra quando o emit for chamado, quem vai ser chamado é o spy, mas o spy por debaixo dos panos vai guardar uma referência por um emit original.
    //Então entre a chamada do spy que agora é o meu emit e o emit verdadeiro, tem um meio de campo que o spy vai avisar o Jasmine, vai levantar uma flag dizendo que esse método foi o que? Foi chamado.
    spyOn(component.liked, 'emit');
    fixture.detectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });


  //Exemplo para test first
  it('#grita shoud return true when called', () => {
    //criar o teste primeiro para dps criar o metodo dentro do component
    expect(component.grita()).toBeTruthy();
  });

  //Exemplo teste integração com o DOM 
  it(' (D) Shoud display number of likes when clicked', done => {
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counterEl: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterEl.textContent?.trim()).toBe('1');
      done();
    });

    const likeWidgetContainer: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    likeWidgetContainer.click();
  });

  //Exemplo teste integração com o DOM 
  it(' (D) Shoud display number of likes when Enter key is pressed', done => {
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counterEl: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterEl.textContent?.trim()).toBe('1');
      done();
    });

    const likeWidgetContainer: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    const event = new KeyboardEvent('keyup', { key: 'Enter' }); //é um evento específico de quando você está trabalhando com keyboard
    likeWidgetContainer.dispatchEvent(event); //Não existe um método chamado key press F diferente do click, do blur, isso tudo, então o que queremos fazer agora é despachar um evento
  });
});
