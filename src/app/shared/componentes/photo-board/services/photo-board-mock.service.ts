import { Injectable } from '@angular/core';
import { PhotoBoardService } from './photo-board.service';
import { buildPhotoList } from '../test/build-photo-list';
import { Observable, of } from 'rxjs';
import { Photo } from '../interfaces/photo';

// O Angular vai ser inteligente para criar uma instância desse seu serviço durante o seu teste. Então essa abordagem é legal quando você quer subscrever só um método, que você quer mockar, quando você tem uma classe de mock que você quer reutilizar várias vezes, você pode ter o seu conjunto de mocks dentro da sua aplicação
@Injectable()
export class PhotoBoardMockService extends PhotoBoardService {

    public override getPhotos(): Observable<Photo[]> {
        return of(buildPhotoList());
    }
}