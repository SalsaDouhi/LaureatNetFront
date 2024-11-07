import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostFilterHeaderComponent } from './home-post-filter-header.component';

describe('HomePostFilterHeaderComponent', () => {
  let component: HomePostFilterHeaderComponent;
  let fixture: ComponentFixture<HomePostFilterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePostFilterHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePostFilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
