import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Animal } from '../shared/model/animal.model';
import { AnimaisService } from '../shared/service/animais.service';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.scss']
})
export class DetalheAnimalComponent implements OnInit {
  public animal$!: Observable<Animal>;
  
  private animalID!: number;

  constructor(private animalService: AnimaisService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
    ) { }

  ngOnInit(): void {
    this.animalID = this.activatedRoute.snapshot.params['animalID'];
    this.animal$ = this.animalService.obterAnimalPorID(this.animalID);
  }

  public curtir() {
    this.animalService.curtir(this.animalID)
    .pipe(
      first(),
      tap(curtidas => {
        if (curtidas) {
          this.animal$ = this.animalService.obterAnimalPorID(this.animalID);
        }
      }),
      catchError(error => {
        console.log(error);
        return error;
      })
    )
    .subscribe();
  }
  
  public excluir() {
    this.animalService.excluirAnimal(this.animalID)
    .pipe(
      first(),
      tap(() => this.router.navigate(['/animais'])),
      catchError(error => {
        console.log(error);
        return error;
      })
    )
    .subscribe();
  }
}
