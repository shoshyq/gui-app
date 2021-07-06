import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRegularSearchComponent } from './update-regular-search.component';

describe('UpdateRegularSearchComponent', () => {
  let component: UpdateRegularSearchComponent;
  let fixture: ComponentFixture<UpdateRegularSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRegularSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRegularSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
