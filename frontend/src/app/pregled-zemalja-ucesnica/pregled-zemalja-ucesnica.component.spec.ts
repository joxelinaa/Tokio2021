import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZemaljaUcesnicaComponent } from './pregled-zemalja-ucesnica.component';

describe('PregledZemaljaUcesnicaComponent', () => {
  let component: PregledZemaljaUcesnicaComponent;
  let fixture: ComponentFixture<PregledZemaljaUcesnicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZemaljaUcesnicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledZemaljaUcesnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
