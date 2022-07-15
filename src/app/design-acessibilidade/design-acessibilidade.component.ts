import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-design-acessibilidade',
  templateUrl: './design-acessibilidade.component.html',
  styleUrls: ['./design-acessibilidade.component.scss']
})
export class DesignAcessibilidadeComponent implements OnInit {
  public form!: FormGroup;
  public teste: string = 'no';

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      yesNoAnswer:['']
    })
  }

  public submit(): void {
    console.log(this.form.value);
  }

  testes(tvalor: any) {
    console.log(tvalor);
  }
}
