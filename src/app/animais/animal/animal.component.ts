import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {
  private urlOriginal = '';

  @Input() descricao = '';

  @Input() set url(url: string) {
    if(url.startsWith('data')) { //startsWith = começa com ... data =  url interna da aplicação
      this.urlOriginal = url;
    } else {
      this.urlOriginal = `${environment.apiURL}/imgs/${url}`;
    }
  }
  get url(): string {
    return this.urlOriginal;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
