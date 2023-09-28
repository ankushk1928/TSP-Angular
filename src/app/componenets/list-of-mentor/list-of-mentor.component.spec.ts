import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfMentorComponent } from './list-of-mentor.component';

describe('ListOfMentorComponent', () => {
  let component: ListOfMentorComponent;
  let fixture: ComponentFixture<ListOfMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfMentorComponent]
    });
    fixture = TestBed.createComponent(ListOfMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
