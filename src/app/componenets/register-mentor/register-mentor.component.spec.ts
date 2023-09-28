import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMentorComponent } from './register-mentor.component';

describe('RegisterMentorComponent', () => {
  let component: RegisterMentorComponent;
  let fixture: ComponentFixture<RegisterMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMentorComponent]
    });
    fixture = TestBed.createComponent(RegisterMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
