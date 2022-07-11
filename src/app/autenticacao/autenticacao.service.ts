import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Usuario } from '@shared/model/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  url = 'http://localhost:3000/user/';
  constructor(private http: HttpClient) { }

  public autenticar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.url}login`, {userName: usuario.usuario, password: usuario.senha})
  }
}
