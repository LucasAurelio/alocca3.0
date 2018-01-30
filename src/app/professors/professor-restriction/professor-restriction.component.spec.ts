import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorRestrictionComponent } from './professor-restriction.component';

describe('ProfessorRestrictionComponent', () => {
  let component: ProfessorRestrictionComponent;
  let fixture: ComponentFixture<ProfessorRestrictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorRestrictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
