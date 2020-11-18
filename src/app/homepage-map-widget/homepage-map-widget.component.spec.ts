import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageMapWidgetComponent } from './homepage-map-widget.component';

describe('HomepageMapWidgetComponent', () => {
  let component: HomepageMapWidgetComponent;
  let fixture: ComponentFixture<HomepageMapWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageMapWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageMapWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
