import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimaisService } from '../shared/service/animais.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.scss']
})
export class NovoAnimalComponent implements OnInit {
  animalForm!: FormGroup;
  file!: File;
  preview!: string;
  percentualConcluido = 0;

  constructor(private animaisService: AnimaisService,
      private formBuilder: FormBuilder,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.animalForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      allowComments: [true]
    })
  }

  /*
  (finalize()), que é o seguinte, quando finalizar o que
  eu quero que aconteça? Quando finalizar a requisição 
  eu quero que vá para a minha tela de animais. 
  Finalizando a requisição eu coloco 
  ()=> this.router.navigate e eu vou colocar aqui minha 
  tela de animais, o array ([‘animais’])

  Ele é diferente porque nós colocamos lá em serviço que
  eu quero observar o progresso da requisição, eu 
  preciso saber o que acontece no final da requisição, 
  por isso que eu vou fazer esse finalize

  .subscribe() eu vou receber o quê? Eu estou recebendo
  não a response e sim o evento, eu falei que eu quero
  receber os eventos, então (event:HttpEvent<any>)


  if (event.type ==, se o evento for igual igual ao 
  upload progress, porque o HttpClient nos dá essa 
  informação, então se for do tipo HttpEventType., 
  se ele ainda estiver fazendo upload, o que eu quero 
  que aconteça? Eu quero calcular o percentual, então 
  const total = event.total

  E se não tiver nada, porque o total pode ser undefined,
  então vou fazer aqui uma proteção, se for undefined 
  vai ser igual a 1, porque ele vai já estar completo. 
  Total, então this.percentualConcluido = Math.round(100*(event.loaded / total));
  E nós temos o percentual concluído.
  */
  upload() {
    const allwComments = this.animalForm.get('allowComments')?.value ?? false;
    const description = this.animalForm.get('description')?.value ?? false;

    this.animaisService.upload(description, allwComments, this.file)
    .pipe(
      finalize(() => this.router.navigate(['animais']))
    ).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          const total = event.total ?? 1;
          this.percentualConcluido = Math.round(100 * event.loaded / total);
        }
      },
      (error) => console.log(error)
    );
  }
/*
this.file é igual ao file; que nós criamos lá, para ter 
essa referência para depois nós gravarmos esse arquivo. 
const reader, porque nós vamos ler esse arquivo para 
conseguirmos ler o arquivo para conseguirmos fazer o 
preview. Então reader = new FileReader();

reader.onload, nós vamos subir a função. 
Depois que terminar o que ele tem que fazer? 
Ele vai carregar o preview. Essa onload é uma função 
que vai receber (event:any)=>, uma arrow function, 
(this.preview=event.target.result);, que é a foto, 
para conseguirmos subir no preview e passar para o
nosso componente de animal

reader.readAsDataURL e vou passar o (file);. Com isso ele vai conseguir 
subir e fazer o preview da foto
*/
  gravarArquivo(arquivo: any):void {
    const [file] = arquivo?.files;
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
