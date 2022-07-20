import { TestBed } from '@angular/core/testing';

import { UniqueIdService } from './unique-id.service';
//o Karma, ele é um executor de testes, um test runner criado pela própria equipe do Angular, lá desde a época do Angular.js



//describe(‘O artefato que queremos testar’, () => {});
fdescribe(UniqueIdService.name, () => {
  let service: UniqueIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueIdService);
  });

  //e você quer testar, você quer assumir que alguns critérios, e cada critério seu do teste, você executa dentro dessa função it() então como parâmetro vou botar aqui Primeira condição que queremos testar, e essa função it()
  //ela precisa descrever o que você está testando no escopo desse artefato, normalmente você vai usar como descrição dessa função It() é você está testando métodos de um componente ou funções e por aí vai
  //pode ter quantas funções its você quiser, só trocando o parâmetro como segunda condição, quantas condições você quiser para testar esse artefato
  //o # é opcional
  it(`#${UniqueIdService.prototype.generateUniqueIDWithPrefix.name} 
  should generate id when called with prefix`, () => {
    const id = service.generateUniqueIDWithPrefix('app');

    expect(id.startsWith('app-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIDWithPrefix.name} 
  should not generate duplicate ids when called multiple times`, () => {
    //set, ele não aceita elementos duplicados, se eu for colocar uma string ai dentro, ele não aceita uma string duplicada, se eu adicionar uma string duplicada, ele vai ignorar a adição dessa string.
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIDWithPrefix('app'));
    }

    // expect(true).toBeTrue(); só funciona para tipo literal true. n pode ser a instancia de boolean
    // expect(new Boolean(true)).toBe(new Boolean(true)); dara erro pq ele compara a posicao da memoria no caso de objetos
    // expect(true).toBeTruthy(); este é o mais generico.

    expect(ids.size).toEqual(50);

    //não ser igual
    //expect(firstID).not.toBe(secondID);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIDWithPrefix.name} 
  should throw when called with empty`, () => {
    const emptyValues = [null, undefined, '', '0', '1'];
    emptyValues.forEach(emptyValues => {
      //quando você está chamando um método e você quer testar se ele lança uma exceção ou não, você tem que chamar esse método dentro de uma função, então após o expect(() =>
      expect(() => service.generateUniqueIDWithPrefix(emptyValues as string))
        .withContext(`Empty value: ${emptyValues}`) // adiciona o contexto do erro ao log para facilitar a identificação
        .toThrow();
    })
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIDs.name} 
  should return the number of generatedIDs when called`, () => {
    service.generateUniqueIDWithPrefix('app');
    service.generateUniqueIDWithPrefix('app');
    const numerOfIDs = service.getNumberOfGeneratedUniqueIDs();

    expect(numerOfIDs).toBe(2);
  });
});

//blablabla should blablabla when blablabla
//o Jasmine que é um behavior-driven de framework de teste, ele diz o seguinte, 
//alguma coisa deve fazer algo quando determinadas condições estiverem presente.
