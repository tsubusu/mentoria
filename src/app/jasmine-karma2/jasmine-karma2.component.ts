import { Component, OnInit } from '@angular/core';
import { PhotoBoardService } from '../shared/componentes/photo-board/services/photo-board.service';
import { Observable } from 'rxjs';
import { Photo } from '@shared/componentes/photo-board/interfaces/photo';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-jasmine-karma2',
  templateUrl: './jasmine-karma2.component.html',
  styleUrls: ['./jasmine-karma2.component.scss']
})
export class JasmineKarma2Component implements OnInit {
  public likes = 0;
  public photos$!: Observable<Photo[]>;
  public fa = { faCircleNotch };

  constructor(private photoBoardService: PhotoBoardService) { }

  ngOnInit(): void {
    this.photos$ = this.photoBoardService.getPhotos();
  }

  public like(): void {
    this.likes++;
  }
}
