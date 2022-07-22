import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jasmine-karma2',
  templateUrl: './jasmine-karma2.component.html',
  styleUrls: ['./jasmine-karma2.component.scss']
})
export class JasmineKarma2Component implements OnInit {
  public likes = 0;

  constructor() { }

  ngOnInit(): void {
  }
  
  public like(): void {
    this.likes++;
  }
}
