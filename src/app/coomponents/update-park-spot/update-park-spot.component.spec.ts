import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParkSpotComponent } from './update-park-spot.component';

describe('UpdateParkSpotComponent', () => {
  let component: UpdateParkSpotComponent;
  let fixture: ComponentFixture<UpdateParkSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParkSpotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParkSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
