import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from './interfaces/photo';

@Component({
  selector: 'app-photo-board',
  templateUrl: './photo-board.component.html',
  styleUrls: ['./photo-board.component.scss']
})
export class PhotoBoardComponent implements OnInit, OnChanges {
  @Input() public photos!: Photo[];
  public rows: any[][] = [];

  constructor() { }

  public ngOnInit(): void {
  }

  //a única maneira do ngOnChanges funcionar e ser chamado é se a propriedade do seu componente está sendo referenciada através de um template
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['photos']) {
      this.rows = this.groupColumns(changes['photos']?.currentValue);
    }
  }

  private groupColumns(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;
    for (let index = 0; index < this.photos.length; index += step){
      newRows.push(photos.slice(index, index + step));
    }
    return newRows;
  }

}
