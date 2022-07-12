import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public retornarToken(): string {
    return localStorage.getItem(KEY) ?? ''; // ?? significa se isso for undefined passe nesse caso vazio
  }

  public salvarToken(token: string): void {
    localStorage.setItem(KEY, token);
  }

  public excluirToken(): void {
    localStorage.removeItem(KEY);
  }

  public possuiToken(): boolean {
    return !!this.retornarToken();
  }
}
