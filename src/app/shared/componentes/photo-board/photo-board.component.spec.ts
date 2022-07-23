import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Photo } from './interfaces/photo';

import { PhotoBoardComponent } from './photo-board.component';
import { PhotoBoardModule } from './photo-board.module';
import { Component, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { buildPhotoList } from './test/build-photo-list';


fdescribe(`#${PhotoBoardComponent.name}`, () => {
  let component: PhotoBoardComponent;
  let fixture: ComponentFixture<PhotoBoardComponent>;

  //teste de OnChanges com dummy component
  let fixtureDummy: ComponentFixture<PhotoBoardTestComponent>;
  let componentDummy: PhotoBoardTestComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoBoardTestComponent],
      imports: [PhotoBoardModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;

    fixtureDummy = TestBed.createComponent(PhotoBoardTestComponent);
    componentDummy = fixtureDummy.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Exemplo de teste com component com OnChanges
  it('Should display rows and columns when (@Input photos) has value', () => {
    component.photos = buildPhotoList();
    //E na hora que eu for fazer o meu teste, eu vou fazer component.detectChanges, que é a primeira coisa que eu vou fazer, mas primeiro eu vou atribuir, porque o detectChanges é disparado depois que eu recebo os valores da minha input property, então quero setar antes, não quero que o ngOnInit rode antes, eu quero setar antes do ngOnInit
    fixture.detectChanges();

    //a única maneira do ngOnChanges funcionar e ser chamado é se a propriedade do seu componente está sendo referenciada através de um template
    const change: SimpleChanges = {
      photos: new SimpleChange([], component.photos, true)
    };
    component.ngOnChanges(change);

    expect(component.rows.length)
      .withContext('Number of rows')
      .toBe(2);

    expect(component.rows[0].length)
      .withContext('Number of rows')
      .toBe(4);

    expect(component.rows[1].length)
      .withContext('Number of rows')
      .toBe(4);
  });

  //Exemplo de teste com component com OnChanges com dummy-component
  it('Should display rows and columns when (@Input photos) has value test with dummy-component', () => {
    componentDummy.photos = buildPhotoList();
    fixtureDummy.detectChanges();

    expect(componentDummy.board.rows.length)
      .withContext('Number of rows')
      .toBe(2);

    expect(componentDummy.board.rows[0].length)
      .withContext('Number of rows')
      .toBe(4);

    expect(componentDummy.board.rows[1].length)
      .withContext('Number of rows')
      .toBe(4);
  });


});


//segunda forma de fazer criando um dummy-component
@Component({
  template: `
  <app-photo-board [photos]="photos">
  </app-photo-board>
  `
})
class PhotoBoardTestComponent {
  //Ao invés de eu trabalhar direto com PhotoBoardComponent, eu estou trabalhando dele dentro de outro
  //componente para tê-lo como parte de um template. Como ele faz de um template, toda vez que eu
  //mudar o valor de ‘photos’ do meu componente, automaticamente o ngOnChanges vai ser disparado, 
  //porque o elemento que eu quero testar agora faz parte de um template de outro componente.
  @ViewChild(PhotoBoardComponent) public board!: PhotoBoardComponent;
  public photos: Photo[] = [];
}
