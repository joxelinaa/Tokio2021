import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnickiZahteviComponent } from './korisnicki-zahtevi.component';

describe('KorisnickiZahteviComponent', () => {
  let component: KorisnickiZahteviComponent;
  let fixture: ComponentFixture<KorisnickiZahteviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisnickiZahteviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnickiZahteviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
