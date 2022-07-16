import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-design-acessibilidade',
  templateUrl: './design-acessibilidade.component.html',
  styleUrls: ['./design-acessibilidade.component.scss']
})
export class DesignAcessibilidadeComponent implements OnInit {
  public form!: FormGroup;
  public teste: string = '';

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    /*
    Para passar mais configurações você precisa passar um objeto JavaScript onde o value vai ser o valor inicial dele, value pode ser no, yes ou null, seu valor inicial, e o disabled, a propriedade disabled vai ser true.
    Muito cuidado, porque você pode ficar tentado de fazer só null. Se você fizer só isso não vai funcionar, porque o Angular vai achar que você está querendo dizer que o valor inicial desse cara é um objeto com a propriedade value, então para isso funcionar direito para o Angular você nunca pode botar só value nessa estrutura, você tem que botar value mais alguma propriedade, no caso disabled true.
    */
    this.form = this.formBuilder.group({
      yesNoAnswer:[{
        value: null,
        disabled: false
      }],
      yesNoAnswer1: [{
        value: null,
        disabled: false
      }]
    })
  }

  public submit(): void {
    //o elemento yesNoAnswer que estou pegando, e vou dizer que ele vai ficar disable. Isso é uma maneira programática de habilitar ou desabilitar o campo.
    this.form.get('yesNoAnswer')?.disable();
    console.log(this.form.value);
  }

  testes(tvalor: any) {
    console.log(tvalor);
  }
}
