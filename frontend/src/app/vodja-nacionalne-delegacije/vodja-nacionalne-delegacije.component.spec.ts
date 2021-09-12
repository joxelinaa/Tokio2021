import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodjaNacionalneDelegacijeComponent } from './vodja-nacionalne-delegacije.component';

describe('VodjaNacionalneDelegacijeComponent', () => {
  let component: VodjaNacionalneDelegacijeComponent;
  let fixture: ComponentFixture<VodjaNacionalneDelegacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodjaNacionalneDelegacijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodjaNacionalneDelegacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
