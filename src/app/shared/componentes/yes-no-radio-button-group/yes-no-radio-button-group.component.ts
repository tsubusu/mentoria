import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UniqueIdService } from '@shared/service/unique-id.service';
/*
Para que nosso yes-no-button-group.component possa se integrar com o form group 
que nós criamos, ele precisa implementar, ele precisa seguir um contrato que o 
nosso form group conhece.

Que contrato é esse? No mundo da programação, se você vem do trabalho com linguagem 
Java ou C#, e o typescript também tem, vem a noção de interface. 
O nosso yes-no-button-group.component tem que implementar uma interface chamada 
control value access. Implementando essa interface nós ganhamos responsabilidade 
de implementar alguns métodos.

Mas como nós que estamos criando esses componentes precisamos 
ter essa responsabilidade de ensinar para o form group, para o 
nosso componente como ele deve se comportar quando for utilizado dentro de um form group

uuid => Gera ids unicos na aplicação

*/

@Component({
  selector: 'app-yes-no-radio-button-group',
  templateUrl: './yes-no-radio-button-group.component.html',
  styleUrls: ['./yes-no-radio-button-group.component.scss'],
  /*
  Estou dizendo que vou prover um ControlValueAccessor através desse injection token. 
  Podem ter outros durante a minha aplicação, por isso quero ter multi. 
  E você vai usar esse cara, você vai utilizar o YesNoButtonGroupComponent, 
  porque ele está implementando o ControlValueAccessor
  */
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    /*
      forwardRef é usado quando o injection token que precisamos referenciar, que é o NG_VALUE
      Eu registrei, mas estou dando um tempo para quando chegar o momento certo eu obter 
      uma referência de YesNoButtonGroupComponent, porque no momento em que estou fazendo 
      esse registro não existe. Então tenho que jogar para a frente, tenho que ter uma 
      referência que ainda está para existir
    */
    useExisting: forwardRef(() => YesNoRadioButtonGroupComponent)
  }]
})
export class YesNoRadioButtonGroupComponent  implements OnInit, ControlValueAccessor {
  @Input() public disabled = false;
  @Input() public value!: string;
  @Input() public label = '';

  @Output() valueChange = new EventEmitter<string>();

  public options = YesNoButtonGroupOptions;
  public onChange = (value: string) => {}; //você precisa dela mesmo com o vazio senão vai dar pau, vai dar erro. 
  public onTouched = () => {};
  public id: string = '';

  constructor(private uniqueIDService: UniqueIdService) { 
    this.id = this.uniqueIDService.generateUniqueIDWithPrefix('yes-no-button-group');
  }
  
  ngOnInit(): void {
  }

  /*
    writeValue é o seguinte. Ele é chamado pela API do formulário para escrever na view quando
    ocorre alguma mudança programática do modelo para a view. Ou seja, quando alguém pede,
    mudei o modelo, tenho que atualizar a view. É esse cara que entra em ação
  */
  public writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }

  /*
   Toda vez que você está modificando com seu writeValue, preciso chegar logo depois e 
   fazer this.onChange e passar o meu valor. Só que você deve estar pensando que o onChange 
   não faz nada. Ele só está declarado inicialmente porque preciso de um valor no início 
   quando o formulário do react form é preparado

   Mas o que acontece mesmo aqui é o seguinte. Esse segundo ponto, que é o registerOnChange 
   recebe como parâmetro uma função, é essa função que em algum momento da inicialização do 
   meu formulário o onChange vai receber. Essa função vai receber quando alguém em algum 
   momento do forms control vai chamar o registerOnChange e vai me dar uma função e eu 
   armazeno essa função para que possa utilizá-la
  */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /*
  registerOnTouched também vai ser uma arrow function que vai ser void. 
  E vou dizer que this.onTouched vai receber essa função mágica do angular. 
  Posso ter algum momento da minha aplicação que faça sentido chamar esse onTouched
  */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /*
  this.disabled recebe isDisabled. Essa informação vai vir do meu form group, 
  é alguma configuração que coloco no meu form group que quando o componente for carregado 
  ele vai automaticamente pegar essa configuração que está no form group, passar para o meu componente e desabilitá-lo.
  */
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public activate(value: string): void {
    /*
    O que acontece é que quando clicamos no meu activate, é quando estou mudando o estado da 
    minha aplicação. Mas esse estado não está sendo propagado para o meu formulário, porque 
    como ele propaga isso para o meu formulário? Através do meu onChange, que notifica que 
    houve uma mudança.
    --- como era antes ---
    this.value = value;
    this.valueChange.emit(this.value);

    Para eu resolver essa coisa, o que vou fazer? Meu activate vai chamar o writeValue e vai 
    passar o value. Como ele está chamando o writeValue ele vai mudar o valor da propriedade 
    do componente que ele tem e ainda vai notificar o angular que ele tem que propagar uma mudança
    */
    this.writeValue(value);
  }
}

enum YesNoButtonGroupOptions {
  YES = 'yes',
  NO = 'no'
}
