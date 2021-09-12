import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatTakmicenjaComponent } from './delegat-takmicenja.component';

describe('DelegatTakmicenjaComponent', () => {
  let component: DelegatTakmicenjaComponent;
  let fixture: ComponentFixture<DelegatTakmicenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegatTakmicenjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegatTakmicenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
