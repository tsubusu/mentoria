import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoBoardService } from '@shared/componentes/photo-board/services/photo-board.service';

import { JasmineKarma2Component } from './jasmine-karma2.component';
import { JasmineKarma2Module } from './jasmine-karma2.module';
import { HttpClientModule } from '@angular/common/http';
import { buildPhotoList } from '../shared/componentes/photo-board/test/build-photo-list';
import { of, Observable } from 'rxjs';
import { Photo } from '../shared/componentes/photo-board/interfaces/photo';

fdescribe(JasmineKarma2Component.name, () => {
  let component: JasmineKarma2Component;
  let fixture: ComponentFixture<JasmineKarma2Component>;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ JasmineKarma2Module, HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JasmineKarma2Component);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoBoardService);//injetar o service para dps mockar ele
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Exemplo de teste mockando o service
  it('(D) Should display board when data arrives', () => {
    const photos = buildPhotoList();
    //preciso de uma lista de fotos, então eu vou colocar const photos = buildPhotosList(), peguei uma lista de fotos. Agora eu vou pedir auxílio ao nosso amigo spy mais uma vez. spyOn(service,getPhotos), só que eu não quero só espionar o getPhotos, eu quero que quando você for chamado, eu quero você retorne um valor no seu lugar
    //
    spyOn(service, 'getPhotos')
      .and.returnValue(of(photos));

    //fixture.detectChanges só pode ser chamado depois que eu modificar o meu spy
    // Eu tenho que fazer essa mudança no spy, modificar o comportamento, porque se eu chamar o fixture.detectChanges primeiro, o ngOnInit vai ser disparado sem que o serviço tenha sido modificado. Então é por isso que eu tenho que chamar o fixture.detectChanges só depois de modificar o serviço
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should display board').not.toBeNull();
    expect(loader).withContext('Should not display loader').toBeNull();
  });

  it('(D) Should display loader while waiting for data', () => {
    spyOn(service, 'getPhotos')
      .and.throwError;

    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should not display board').toBeNull();
    expect(loader).withContext('Should display loader').not.toBeNull();
  });

});
