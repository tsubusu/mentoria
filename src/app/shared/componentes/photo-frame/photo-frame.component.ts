import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit, OnDestroy {
  @Output() public liked = new EventEmitter<void>();
  @Input() public description = '';
  @Input() public src = '';
  @Input() public likes = 0;

  private debounceSubject: Subject<void>  = new Subject();
  private unsubscribe: Subject<void>  = new Subject();

  constructor() { }

  public ngOnInit(): void {
    this.debounceSubject
    .asObservable()
    .pipe(debounceTime(500))
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(() => this.liked.emit());
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  
  public like(): void {
    //Ele executara somente a cada 0.5 segundos
    this.debounceSubject.next();
  }

}
