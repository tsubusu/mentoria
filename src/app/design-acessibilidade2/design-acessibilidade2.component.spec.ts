import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignAcessibilidade2Component } from './design-acessibilidade2.component';

describe('DesignAcessibilidade2Component', () => {
  let component: DesignAcessibilidade2Component;
  let fixture: ComponentFixture<DesignAcessibilidade2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignAcessibilidade2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignAcessibilidade2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
