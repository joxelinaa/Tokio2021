import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezultatTakmicenjaComponent } from './rezultat-takmicenja.component';

describe('RezultatTakmicenjaComponent', () => {
  let component: RezultatTakmicenjaComponent;
  let fixture: ComponentFixture<RezultatTakmicenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezultatTakmicenjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RezultatTakmicenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
