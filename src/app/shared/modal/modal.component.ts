import { Component, HostBinding, OnInit, AfterViewInit } from '@angular/core';
import { fade } from '@shared/animations/fade';
import { ModalConfig, ModalRef } from './services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [fade] //utilizando a animação de face criada dentro de shared animations fade
})
export class ModalComponent implements OnInit, AfterViewInit {
  //@hostBinding, no elemento host vai ganhar a classe show, vai fazer class.show, ou seja, no conjunto de classes dele ele vai ganhar a class.show quando o show for true
  //@HostBinding('class.show') public show = false; aplicar animação // não é a melhor maneira
  
  //Esta forma é pq estamos trabalhando com ComponentRef
  //Para carregar a fade eu vou ter que usar o meu @HostBinding e dentro dele eu vou dizer que para a propriedade @fade eu vou ter um fade = true
  //O que acontece? Eu quero que a animação sempre esteja ligada. Só que para fazer o meu @HostBinding, para o elemento fade estar presente, o meu fade tem que ser true, eu tenho que ter alguma propriedade com true. Então o que eu estou dizendo é, “Para colocar no @HostBinding, eu vou criar um binding o fade com essa propriedade que é sempre true, aí eu vou garantir que esse fade vai aparecer lá no host element do meu componente
  @HostBinding('@fade') fade = true;

  public modalRef!: ModalRef;
  public modalConfig!: ModalConfig; 
  constructor() { }

  ngOnInit(): void {
  }

  //AfterViewInit, ou seja, depois que a view for iniciada, eu vou dizer this.show =true;. Faz sentido porque a minha view vai ser carregada, vai começar com passo de 0. Quando a minha view tiver sido inicializada, o show vai voltar para true
  public ngAfterViewInit(): void {
    //setTimeout. Essa gambiarra é muito potente no Angular, essa é a gambiarra mor. O que acontece? Toda operação assíncrona no Angular dispara o changeDetection do Angular.
    //Então quando eu dou esse setTimeOut, eu estou dizendo para ele executar esse código, nem passei tempo, mas como é uma operação assíncrona, o angular vai fazer um ciclo de ChangeDetection
    // setTimeout(() => this.show = true); não é a melhor maneira
    
  }

}
