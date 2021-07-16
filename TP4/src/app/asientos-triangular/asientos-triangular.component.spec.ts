import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosTriangularComponent } from './asientos-triangular.component';

describe('AsientosTriangularComponent', () => {
  let component: AsientosTriangularComponent;
  let fixture: ComponentFixture<AsientosTriangularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsientosTriangularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsientosTriangularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
