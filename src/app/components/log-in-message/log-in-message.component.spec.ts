import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInMessageComponent } from './log-in-message.component';

describe('LogInMessageComponent', () => {
  let component: LogInMessageComponent;
  let fixture: ComponentFixture<LogInMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
