import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario, Comentarios } from '../model/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  public obterComentario(id: number): Observable<Comentarios> {
    return this.http.get<Comentarios>(`${environment.apiURL}/photos/${id}/comments`);
  }

  /*
   A API está esperando um objeto com esse atributo. Como 
   colocamos aqui o mesmo nome do atributo, eu não preciso colocar o commentText: CommentText
  */
  public incluirComentario(id: number, commentText: string): Observable<Comentario> {
    return this.http.post<Comentario>(`${environment.apiURL}/photos/${id}/comments`, {
      commentText
    })
  }
}
