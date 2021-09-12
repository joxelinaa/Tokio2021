import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledOsvojenihMedaljaComponent } from './pregled-osvojenih-medalja.component';

describe('PregledOsvojenihMedaljaComponent', () => {
  let component: PregledOsvojenihMedaljaComponent;
  let fixture: ComponentFixture<PregledOsvojenihMedaljaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledOsvojenihMedaljaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledOsvojenihMedaljaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
