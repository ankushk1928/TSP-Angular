import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBySkillsComponent } from './search-by-skills.component';

describe('SearchBySkillsComponent', () => {
  let component: SearchBySkillsComponent;
  let fixture: ComponentFixture<SearchBySkillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBySkillsComponent]
    });
    fixture = TestBed.createComponent(SearchBySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
