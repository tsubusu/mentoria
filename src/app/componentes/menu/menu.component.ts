import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  mostrarMenu = false;
  constructor() { }

  ngOnInit(): void {
  }

  public abrirMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
