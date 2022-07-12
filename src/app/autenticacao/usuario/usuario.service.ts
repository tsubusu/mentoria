import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
import { User } from '@shared/model/user.model';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private tokenService: TokenService) {
      if (this.tokenService.possuiToken()) {
        this.decodificarJWT();
      }
   }
  private $usuarioSubject = new BehaviorSubject<User>({}); // armazena os seus estados 'cria um historico'

  private decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const usuario = jwt_decode(token) as User;
    this.$usuarioSubject.next(usuario);
  }

  public retornarUsuario(): Observable<User> {
    return this.$usuarioSubject.asObservable(); //retorna como observable para não ser possivel manipular
  }

  public salvarToken(token: string): void {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  public logout():void {
    this.tokenService.excluirToken();
    this.$usuarioSubject.next({});
  }

  public estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }
}
