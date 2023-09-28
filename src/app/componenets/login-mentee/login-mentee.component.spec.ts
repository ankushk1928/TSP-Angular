import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMenteeComponent } from './login-mentee.component';

describe('LoginMenteeComponent', () => {
  let component: LoginMenteeComponent;
  let fixture: ComponentFixture<LoginMenteeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMenteeComponent]
    });
    fixture = TestBed.createComponent(LoginMenteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
