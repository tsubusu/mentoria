import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Comentarios } from '../../shared/model/comentario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComentarioService } from '../../shared/service/comentario.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() id!: number;
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(private comentarioService: ComentarioService,
      private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentarioService.obterComentario(this.id);
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.maxLength(300)]
    });
  }

  public gravar(): void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.comentarioService
      .incluirComentario(this.id, comentario)
      .pipe(
        switchMap(() => this.comentarioService.obterComentario(this.id)),
        tap(() => {
          this.comentarioForm.reset();
          alert('Salvo comentario');
        })
    );
  }
}
