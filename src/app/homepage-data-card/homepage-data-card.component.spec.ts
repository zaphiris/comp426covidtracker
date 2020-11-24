import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageDataCardComponent } from './homepage-data-card.component';

describe('HomepageDataCardComponent', () => {
  let component: HomepageDataCardComponent;
  let fixture: ComponentFixture<HomepageDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageDataCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
