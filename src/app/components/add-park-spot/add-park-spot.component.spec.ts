import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParkSpotComponent } from './add-park-spot.component';

describe('AddParkSpotComponent', () => {
  let component: AddParkSpotComponent;
  let fixture: ComponentFixture<AddParkSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParkSpotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParkSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
