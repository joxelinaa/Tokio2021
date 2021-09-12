import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledDosadasnjihRekordaComponent } from './pregled-dosadasnjih-rekorda.component';

describe('PregledDosadasnjihRekordaComponent', () => {
  let component: PregledDosadasnjihRekordaComponent;
  let fixture: ComponentFixture<PregledDosadasnjihRekordaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledDosadasnjihRekordaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledDosadasnjihRekordaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
