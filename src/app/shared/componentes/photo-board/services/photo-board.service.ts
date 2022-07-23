import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { Photo } from '../interfaces/photo';
import { map } from 'rxjs/operators';

@Injectable()
export class PhotoBoardService {

  constructor(private http: HttpClient) { }

  //HttpClientTestingModule
  //Esse é o exemplo mais clássico que você vai querer testar isso e vamos ver como. Vamos supor que agora eu tenho uma regra que quando eu pego esse dado do backend, eu vou fazer uma transformação nele, eu quero que toda a descrição, description, que vier do backend, fique em upper case
  //HtppClientTestingModule que vamos trabalhar agora, é mais indicado para esses cenários onde você gera uma transformação nos dados da API que veio do seu backend. E se você gerou uma transformação, é porque é a lógica e você quer garantir que o retorno seja esperado
  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3000/photos')
      .pipe(
        map(photos => {
          return photos.map(
            photo => {
              return {...photo, description: photo.description.toUpperCase()}
            }
          )
        })
      )
      .pipe(delay(2000));
  }
}
