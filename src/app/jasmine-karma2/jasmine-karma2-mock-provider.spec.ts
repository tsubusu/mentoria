import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoBoardService } from '@shared/componentes/photo-board/services/photo-board.service';

import { JasmineKarma2Component } from './jasmine-karma2.component';
import { JasmineKarma2Module } from './jasmine-karma2.module';
import { HttpClientModule } from '@angular/common/http';
import { buildPhotoList } from '../shared/componentes/photo-board/test/build-photo-list';
import { of, Observable } from 'rxjs';
import { Photo } from '@shared/componentes/photo-board/interfaces/photo';
import { PhotoBoardMockService } from '@shared/componentes/photo-board/services/photo-board-mock.service';

fdescribe(JasmineKarma2Component.name + ' Mock Provider', () => {
  let component: JasmineKarma2Component;
  let fixture: ComponentFixture<JasmineKarma2Component>;

  // O Angular vai ser inteligente para criar uma instância desse seu serviço durante o seu teste. Então essa abordagem é legal quando você quer subscrever só um método, que você quer mockar, quando você tem uma classe de mock que você quer reutilizar várias vezes, você pode ter o seu conjunto de mocks dentro da sua aplicação
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ JasmineKarma2Module, HttpClientModule ],
      providers: [{
        provider: PhotoBoardService,
        // useValue: { uma das maneiras de se fazer o uso do mock provider
        //   getPhotos(): Observable<Photo[]> {
        //     return of(buildPhotoList());
        //   }
        // }
        useClass: PhotoBoardMockService
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JasmineKarma2Component);
    component = fixture.componentInstance;
  });

  it('(D) Should display loader while waiting for data', () => {
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should not display board').toBeNull();
    expect(loader).withContext('Should display loader').not.toBeNull();
  });

});
