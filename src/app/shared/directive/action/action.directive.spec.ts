import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActionModule } from './action.module';

fdescribe('ActionDirective', () => {
  let fixture: ComponentFixture<ActionDirectiveTestComponent>;
  let component: ActionDirectiveTestComponent;

  beforeEach(async () => {
     TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ ActionModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('(D) (@Output appAction) should emit event with pay load when ENTER key is pressed', () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    divEl.dispatchEvent(event);

    expect(component.hasEvent()).toBeTrue();
  });

  it('(D) (@Output appAction) should emit event with pay load when clicked', () => {
    //outra maneira de buscar elementos do DOM
    //fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    divEl.click();
    expect(component.hasEvent()).withContext('clicked').toBeTrue();
  });
});

//Componente para poder simular os testes da directiva
@Component({
  template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent {
  private event!: Event;
  public actionHandler(event: Event): void {
    this.event = event;
  }

  public hasEvent(): boolean {
    return !!this.event;
  }
}