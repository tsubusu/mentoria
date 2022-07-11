import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NovoUsuario } from '../model/novo-usuario';
import { first, map, Observable, switchMap, tap } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {
  private url = 'http://localhost:3000/user/';
  constructor(private http: HttpClient) { }

  public cadastrarNovoUsuario(novoUsuario: NovoUsuario): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}signup`, novoUsuario);
  }

  public verificarUsuarioExiste(usuario: string): Observable<any> {
    return this.http.get<Observable<any>>(`${this.url}exists/${usuario}`);
  }

  public usuarioJaExiste() {
    return (control: AbstractControl) => {
      return control.valueChanges
      .pipe(
        tap(x => console.log('aqui')),
        switchMap(nomeUsuario => this.verificarUsuarioExiste(nomeUsuario)), //recebe uma stream e devolve uma stream
        map(usuarioExiste => {
          const retorno = usuarioExiste ? {usuarioExistente: true} : null;
          return retorno;
        }
          
        ), //map faz a troca de resultados
        first() //encerrar o observable
      ).subscribe();
    }
  }
}
