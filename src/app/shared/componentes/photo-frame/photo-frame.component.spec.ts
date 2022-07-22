import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

fdescribe(PhotoFrameComponent.name, () => {
  let component: PhotoFrameComponent;
  let fixture: ComponentFixture<PhotoFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });


  //Exemplo para testes que devam ter algo q 'controle' o tempo de uma execução
  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) once when called 
    multiple times within debounce time`, fakeAsync(() => { //O que é esse fakeAsync? Eu passo para dentro dele e recebe como parâmetro dele um bloco de código, que seria o bloco do it, mas eu passo para dentro do fakeAsync
    //E o fakeAsync eu passo como 2º parâmetro da minha função it
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    for (let i = 0; i < 5; i++) {
      component.like();
    }
    // Antes de fazer esse like eu vou pedir um tique no relógio, vou falar para o relógio esperar meio segundo, um tick de relógio. Como é tick de relógio? Então é por isso que existe essa função
    tick(500); //correção para o erro que ocorria. Esse tick dentro de uma área fakeAsync, se eu coloco 500, ele significa que ele vai parar o meu código, a minha execução, por 500 milissegundos, que é meio segundo, então isso vai dar tempo para o meu like processar, porque o debounce dele é de meio segundo.

    // Ocorre um erro => Quando esse segundo like é disparado, a minha linha do expect é executada automaticamente logo em seguida, eu não espero dar o meio segundo para que o like compute e efetivamente incremente no meu time da linha 27
    expect(times).toBe(1);
  }))

  it(`#${PhotoFrameComponent.prototype.like.name}
  should trigger (@Output liked) two times when 
  called outside debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    for (let i = 0; i < 2; i++) {
      component.like();
      tick(500);
    }
    expect(times).toBe(2);
  }))

  //Exemplo de teste integração com o DOM - (D) para identificar o testes de DOM
  it(`(D) Should display number of likes
  when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();// chamei detectChanges de novo para o elemento do DOM ser renderizado com o meu novo valor

    //fixture, que é quem embrulha o componente, Mas ele também é quem tem acesso ao nativeElement, ou seja, o elemento do dom que corresponde a instância do meu elemento. Então com ele eu posso fazer querySelector e vou passar o nome da classe do nosso counter.
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
    expect(element.textContent?.trim()).toBe('1');
  })

  //Exemplo de teste integração com o DOM para verificar se acessibilidade se mantem
  it(`(D) Should update arial-label when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  })

  //Exemplo de teste integração com o DOM para verificar se acessibilidade se mantem
  it(`(D) Should have arial-label with 0 (@Input likes)`, () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  })

  //Exemplo de teste para verificar se src esta OK
  it(`(D) Should display image with src and description when bound to properties`, () => {
    const description = 'some description';
    const src = 'http//somesite.com/img.jpg';
    component.src = src;
    component.description = description;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('img');
    expect(element.getAttribute('src')).toBe(src);
    expect(element.getAttribute('alt')).toBe(description);
  })



});
