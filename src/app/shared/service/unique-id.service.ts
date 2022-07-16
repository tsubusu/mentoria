import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

/*
  Para que server esse serviço 'wrapper'?
  Se der um problema e você tiver que fazer a troca dessa biblioteca, você vai ter que trocar em todos os lugares desse componente, porque você vai ter que trocar o import e chamar a nova API.
  O que vamos criar agora para evitar isso, como é uma coisa muito importante para os nossos componentes, vou isolar dentro de um wrapper, de um serviço que vai gerar o id para nós.
  Se no futuro eu precisar trocar uma biblioteca que gera esses ids únicos para mim, só troco nesse serviço e todos os meus componentes vão ficar intactos. Estamos tentando nos blindar contra as mudanças de bibliotecas externas
*/

@Injectable({ providedIn: 'root' })
export class UniqueIdService {

  constructor() { }

  public generateUniqueIDWithPrefix(prefix: string): string {
    const uniqueID = this.generateUniqueID();
    return `${prefix}-${uniqueID}`;
  }

  private generateUniqueID(): string {
    return uuid.v1();
  }
}
