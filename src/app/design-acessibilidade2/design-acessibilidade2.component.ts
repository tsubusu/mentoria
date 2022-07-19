import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { fade } from '@shared/animations/fade';
import { ModalRef, ModalService } from '../shared/modal/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-design-acessibilidade2',
  templateUrl: './design-acessibilidade2.component.html',
  styleUrls: ['./design-acessibilidade2.component.scss'],
  animations: [fade] // 'injetar' a animação para ser usada dentro do component e reutilizando-o
})
export class DesignAcessibilidade2Component implements OnInit, AfterViewInit {
  //Sabemos que conseguimos injetar fragmentos de um template, ou um componente que está dentro de um template, dentro do componente pai através do view child. Então o que eu vou fazer? Vou para o meu template que está em < ng-template, vou colocar uma variável de template chamada modal, vou voltar para o meu app e vou criar uma propriedade @ViewChild. Quem? Eu quero que você injete um modal na propriedade modalTemplateRef
  @ViewChild('modal') public modalTemplateRef!: TemplateRef<any>;

  @ViewChild('template1')  public template1!: TemplateRef<any>;
  @ViewChild('template2')  public template2!: TemplateRef<any>;
  public selectedTemplate!: TemplateRef<any>;

  public form!: FormGroup;
  public firstName = 'teste';
  public modalRef!: ModalRef; // !: pode ser nulo


  //teste para reutilização da animation fade
  public info = false;

  constructor(private modalService: ModalService,
      private cd: ChangeDetectorRef,
      private formBuilder: FormBuilder,
    ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['teste', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      info: [false],
    });
  }
  
  /*
   Em produção, você não vê esse erro, mas em modo de desenvolvimento ele está dizendo: 
   “Olha só, você está mudando um valor depois que a view foi inicializada. Pode ser que o angular pape mosca na detecção de mudança dele” 
   então eu estou garantindo através do ChangeDetectorRef que um ciclo vai ser requisitado na angular, um novo ciclo de detecção de change detection e esse erro vai embora
  */
  ngAfterViewInit(): void {
    this.selectedTemplate = this.template1;
    this.cd.detectChanges();
  }

  public testeExibicaoTemplates() {
    this.selectedTemplate = this.template2;
  }

  public show(): void {
    this.modalRef = this.modalService.open({
      templateRef: this.modalTemplateRef,
      title: 'User Details'
    });
  }

  public submit() {
    if(this.form.valid) {
      this.modalRef.close();
      console.log(this.form.value);
    }
  }

}
