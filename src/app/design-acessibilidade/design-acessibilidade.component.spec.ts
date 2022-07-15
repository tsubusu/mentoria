import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignAcessibilidadeComponent } from './design-acessibilidade.component';

describe('DesignAcessibilidadeComponent', () => {
  let component: DesignAcessibilidadeComponent;
  let fixture: ComponentFixture<DesignAcessibilidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignAcessibilidadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignAcessibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
