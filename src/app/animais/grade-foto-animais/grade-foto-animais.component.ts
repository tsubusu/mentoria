import { Component, Input, OnInit } from '@angular/core';
import { Animais } from '../shared/model/animal.model';

@Component({
  selector: 'app-grade-foto-animais',
  templateUrl: './grade-foto-animais.component.html',
  styleUrls: ['./grade-foto-animais.component.scss']
})
export class GradeFotoAnimaisComponent implements OnInit {
  @Input() animais!: Animais; // !: pode ser nulo

  constructor() { }

  ngOnInit(): void {
  }

}
