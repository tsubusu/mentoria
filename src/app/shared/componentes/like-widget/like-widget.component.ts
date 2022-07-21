import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faThumbsUp, faAdd } from '@fortawesome/free-solid-svg-icons';
import { UniqueIdService } from '../../service/unique-id.service';

@Component({
  selector: 'app-like-widget',
  templateUrl: './like-widget.component.html',
  styleUrls: ['./like-widget.component.scss']
})
export class LikeWidgetComponent implements OnInit {
  @Output() public liked = new EventEmitter<void>();

  @Input() public likes = 0;
  @Input() public id!: string;

  public fonts = {
    faThumbsUp, faAdd
  };

  constructor(private uniqueIdService: UniqueIdService) { }

  public ngOnInit(): void {
    if (!this.id) {
      this.id = this.uniqueIdService.generateUniqueIDWithPrefix('like-widget');
    }
  }

  public like(): void {
    this.liked.emit();
  }

  //exemplo para test first
  //criar o teste primeiro para dps criar o metodo dentro do component
  public grita(): boolean {
    return true;
  }
}
