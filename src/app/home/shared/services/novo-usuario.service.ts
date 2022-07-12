import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NovoUsuario } from '../model/novo-usuario';
import { take, map, Observable, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {
  private url = 'http://localhost:3000/user/';
  constructor(private http: HttpClient) { }

  public cadastrarNovoUsuario(novoUsuario: NovoUsuario): Observable<any> {
    return this.http.post<Observable<any>>(`${this.url}signup`, novoUsuario);
  }

  public verificarUsuarioExiste(usuario: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}exists/${usuario}`);
  }

  public usuarioJaExiste(): AsyncValidatorFn  {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control?.value && control.value === '') {
        return of(null);
      } 
      return this.verificarUsuarioExiste(control.value).pipe(
        take(1),
        map(res => {
          // if res is true, username exists, return true
          return res ? {usuarioExistente: true} : null;
          // NB: Return null if there is no error
        })
      );
    };
    //Exemplo da aula, porém n funciona
    // return (control: AbstractControl) => {
    //   return control.valueChanges
    //   .pipe(
    //     tap(x => console.log('aqui')),
    //     switchMap(nomeUsuario => this.verificarUsuarioExiste(nomeUsuario)), //recebe uma stream e devolve uma stream
    //     map(usuarioExiste => {
    //       const retorno = usuarioExiste ? {usuarioExistente: true} : null;
    //       return retorno;
    //     }
          
    //     ), //map faz a troca de resultados
    //     first() //encerrar o observable
    //   ).subscribe();
    // }
  }
}
