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
  //saber quantos ids foram gerados
  private numberOfGereneratedIDs = 0;
  // começa com letra maiúscula ou minúscula, e se é seguido de hífen e depois vem qualquer outra coisa depois desse hífen, pode ser número que vem depois de hífen, pode ser letra, não importa
  private validID = /^[A-Za-z]+[\w\-\:\.]*$/;

  constructor() { }

  public generateUniqueIDWithPrefix(prefix: string): string {
    //if (!prefix) { //e o prefixo que você passou, não tem prefixo, eu vou fazer uma coisa que chamamos de fail fast, eu vou falhar rápido com uma mensagem para o desenvolvedor dizendo que throw Error(‘Prefix can not be empty’);
    if (!prefix || !this.validID.test(prefix)) {
      throw Error('Prefix can not empty');
    }

    const uniqueID = this.generateUniqueID();
    this.numberOfGereneratedIDs++;
    return `${prefix}-${uniqueID}`;
  }

  public getNumberOfGeneratedUniqueIDs(): number {
    return this.numberOfGereneratedIDs;
  }

  private generateUniqueID(): string {
    return uuid.v1();
  }
}
