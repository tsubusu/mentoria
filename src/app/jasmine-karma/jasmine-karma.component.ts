import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jasmine-karma',
  templateUrl: './jasmine-karma.component.html',
  styleUrls: ['./jasmine-karma.component.scss']
})
export class JasmineKarmaComponent implements OnInit {
  public likes = 0;

  constructor() { }

  ngOnInit(): void {
  }
  
  public like(): void {
    this.likes++;
  }
}
