import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError, of } from 'rxjs';
import { Animais, Animal } from '../model/animal.model';
import { TokenService } from '../../../autenticacao/token.service';

const NOT_MODIFIED = '304;'

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient,
      private tokenService: TokenService
    ) { }

  public obterAnimaisDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    // const token = this.tokenService.retornarToken();
    // const headers = new HttpHeaders().append('x-access-token', token);
    // return this.http.get<Animais>(`${environment.apiURL}/${nomeDoUsuario}/photos`, { //Options do http
    //   headers // poderia colocar headers: headers
    // });
    return this.http.get<Animais>(`${environment.apiURL}/${nomeDoUsuario}/photos`);
  }

  public obterAnimalPorID(id: number): Observable<Animal> {
    // const token = this.tokenService.retornarToken();
    // const headers = new HttpHeaders().append('x-access-token', token);
    return this.http.get<Animal>(`${environment.apiURL}/photos/${id}`);
  }

  public excluirAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${environment.apiURL}/photos/${id}`);
  }

  public curtir(id: number): Observable<boolean> {
    return this.http.post(`${environment.apiURL}/photos/${id}/like`, {},
    {
      observe: 'response'
    })
    .pipe(
      map(() => true),
      catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(error);
      })
    );
  }
}
