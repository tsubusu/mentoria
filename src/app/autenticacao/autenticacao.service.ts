import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'; 
import { Usuario } from '@shared/model/usuario.model';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  url = 'http://localhost:3000/user/';
  constructor(private http: HttpClient,
      private usuarioService: UsuarioService,
    ) { }

  public autenticar(usuario: Usuario): Observable<HttpResponse<any>> { // Pegar todas as informações da requisição 'pegar o header' onde esta o Token
    return this.http.post(`${this.url}login`, 
      { userName: usuario.usuario, password: usuario.senha  },
      { observe: 'response' } //parametro de options -> angular vai recebero body + header da requisição
    ).pipe(
      tap(x => {
        const authToken = x.headers.get('x-access-token') ?? '';  // ?? significa se isso for undefined passe nesse caso vazio
        this.usuarioService.salvarToken(authToken);
      })
    )
  }
}
